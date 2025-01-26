import sqlite3
import yaml
import openai
import json
from collections import defaultdict

class CoursesAgent:
    def __init__(self):
        self.conn = sqlite3.connect('local_database/revision_helper.db')
        self.questions_agent = QuestionsAgent()  # Link to QuestionsAgent
        self.course_overview_agent = CourseOverviewAgent()  # Link to CourseOverviewAgent
        with open('crewai/agents/yaml/courses_agent.yaml', 'r') as file:
            self.config = yaml.safe_load(file)

    def get_courses(self, establishment_id):
        cursor = self.conn.cursor()
        cursor.execute('''
        SELECT * FROM courses WHERE establishment_id = ? ORDER BY name
        ''', (establishment_id,))
        courses = cursor.fetchall()
        return courses

    def generate_questions(self, course_id):
        # Use QuestionsAgent to generate questions for the course
        self.questions_agent.generate_questions(course_id)

    def generate_overview(self, course_id):
        # Use CourseOverviewAgent to generate an overview for the course
        overview = self.course_overview_agent.generate_overview(course_id, 'AiGenerated')
        return overview

    def save_course(self, course_id, course_name, establishment_id, overview):
        cursor = self.conn.cursor()
        if course_id:
            # Update existing course
            cursor.execute('''
            UPDATE courses
            SET name = ?, establishment_id = ?, course_overview = ?
            WHERE id = ?
            ''', (course_name, establishment_id, overview, course_id))
        else:
            # Insert new course
            cursor.execute('''
            INSERT INTO courses (name, establishment_id, course_overview)
            VALUES (?, ?, ?)
            ''', (course_name, establishment_id, overview))
            course_id = cursor.lastrowid

        self.conn.commit()
        return course_id

    def generate_course_report(self, course_id):
        cursor = self.conn.cursor()

        # Fetch all quizzes for the course
        cursor.execute('''
        SELECT id, quiz_date FROM quizzes WHERE course_id = ?
        ''', (course_id,))
        quizzes = cursor.fetchall()

        # Collect performance data for each quiz
        performance_data = []
        topic_performance_over_time = defaultdict(list)

        for quiz_id, quiz_date in quizzes:
            cursor.execute('''
            SELECT q.id, q.text, q.correct_answer, sp.provided_answer, q.topic, sp.is_correct
            FROM student_performance sp
            JOIN questions q ON sp.question_id = q.id
            WHERE sp.quiz_id = ?
            ''', (quiz_id,))
            quiz_performance = cursor.fetchall()
            performance_data.extend(quiz_performance)

            # Calculate topic performance for this quiz
            topic_summary = defaultdict(lambda: {'correct': 0, 'total': 0})
            for _, _, _, _, topic, is_correct in quiz_performance:
                topic_summary[topic]['total'] += 1
                if is_correct:
                    topic_summary[topic]['correct'] += 1

            # Store topic performance over time
            for topic, data in topic_summary.items():
                score_percentage = (data['correct'] / data['total']) * 100 if data['total'] > 0 else 0
                topic_performance_over_time[topic].append((quiz_date, score_percentage))

        # Calculate overall topic performance
        topic_summary_list = [
            {
                "TopicName": topic,
                "PerformanceOverTime": topic_performance_over_time[topic]
            }
            for topic in topic_performance_over_time
        ]

        # Prepare data for AI report generation
        report_input = {
            "performance_data": performance_data,
            "topic_summary": topic_summary_list
        }

        # Use AI to generate a detailed report
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=f"Write a detailed report about the student's performance from the perspective of a teacher, based on the following data: {json.dumps(report_input)}. Highlight improvements or declines in topic understanding over time and suggest remedies for any declines.",
            max_tokens=1000
        )

        report = response.choices[0].text.strip()
        return report
