from flask import Blueprint, jsonify, request
from crewai.agents.questions_agent import QuestionsAgent

questions_blueprint = Blueprint('questions', __name__)
agent = QuestionsAgent()

@questions_blueprint.route('/', methods=['GET'])
def get_questions():
    quiz_id = request.args.get('quizId')
    try:
        questions = agent.get_questions(quiz_id)
        return jsonify(questions)
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
