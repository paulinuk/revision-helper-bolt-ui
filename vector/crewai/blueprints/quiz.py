from flask import Blueprint, request, jsonify
from crewai.agents import QuizAgent
import json

quiz_bp = Blueprint('quiz', __name__)

# Load configuration
with open("config/config.json", "r") as file:
    config = json.load(file)

def get_model_config():
    return config["models"][config["default_models"]["quiz"]]

def format_quiz(quiz):
    formatted_quiz = []
    for i, q in enumerate(quiz):
        formatted_quiz.append({
            "question": q["question"],
            "choices": q["choices"],
            "correct_answer": q["choices"][q["correct_index"]],
            "labelled_choices": {"A": q["choices"][0], "B": q["choices"][1], "C": q["choices"][2], "D": q["choices"][3]}
        })
    return formatted_quiz

@quiz_bp.route("/generate", methods=["POST"])
def generate_quiz():
    data = request.json
    subject = data.get("subject")
    quiz_agent = QuizAgent(subject, get_model_config())
    selected_quiz = quiz_agent.generate_quiz()
    formatted_quiz = format_quiz(selected_quiz)
    return jsonify(formatted_quiz)
