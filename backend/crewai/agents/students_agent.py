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

    def get_courses_for_student(self, student_id):
        cursor = self.conn.cursor()
        cursor.execute('''
        SELECT c.id, c.name FROM courses c
        JOIN students s ON c.establishment_id = s.establishment_id
        WHERE s.id = ?
        ''', (student_id,))
        courses = cursor.fetchall()
        return [{"id": course[0], "name": course[1]} for course in courses]

    def get_students(self, establishment_id=None):
        cursor = self.conn.cursor()
        if establishment_id:
            cursor.execute('''
            SELECT id, full_name FROM students WHERE establishment_id = ? ORDER BY full_name
            ''', (establishment_id,))
        else:
            cursor.execute('''
            SELECT id, full_name FROM students ORDER BY full_name
            ''')
        students = cursor.fetchall()
        return [{"id": student[0], "full_name": student[1]} for student in students]
