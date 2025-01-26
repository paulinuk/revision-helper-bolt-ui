from flask import Blueprint, jsonify, request
from backend.crewai.agents.students_agent import StudentsAgent

student_courses_blueprint = Blueprint('student_courses', __name__)
agent = StudentsAgent()

@student_courses_blueprint.route('/', methods=['GET'])
def get_student_courses():
    student_id = request.args.get('studentId')

    if not student_id:
        return jsonify({"error": "Missing studentId parameter"}), 400

    courses = agent.get_courses_for_student(student_id)
    return jsonify(courses)
