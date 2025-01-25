from flask import Blueprint, jsonify, request
from backend.crewai.agents.questions_agent import QuestionsAgent

class QuestionsRoute:
  def __init__(self):
    self.blueprint = Blueprint('questions', __name__)
    self.agent = QuestionsAgent()
    self.register_routes()

  def register_routes(self):
    @self.blueprint.route('/', methods=['GET'])
    def get_questions():
      quiz_id = request.args.get('quizId')
      questions = self.agent.get_questions(quiz_id)
      return jsonify(questions)
