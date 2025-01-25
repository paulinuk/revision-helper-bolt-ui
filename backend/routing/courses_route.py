from flask import Blueprint, jsonify, request
from backend.crewai.agents.courses_agent import CoursesAgent

class CoursesRoute:
  def __init__(self):
    self.blueprint = Blueprint('courses', __name__)
    self.agent = CoursesAgent()
    self.register_routes()

  def register_routes(self):
    @self.blueprint.route('/', methods=['GET'])
    def get_courses():
      establishment_id = request.args.get('establishmentId')
      courses = self.agent.get_courses(establishment_id)
      return jsonify(courses)
