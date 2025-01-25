from flask import Blueprint, jsonify, request
from backend.crewai.agents.student_quiz_agent import StudentQuizAgent

student_quiz_blueprint = Blueprint('student_quiz', __name__)
agent = StudentQuizAgent()

@student_quiz_blueprint.route('/get-quiz-question', methods=['GET'])
def get_quiz_question():
    quiz_id = request.args.get('quizId')
    question_number = int(request.args.get('questionNumber'))
    student_id = request.args.get('studentId')
    question_info = agent.select_question(quiz_id, question_number, student_id)
    if question_info:
        return jsonify(question_info)
    else:
        return jsonify({"error": "Question not found"}), 404

@student_quiz_blueprint.route('/get-next-question', methods=['GET'])
def get_next_question():
    quiz_id = request.args.get('quizId')
    student_id = request.args.get('studentId')
    question_info = agent.get_next_question(quiz_id, student_id)
    if question_info:
        return jsonify(question_info)
    else:
        return jsonify({"error": "No more questions available"}), 404
