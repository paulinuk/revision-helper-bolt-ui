from flask import Blueprint, request, jsonify
from crewai.agents import ResearchAgent
import json

research_bp = Blueprint('research', __name__)

# Load configuration
with open("config/config.json", "r") as file:
    config = json.load(file)

def get_model_config():
    return config["models"][config["default_models"]["research"]]

@research_bp.route("/", methods=["POST"])
def research():
    data = request.json
    subject = data.get("subject")
    topics = data.get("topics")
    research_agent = ResearchAgent(subject, get_model_config())
    retrieved_data = research_agent.retrieve_multiple_topics(topics)
    return jsonify({"message": "Research completed", "overview": retrieved_data})
