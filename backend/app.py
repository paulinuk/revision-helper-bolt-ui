from flask import Flask
from blueprints.establishments import establishments_blueprint
from blueprints.courses import courses_blueprint
from blueprints.quizzes import quizzes_blueprint
from blueprints.questions import questions_blueprint
from blueprints.student_quiz import student_quiz_blueprint

app = Flask(__name__)

# Register blueprints
app.register_blueprint(establishments_blueprint, url_prefix='/api/establishments')
app.register_blueprint(courses_blueprint, url_prefix='/api/courses')
app.register_blueprint(quizzes_blueprint, url_prefix='/api/quizzes')
app.register_blueprint(questions_blueprint, url_prefix='/api/questions')
app.register_blueprint(student_quiz_blueprint, url_prefix='/api/student_quiz')

if __name__ == '__main__':
  app.run(port=5000, debug=True)
