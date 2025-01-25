from flask import Blueprint, jsonify, request
from backend.crewai.agents.student_quiz_agent import StudentQuizAgent

class StudentQuizRoute:
  def __init__(self):
    self.blueprint = Blueprint('student_quiz', __name__)
    self.agent = StudentQuizAgent()
    self.register_routes()

  def register_routes(self):
    @self.blueprint.route('/get-quiz-question', methods=['GET'])
    def get_quiz_question():
      quiz_id = request.args.get('quizId')
      question_number = int(request.args.get('questionNumber'))
      student_id = request.args.get('studentId')
      question_info = self.agent.select_question(quiz_id, question_number, student_id)
      if question_info:
        return jsonify(question_info)
      else:
        return jsonify({"error": "Question not found"}), 404

    @self.blueprint.route('/get-next-question', methods=['GET'])
    def get_next_question():
      quiz_id = request.args.get('quizId')
      student_id = request.args.get('studentId')
      question_info = self.agent.get_next_question(quiz_id, student_id)
      if question_info:
        return jsonify(question_info)
      else:
        return jsonify({"error": "No more questions available"}), 404
