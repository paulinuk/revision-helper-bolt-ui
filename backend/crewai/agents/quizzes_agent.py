import sqlite3
import yaml
import json

class QuizzesAgent:
  def __init__(self):
    self.conn = sqlite3.connect('backend/local_database/revision_helper.db')
    with open('backend/crewai/agents/yaml/quizzes_agent.yaml', 'r') as file:
      self.config = yaml.safe_load(file)

  def get_quizzes(self, course_id):
    cursor = self.conn.cursor()
    cursor.execute('''
    SELECT * FROM quizzes WHERE course_id = ?
    ''', (course_id,))
    quizzes = cursor.fetchall()
    return quizzes
