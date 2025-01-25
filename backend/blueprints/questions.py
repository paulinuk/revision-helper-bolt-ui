from flask import Blueprint, jsonify, request
from backend.crewai.agents.questions_agent import QuestionsAgent

questions_blueprint = Blueprint('questions', __name__)
agent = QuestionsAgent()

@questions_blueprint.route('/', methods=['GET'])
def get_questions():
    quiz_id = request.args.get('quizId')
    questions = agent.get_questions(quiz_id)
    return jsonify(questions)
