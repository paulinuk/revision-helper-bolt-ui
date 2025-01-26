from flask import Blueprint, jsonify, request
from crewai.agents.students_agent import StudentsAgent

get_students_blueprint = Blueprint('get_students', __name__)
agent = StudentsAgent()

@get_students_blueprint.route('/', methods=['GET'])
def get_students():
    establishment_id = request.args.get('establishmentId')
    students = agent.get_students(establishment_id)
    return jsonify(students)
