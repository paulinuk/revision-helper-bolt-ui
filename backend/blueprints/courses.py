from flask import Blueprint, jsonify, request
from crewai.agents.courses_agent import CoursesAgent

courses_blueprint = Blueprint('courses', __name__)
agent = CoursesAgent()

@courses_blueprint.route('/', methods=['GET'])
def get_courses():
    establishment_id = request.args.get('establishmentId')
    courses = agent.get_courses(establishment_id)
    return jsonify(courses)
