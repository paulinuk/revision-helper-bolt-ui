from flask import Blueprint, jsonify
from backend.crewai.agents.establishments_agent import EstablishmentsAgent

class EstablishmentsRoute:
  def __init__(self):
    self.blueprint = Blueprint('establishments', __name__)
    self.agent = EstablishmentsAgent()
    self.register_routes()

  def register_routes(self):
    @self.blueprint.route('/', methods=['GET'])
    def get_establishments():
      establishments = self.agent.get_establishments()
      return jsonify(establishments)
