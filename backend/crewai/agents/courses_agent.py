import sqlite3
import yaml
import json

class CoursesAgent:
    def __init__(self):
        self.conn = sqlite3.connect('local_database/revision_helper.db')
        with open('crewai/agents/yaml/courses_agent.yaml', 'r') as file:
            self.config = yaml.safe_load(file)

    def get_courses(self, establishment_id):
        cursor = self.conn.cursor()
        cursor.execute('''
        SELECT * FROM courses WHERE establishment_id = ?
        ''', (establishment_id,))
        courses = cursor.fetchall()
        return courses
