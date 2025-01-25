import sqlite3
import yaml
import openai
import json

class StudentsAgent:
    def __init__(self):
        self.conn = sqlite3.connect('local_database/revision_helper.db')
        with open('crewai/agents/yaml/students_agent.yaml', 'r') as file:
            self.config = yaml.safe_load(file)
        with open('config/config.json', 'r') as file:
            config = json.load(file)
            openai.api_key = config['openai_api_key']

    def get_student_performance(self, student_id, course_id):
        cursor = self.conn.cursor()
        cursor.execute('''
        SELECT * FROM student_performance WHERE student_id = ? AND course_id = ?
        ''', (student_id, course_id))
        performance = cursor.fetchall()

        # Use AI to analyze student performance and provide feedback
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=f"Analyze student performance for student {student_id} in course {course_id} and provide feedback: {performance}",
            max_tokens=150
        )

        feedback = json.loads(response.choices[0].text.strip())
        return feedback if feedback else performance
