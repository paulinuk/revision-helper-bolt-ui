from flask import Blueprint, jsonify, request
from backend.crewai.agents.quizzes_agent import QuizzesAgent

quizzes_blueprint = Blueprint('quizzes', __name__)
agent = QuizzesAgent()

@quizzes_blueprint.route('/', methods=['GET'])
def get_quizzes():
    course_id = request.args.get('courseId')
    quizzes = agent.get_quizzes(course_id)
    return jsonify(quizzes)
