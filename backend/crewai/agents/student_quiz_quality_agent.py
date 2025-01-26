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

  def evaluate_question(self, suggested_question, student_id, course_id):
    cursor = self.conn.cursor()

    # Extract all questions asked in the current quiz
    cursor.execute('''
    SELECT q.id, q.text, q.options, q.correct_answer, q.quiz_id, sp.is_correct, q.topic
    FROM questions q
    JOIN student_performance sp ON q.id = sp.question_id
    WHERE sp.student_id = ? AND q.quiz_id = ?
    ''', (student_id, suggested_question['quiz_id']))
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
    topic_distribution = {}
    for _, _, _, _, _, _, topic in current_quiz_questions:
      if topic in topic_distribution:
        topic_distribution[topic] += 1
      else:
        topic_distribution[topic] = 1

    # Prepare data for AI evaluation
    ai_input = {
      "suggested_question": suggested_question,
      "current_quiz_questions": current_quiz_questions,
      "past_course_questions": past_course_questions,
      "topic_distribution": topic_distribution
    }

    # Use AI to evaluate the suggested question
    response = openai.Completion.create(
      engine="text-davinci-003",
      prompt=f"Evaluate the suggested question for balanced topic coverage, ensuring weaker topics are prioritized but maintaining a mix of topics. Consider the current topic distribution: {json.dumps(ai_input)}",
      max_tokens=150
    )

    evaluation_result = json.loads(response.choices[0].text.strip())
    return evaluation_result.get("approve", False)
