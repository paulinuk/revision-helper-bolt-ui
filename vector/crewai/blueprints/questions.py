from flask import Blueprint, request, jsonify
from crewai.agents import QuestionGenerationAgent, DatabaseAgent
import json

questions_bp = Blueprint('questions', __name__)

# Load configuration
with open("config/config.json", "r") as file:
    config = json.load(file)

def get_model_config():
    return config["models"][config["default_models"]["question_generation"]]

@questions_bp.route("/generate", methods=["POST"])
def generate_questions():
    data = request.json
    subject = data.get("subject")
    topics = data.get("topics")
    question_agent = QuestionGenerationAgent(subject, get_model_config())
    all_questions = question_agent.generate_questions(topics)
    database_agent = DatabaseAgent(get_model_config())
    database_agent.save_to_database(subject, "all_questions", all_questions)
    return jsonify({"message": "Questions generated successfully", "questions": all_questions})
