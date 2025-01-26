import sqlite3
import yaml
import openai
import json

class StudentQuizQualityAgent:
  def __init__(self):
    self.conn = sqlite3.connect('local_database/revision_helper.db')
    with open('crewai/agents/yaml/student_quiz_quality_agent.yaml', 'r') as file:
      self.config = yaml.safe_load(file)
    with open('config/config.json', 'r') as file:
      config = json.load(file)
      openai.api_key = config['openai_api_key']

  def evaluate_question(self, course_id, proposed_question, answers, correct_answer, topic, difficulty_level, allowAnsweredQuestions=False, student_id=None, quiz_id=None):
    cursor = self.conn.cursor()

    # Retrieve the approved course overview
    cursor.execute('''
    SELECT course_overview FROM courses WHERE id = ? AND approved = TRUE
    ''', (course_id,))
    result = cursor.fetchone()

    if not result:
        raise ValueError("Course overview not approved or course not found.")

    course_overview = result[0]

    # Extract past performance data if student_id and quiz_id are provided
    current_quiz_questions = []
    past_course_questions = []
    topic_distribution = {}

    if student_id and quiz_id:
        # Extract all questions asked in the current quiz
        cursor.execute('''
        SELECT q.id, q.text, q.options, q.correct_answer, q.quiz_id, sp.is_correct, q.topic
        FROM questions q
        JOIN student_performance sp ON q.id = sp.question_id
        WHERE sp.student_id = ? AND q.quiz_id = ?
        ''', (student_id, quiz_id))
        current_quiz_questions = cursor.fetchall()

        # Extract all questions asked in the past for the course
        cursor.execute('''
        SELECT q.id, q.text, q.options, q.correct_answer, q.quiz_id, sp.is_correct, q.topic
        FROM questions q
        JOIN student_performance sp ON q.id = sp.question_id
        WHERE sp.student_id = ? AND q.quiz_id IN (SELECT id FROM quizzes WHERE course_id = ?)
        ''', (student_id, course_id))
        past_course_questions = cursor.fetchall()

        # Calculate topic distribution in the current quiz
        for _, _, _, _, _, _, topic in current_quiz_questions:
            if topic in topic_distribution:
                topic_distribution[topic] += 1
            else:
                topic_distribution[topic] = 1

    # Prepare data for AI evaluation
    ai_input = {
        "course_overview": course_overview,
        "proposed_question": proposed_question,
        "answers": answers,
        "correct_answer": correct_answer,
        "topic": topic,
        "difficulty_level": difficulty_level,
        "current_quiz_questions": current_quiz_questions,
        "past_course_questions": past_course_questions,
        "topic_distribution": topic_distribution
    }

    # Use AI to evaluate the question, emphasizing improvement and adaptive learning
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=f"Evaluate the following question based on the criteria: {json.dumps(ai_input)}. Ensure only one answer is correct, the difficulty level matches the planned difficulty, and the question fits within the student's learning path. Heavily weigh the topic distribution of the current quiz to ensure a balanced and varied set of topics. Adapt the question selection to challenge the student appropriately and reinforce weaker areas to improve knowledge and performance over time. If allowAnsweredQuestions is true, ignore if the question has been answered before, unless it was asked in the current quiz.",
        max_tokens=150
    )

    evaluation_result = json.loads(response.choices[0].text.strip())

    # Check if only one answer is correct
    correct_count = sum(1 for answer in answers if answer == correct_answer)
    if correct_count != 1:
        return False

    return evaluation_result.get("acceptable", False)
