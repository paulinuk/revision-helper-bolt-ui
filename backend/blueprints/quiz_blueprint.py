from flask import Blueprint, request, jsonify
from crewai.agents.student_quiz_agent import StudentQuizAgent

quiz_blueprint = Blueprint('quiz', __name__)
agent = StudentQuizAgent()

@quiz_blueprint.route('/get-quiz-question', methods=['POST'])
def get_quiz_question():
  data = request.json
  course_id = data.get('courseId')
  student_id = data.get('studentId')
  question_number = data.get('questionNumber')
  difficulty_level = data.get('difficultyLevel')
  topic_selection_method = data.get('topicSelectionMethod')
  selected_topics = data.get('selectedTopics', [])

  if not all([course_id, student_id, question_number]):
    return jsonify({"error": "Missing required parameters"}), 400

  question_info = agent.get_next_question(
    student_id=student_id,
    course_id=course_id,
    question_number=question_number,
    difficultyLevel=difficulty_level,
    topicSelectionMethod=topic_selection_method,
    selectedTopics=selected_topics
  )

  if question_info:
    return jsonify(question_info)
  else:
    return jsonify({"error": "No more questions available"}), 404
