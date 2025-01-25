import sqlite3
import yaml
import openai
import json

class QuizzesAgent:
  def __init__(self):
    self.conn = sqlite3.connect('local_database/revision_helper.db')
    with open('crewai/agents/yaml/quizzes_agent.yaml', 'r') as file:
      self.config = yaml.safe_load(file)
    with open('config/config.json', 'r') as file:
      config = json.load(file)
      openai.api_key = config['openai_api_key']

  def get_quizzes(self, course_id):
    cursor = self.conn.cursor()
    cursor.execute('''
    SELECT * FROM quizzes WHERE course_id = ?
    ''', (course_id,))
    quizzes = cursor.fetchall()

    # Use AI to suggest quizzes that align with a student's learning path
    response = openai.Completion.create(
      engine="text-davinci-003",
      prompt=f"Suggest quizzes for course {course_id} that align with a student's learning path: {quizzes}",
      max_tokens=150
    )

    suggested_quizzes = json.loads(response.choices[0].text.strip())
    return suggested_quizzes if suggested_quizzes else quizzes
