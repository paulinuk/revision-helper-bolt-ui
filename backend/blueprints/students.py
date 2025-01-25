from flask import Blueprint, jsonify, request
from backend.crewai.agents.students_agent import StudentsAgent

students_blueprint = Blueprint('students', __name__)
agent = StudentsAgent()

@students_blueprint.route('/performance', methods=['GET'])
def get_student_performance():
    student_id = request.args.get('studentId')
    course_id = request.args.get('courseId')
    performance = agent.get_student_performance(student_id, course_id)
    return jsonify(performance)
