import sqlite3
import yaml
import json

class StudentsAgent:
    def __init__(self):
        self.conn = sqlite3.connect('local_database/revision_helper.db')
        with open('crewai/agents/yaml/students_agent.yaml', 'r') as file:
            self.config = yaml.safe_load(file)

    def get_student_performance(self, student_id, course_id):
        cursor = self.conn.cursor()
        cursor.execute('''
        SELECT * FROM student_performance WHERE student_id = ? AND course_id = ?
        ''', (student_id, course_id))
        performance = cursor.fetchall()
        return performance
