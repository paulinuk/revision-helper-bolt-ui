ehivimport sqlite3
import yaml
from backend.crewai.agents.questions_agent import QuestionsAgent
from backend.crewai.agents.course_overview_agent import CourseOverviewAgent

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
