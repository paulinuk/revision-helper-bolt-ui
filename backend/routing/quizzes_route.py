from flask import Blueprint, jsonify, request
from backend.crewai.agents.quizzes_agent import QuizzesAgent

class QuizzesRoute:
  def __init__(self):
    self.blueprint = Blueprint('quizzes', __name__)
    self.agent = QuizzesAgent()
    self.register_routes()

  def register_routes(self):
    @self.blueprint.route('/', methods=['GET'])
    def get_quizzes():
      course_id = request.args.get('courseId')
      quizzes = self.agent.get_quizzes(course_id)
      return jsonify(quizzes)
