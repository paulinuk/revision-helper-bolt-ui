from flask import Blueprint, jsonify, request
from backend.crewai.agents.student_quiz_agent import StudentQuizAgent

finish_quiz_blueprint = Blueprint('finish_quiz', __name__)
agent = StudentQuizAgent()

@finish_quiz_blueprint.route('/finish', methods=['GET'])
def finish_quiz():
  quiz_id = request.args.get('quizId')
  student_id = request.args.get('studentId')

  if not quiz_id or not student_id:
    return jsonify({"error": "Missing required parameters"}), 400

  try:
    result = agent.finish_quiz(quiz_id)
    return jsonify(result)
  except Exception as e:
    return jsonify({"error": str(e)}), 500
