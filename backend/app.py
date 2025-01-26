from flask import Flask
from blueprints.establishments import establishments_blueprint
from blueprints.courses import courses_blueprint
from blueprints.quizzes import quizzes_blueprint
from blueprints.questions import questions_blueprint
from blueprints.student_quiz import student_quiz_blueprint
from blueprints.students import students_blueprint
from blueprints.course_materials import course_materials_blueprint
from blueprints.course_overview import course_overview_blueprint
from blueprints.finish_quiz import finish_quiz_blueprint
from blueprints.student_courses import student_courses_blueprint
from blueprints.get_students import get_students_blueprint
from blueprints.course_report import course_report_blueprint
from blueprints.swagger_ui import swagger_ui_blueprint  # Import the new Swagger UI blueprint

app = Flask(__name__)

# Register blueprints
app.register_blueprint(establishments_blueprint, url_prefix='/api/establishments')
app.register_blueprint(courses_blueprint, url_prefix='/api/courses')
app.register_blueprint(quizzes_blueprint, url_prefix='/api/quizzes')
app.register_blueprint(questions_blueprint, url_prefix='/api/questions')
app.register_blueprint(student_quiz_blueprint, url_prefix='/api/student_quiz')
app.register_blueprint(students_blueprint, url_prefix='/api/students')
app.register_blueprint(course_materials_blueprint, url_prefix='/api/course_materials')
app.register_blueprint(course_overview_blueprint, url_prefix='/api/course_overview')
app.register_blueprint(finish_quiz_blueprint, url_prefix='/api/finish_quiz')
app.register_blueprint(student_courses_blueprint, url_prefix='/api/student-courses')
app.register_blueprint(get_students_blueprint, url_prefix='/api/get-students')
app.register_blueprint(course_report_blueprint)
app.register_blueprint(swagger_ui_blueprint)  # Register the new Swagger UI blueprint

if __name__ == '__main__':
  app.run(port=5000, debug=True)
