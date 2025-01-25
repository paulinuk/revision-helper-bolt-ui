from crewai import Crew  # Updated import

class CourseOverviewAgent:
    def __init__(self):
        self.crew = Crew()  # Updated usage

    def gather_syllabus(self):
        # Logic to gather GCSE maths syllabus from online
        syllabus = self.crew.fetch_syllabus("GCSE Maths")
        return syllabus

class QuestionGenerationAgent:
    def __init__(self):
        self.crew = Crew()  # Updated usage

    def generate_questions(self, syllabus):
        # Logic to generate a pool of questions from the syllabus
        questions = self.crew.create_questions(syllabus)
        return questions

class StudentPerformanceAgent:
    def __init__(self):
        self.crew = Crew()  # Updated usage

    def get_performance(self, course_id, student_id):
        # Logic to retrieve student's performance
        performance = self.crew.fetch_performance(course_id, student_id)
        return performance

class StudentQuizAgent:
    def __init__(self):
        self.crew = Crew()  # Updated usage

    def select_question(self, questions, performance):
        # Logic to select the next question based on performance
        next_question = self.crew.adaptive_learning(questions, performance)
        return next_question
