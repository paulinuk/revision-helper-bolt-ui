import sqlite3
import yaml
import openai
import json
from datetime import datetime

class StudentQuizAgent:
    def __init__(self):
        self.conn = sqlite3.connect('local_database/revision_helper.db')
        with open('backend/agents/yaml/student_quiz_agent.yaml', 'r') as file:
            self.config = yaml.safe_load(file)
        with open('backend/config/config.json', 'r') as file:
            config = json.load(file)
            openai.api_key = config['openai_api_key']

    def select_question(self, course_id, student_id):
        cursor = self.conn.cursor()

        # Extract all previous performance information for the student
        cursor.execute('''
        SELECT question_id, is_correct, answer_date FROM student_performance WHERE course_id = ? AND student_id = ?
        ''', (course_id, student_id))
        performance = cursor.fetchall()

        # Extract all remaining unused questions for the course
        cursor.execute('''
        SELECT id, text, options FROM questions WHERE quiz_id IN (SELECT id FROM quizzes WHERE course_id = ?)
        ''', (course_id,))
        all_questions = cursor.fetchall()

        # Filter out questions that have already been asked in the current quiz
        asked_question_ids = {p[0] for p in performance}
        remaining_questions = [q for q in all_questions if q[0] not in asked_question_ids]

        # Prioritize questions that haven't been asked recently
        remaining_questions.sort(key=lambda q: next((p[2] for p in performance if p[0] == q[0]), datetime.min))

        # Use OpenAI to suggest the most appropriate next question
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=f"Based on the student's performance data: {performance} and the remaining questions: {remaining_questions}, suggest the most appropriate next question to enhance the student's learning.",
            max_tokens=150
        )
        next_question = response.choices[0].text.strip()
        return next_question
