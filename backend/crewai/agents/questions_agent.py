import sqlite3
import yaml
import json

class QuestionsAgent:
  def __init__(self):
    self.conn = sqlite3.connect('backend/local_database/revision_helper.db')
    with open('backend/crewai/agents/yaml/questions_agent.yaml', 'r') as file:
      self.config = yaml.safe_load(file)

  def get_questions(self, quiz_id):
    cursor = self.conn.cursor()
    cursor.execute('''
    SELECT * FROM questions WHERE quiz_id = ?
    ''', (quiz_id,))
    questions = cursor.fetchall()
    return questions
