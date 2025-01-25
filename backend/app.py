from flask import Flask, jsonify, request
from crewai import Crew  # Updated import

app = Flask(__name__)
crew = Crew()  # Updated usage

# Simulated data for establishments
establishments = [
    {"id": "1", "name": "University A"},
    {"id": "2", "name": "College B"},
    {"id": "3", "name": "Bromley College"},
]

@app.route('/api/establishments', methods=['GET'])
def get_establishments():
    return jsonify(establishments)

@app.route('/api/courses', methods=['GET'])
def get_courses():
    establishment_id = request.args.get('establishmentId')
    # Logic to retrieve courses for the given establishment
    courses = crew.get_courses(establishment_id)
    return jsonify(courses)

@app.route('/api/quizzes', methods=['GET'])
def get_quizzes():
    course_id = request.args.get('courseId')
    # Logic to retrieve quizzes for the given course
    quizzes = crew.get_quizzes(course_id)
    return jsonify(quizzes)

@app.route('/api/quiz-question', methods=['GET'])
def get_quiz_question():
    course_id = request.args.get('courseId')
    student_id = request.args.get('studentId')
    # Logic to retrieve the next question for the student
    question = crew.get_next_question(course_id, student_id)
    return jsonify(question)

if __name__ == '__main__':
    app.run(debug=True)
