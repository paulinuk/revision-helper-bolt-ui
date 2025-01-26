from flask import Blueprint, jsonify
from crewai.agents.establishments_agent import EstablishmentsAgent

establishments_blueprint = Blueprint('establishments', __name__)
agent = EstablishmentsAgent()

@establishments_blueprint.route('/', methods=['GET'])
def get_establishments():
    establishments = agent.get_establishments()
    return jsonify(establishments)
