import sqlite3
import yaml
import openai
import json

class StudentPerformanceAgent:
    def __init__(self):
        self.conn = sqlite3.connect('local_database/revision_helper.db')
        with open('backend/agents/yaml/student_performance_agent.yaml', 'r') as file:
            self.config = yaml.safe_load(file)
        with open('backend/config/config.json', 'r') as file:
            config = json.load(file)
            openai.api_key = config['openai_api_key']

    def get_performance(self, course_id, student_id):
        cursor = self.conn.cursor()
        cursor.execute('''
        SELECT * FROM student_performance WHERE course_id = ? AND student_id = ?
        ''', (course_id, student_id))
        performance = cursor.fetchall()
        # Use OpenAI to analyze performance
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=f"Analyze the following student performance data: {performance}",
            max_tokens=150
        )
        analysis = response.choices[0].text.strip()
        return analysis
