import sqlite3
import yaml
import openai
import json
from datetime import datetime

class StudentQuizAgent:
  def __init__(self):
    self.conn = sqlite3.connect('backend/local_database/revision_helper.db')
    with open('backend/crewai/agents/yaml/student_quiz_agent.yaml', 'r') as file:
      self.config = yaml.safe_load(file)
    with open('backend/config/config.json', 'r') as file:
      config = json.load(file)
      openai.api_key = config['openai_api_key']

  def select_question(self, quiz_id, question_number, student_id):
    cursor = self.conn.cursor()

    # Extract all previous performance information for the student
    cursor.execute('''
    SELECT question_id, is_correct, answer_date FROM student_performance WHERE quiz_id = ? AND student_id = ?
    ''', (quiz_id, student_id))
    performance = cursor.fetchall()

    # Extract all questions for the quiz
    cursor.execute('''
    SELECT id, text, options, correct_answer FROM questions WHERE quiz_id = ?
    ''', (quiz_id,))
    all_questions = cursor.fetchall()

    # Select the question based on the question number
    if question_number < 1 or question_number > len(all_questions):
      return None

    selected_question = all_questions[question_number - 1]

    # Return the selected question with additional information
    return {
      "question": selected_question[1],
      "options": json.loads(selected_question[2]),  # Parse JSON options
      "correctAnswer": selected_question[3],
      "quizName": "Sample Quiz",  # Placeholder, replace with actual quiz name if needed
      "totalQuestions": len(all_questions),
      "studentId": student_id
    }

  def get_next_question(self, quiz_id, student_id):
    cursor = self.conn.cursor()

    # Extract all previous performance information for the student
    cursor.execute('''
    SELECT question_id FROM student_performance WHERE quiz_id = ? AND student_id = ?
    ''', (quiz_id, student_id))
    answered_questions = {row[0] for row in cursor.fetchall()}

    # Extract all questions for the quiz
    cursor.execute('''
    SELECT id, text, options, correct_answer FROM questions WHERE quiz_id = ?
    ''', (quiz_id,))
    all_questions = cursor.fetchall()

    # Find the next unanswered question
    for question in all_questions:
      if question[0] not in answered_questions:
        return {
          "question": question[1],
          "options": json.loads(question[2]),  # Parse JSON options
          "correctAnswer": question[3],
          "quizName": "Sample Quiz",  # Placeholder, replace with actual quiz name if needed
          "totalQuestions": len(all_questions),
          "studentId": student_id
        }

    return None  # No more questions available
