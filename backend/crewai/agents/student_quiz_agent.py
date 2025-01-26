import sqlite3
import yaml
import openai
import json
from datetime import datetime
from collections import defaultdict
from crewai.agents.student_quiz_quality_agent import StudentQuizQualityAgent  # Updated import

class StudentQuizAgent:
  MAX_ATTEMPTS = 10  # Maximum number of attempts to find an acceptable question

  def __init__(self):
    self.conn = sqlite3.connect('local_database/revision_helper.db')
    self.quality_agent = StudentQuizQualityAgent()
    with open('crewai/agents/yaml/student_quiz_agent.yaml', 'r') as file:
      self.config = yaml.safe_load(file)
    with open('config/config.json', 'r') as file:
      config = json.load(file)
      openai.api_key = config['openai_api_key']

  def get_next_question(self, student_id, course_id, question_number, difficultyLevel=None, topicSelectionMethod='all', selectedTopics=[], allowAnsweredQuestions=False):
    cursor = self.conn.cursor()

    # Check for an existing unstarted quiz
    cursor.execute('''
    SELECT id FROM quizzes WHERE student_id = ? AND course_id = ? AND started = FALSE LIMIT 1
    ''', (student_id, course_id))
    quiz_result = cursor.fetchone()

    if quiz_result:
      quiz_id = quiz_result[0]
    else:
      # Determine quiz number and add a new quiz record if question_number is 1
      if question_number == 1:
        cursor.execute('''
        SELECT COUNT(*) FROM quizzes WHERE student_id = ? AND course_id = ?
        ''', (student_id, course_id))
        quiz_count = cursor.fetchone()[0]
        quiz_number = quiz_count + 1

        # Insert a new quiz record with all required information
        cursor.execute('''
        INSERT INTO quizzes (name, course_id, quiz_date, quiz_number, student_id, started)
        VALUES (?, ?, ?, ?, ?, FALSE)
        ''', (f"Quiz {quiz_number}", course_id, datetime.now().strftime('%Y-%m-%d'), quiz_number, student_id))
        self.conn.commit()

        # Get the quiz_id of the newly inserted quiz
        quiz_id = cursor.lastrowid
      else:
        # Fetch the latest quiz_id for the student and course
        cursor.execute('''
        SELECT id FROM quizzes WHERE student_id = ? AND course_id = ? ORDER BY quiz_date DESC LIMIT 1
        ''', (student_id, course_id))
        quiz_id = cursor.fetchone()[0]

    # Fetch the student's ability level or use the provided difficulty level
    if difficultyLevel is not None:
      student_ability_level = difficultyLevel
    else:
      cursor.execute('''
      SELECT ability_level FROM students WHERE id = ?
      ''', (student_id,))
      student_ability_level = cursor.fetchone()[0]

    # Gradually increase difficulty level as the student progresses
    target_difficulty = min(10, student_ability_level + 1)

    # Fetch all questions for the given course_id
    cursor.execute('''
    SELECT id, text, options, correct_answer, topic, difficulty_level FROM questions WHERE course_id = ?
    ''', (course_id,))
    available_questions = cursor.fetchall()

    # Filter questions based on topic selection
    if topicSelectionMethod == 'specific' and selectedTopics:
      available_questions = [q for q in available_questions if q[4] in selectedTopics]

    # Extract all previous performance information for the student
    cursor.execute('''
    SELECT question_id FROM student_performance WHERE course_id = ? AND student_id = ?
    ''', (course_id, student_id))
    answered_questions = {row[0] for row in cursor.fetchall()}

    # Filter out questions that have already been answered
    remaining_questions = [q for q in available_questions if q[0] not in answered_questions]

    if not remaining_questions and not allowAnsweredQuestions:
      return None  # No more questions available

    # Calculate weaker topics based on lowest correct score percentages
    cursor.execute('''
    SELECT q.topic, COUNT(*) as total, SUM(sp.is_correct) as correct
    FROM student_performance sp
    JOIN questions q ON sp.question_id = q.id
    WHERE sp.student_id = ? AND q.course_id = ?
    GROUP BY q.topic
    ''', (student_id, course_id))
    topic_performance = cursor.fetchall()

    topic_weakness = {
      topic: (correct / total) if total > 0 else 0
      for topic, total, correct in topic_performance
    }

    # Sort topics by weakness (lower score percentage means weaker)
    sorted_topics = sorted(topic_weakness, key=topic_weakness.get)

    # Prioritize questions based on weaker topics and target difficulty level
    prioritized_questions = sorted(
      remaining_questions,
      key=lambda q: (sorted_topics.index(q[4]), abs(q[5] - target_difficulty))  # Sort by topic weakness and closeness to target difficulty
    )

    # Prepare data for AI to determine the next question
    ai_input = {
      "remaining_questions": [
        {
          "id": q[0],
          "text": q[1],
          "options": json.loads(q[2]),
          "correct_answer": q[3],
          "topic": q[4],
          "difficulty_level": q[5]
        } for q in prioritized_questions
      ],
      "student_id": student_id
    }

    attempts = 0  # Initialize attempt counter

    # Keep trying until a question is accepted by the quality agent or max attempts reached
    while prioritized_questions and attempts < self.MAX_ATTEMPTS:
      attempts += 1  # Increment attempt counter

      # Use AI to suggest the next question based on predefined rules
      response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=f"Based on the student's performance and the remaining questions, suggest the most appropriate next question, prioritizing weaker topics and matching the target difficulty level: {json.dumps(ai_input)}",
        max_tokens=150
      )

      suggested_question = json.loads(response.choices[0].text.strip())

      # Use the quality agent to approve or reject the suggested question
      if self.quality_agent.evaluate_question(course_id, suggested_question['text'], suggested_question['options'], suggested_question['correct_answer'], suggested_question['topic'], suggested_question['difficulty_level'], allowAnsweredQuestions):
        # Mark the quiz as started
        cursor.execute('''
        UPDATE quizzes SET started = TRUE WHERE id = ?
        ''', (quiz_id,))
        self.conn.commit()

        return {"quiz_id": quiz_id, "question": suggested_question}

      # Remove the rejected question from the pool
      prioritized_questions = [q for q in prioritized_questions if q[0] != suggested_question['id']]

    # If no new questions are accepted, try with answered questions
    if not allowAnsweredQuestions:
      return self.get_next_question(student_id, course_id, question_number, difficultyLevel, topicSelectionMethod, selectedTopics, allowAnsweredQuestions=True)

    return None  # No acceptable question found or max attempts reached

  def finish_quiz(self, quiz_id):
    cursor = self.conn.cursor()

    # Fetch all performance data for the quiz
    cursor.execute('''
    SELECT q.id, q.text, q.correct_answer, sp.provided_answer, q.topic, sp.is_correct FROM student_performance sp
    JOIN questions q ON sp.question_id = q.id
    WHERE sp.quiz_id = ?
    ''', (quiz_id,))
    performance_data = cursor.fetchall()

    # Calculate total score and performance by topic
    total_questions = len(performance_data)
    correct_answers = sum(1 for _, _, _, _, _, is_correct in performance_data if is_correct)
    score = (correct_answers / total_questions) * 100 if total_questions > 0 else 0

    topic_summary = defaultdict(lambda: {'correct': 0, 'total': 0})
    correct_questions = []
    incorrect_questions = []

    for question_id, text, correct_answer, provided_answer, topic, is_correct in performance_data:
      topic_summary[topic]['total'] += 1
      if is_correct:
        topic_summary[topic]['correct'] += 1
        correct_questions.append({"Question": text, "CorrectAnswer": correct_answer})
      else:
        incorrect_questions.append({"Question": text, "ProvidedAnswer": provided_answer, "CorrectAnswer": correct_answer})

    topic_summary_list = [
      {
        "TopicName": topic,
        "CorrectAnswers": data['correct'],
        "IncorrectAnswers": data['total'] - data['correct'],
        "ScorePercentage": (data['correct'] / data['total']) * 100 if data['total'] > 0 else 0
      }
      for topic, data in topic_summary.items()
    ]

    # Generate QuizFeedback using AI for the current quiz
    quiz_feedback_input = {
      "performance_data": performance_data,
      "topic_summary": topic_summary_list
    }
    feedback_response = openai.Completion.create(
      engine="text-davinci-003",
      prompt=f"Provide a summary of the student's performance in the quiz, highlighting strengths and weaknesses: {json.dumps(quiz_feedback_input)}",
      max_tokens=150
    )
    quiz_feedback = feedback_response.choices[0].text.strip()

    # Generate Recommendations using AI for all performance data
    cursor.execute('''
    SELECT q.topic, sp.is_correct FROM student_performance sp
    JOIN questions q ON sp.question_id = q.id
    WHERE sp.student_id = (SELECT student_id FROM quizzes WHERE id = ?)
    ''', (quiz_id,))
    all_performance_data = cursor.fetchall()

    recommendation_input = {
      "all_performance_data": all_performance_data,
      "topic_summary": topic_summary_list
    }
    recommendation_response = openai.Completion.create(
      engine="text-davinci-003",
      prompt=f"Provide recommendations for improvement based on the student's overall performance: {json.dumps(recommendation_input)}",
      max_tokens=150
    )
    recommendations = recommendation_response.choices[0].text.strip()

    # Construct the result object
    result = {
      "Score": score,
      "TotalCorrect": correct_answers,
      "TotalIncorrect": total_questions - correct_answers,
      "CorrectQuestions": correct_questions,
      "IncorrectQuestions": incorrect_questions,
      "QuizName": f"Quiz {quiz_id}",
      "TopicSummary": topic_summary_list,
      "QuizFeedback": quiz_feedback,
      "Recommendation": recommendations
    }

    return result
