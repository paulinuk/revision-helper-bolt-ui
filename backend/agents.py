import sqlite3

class CourseOverviewAgent:
    def __init__(self):
        self.conn = sqlite3.connect('local_database/revision_helper.db')

    def gather_syllabus(self):
        # Logic to gather GCSE maths syllabus from online
        # For now, let's simulate this with a static syllabus
        syllabus = [
            {"topic": "Algebra", "objectives": "Understand algebraic expressions"},
            {"topic": "Geometry", "objectives": "Understand geometric shapes and properties"},
        ]
        return syllabus

class QuestionGenerationAgent:
    def __init__(self):
        self.conn = sqlite3.connect('local_database/revision_helper.db')

    def generate_questions(self, syllabus):
        # Logic to generate a pool of questions from the syllabus
        questions = []
        for item in syllabus:
            questions.append({
                "text": f"What is a basic concept in {item['topic']}?",
                "options": ["Option A", "Option B", "Option C", "Option D"],
                "correct_answer": "Option A"
            })
        return questions

class StudentPerformanceAgent:
    def __init__(self):
        self.conn = sqlite3.connect('local_database/revision_helper.db')

    def get_performance(self, course_id, student_id):
        cursor = self.conn.cursor()
        cursor.execute('''
        SELECT * FROM student_performance WHERE course_id = ? AND student_id = ?
        ''', (course_id, student_id))
        performance = cursor.fetchall()
        return performance

class StudentQuizAgent:
    def __init__(self):
        self.conn = sqlite3.connect('local_database/revision_helper.db')

    def select_question(self, questions, performance):
        # Logic to select the next question based on performance
        # For simplicity, return the first question not yet asked
        asked_questions = {p[4] for p in performance}  # question_id is at index 4
        for question in questions:
            if question['id'] not in asked_questions:
                return question
        return None
