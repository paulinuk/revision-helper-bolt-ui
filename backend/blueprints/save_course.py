from flask import Blueprint, jsonify, request
from backend.crewai.agents.courses_agent import CoursesAgent

save_course_blueprint = Blueprint('save_course', __name__)
agent = CoursesAgent()

@save_course_blueprint.route('/api/save-course', methods=['POST'])
def save_course():
    data = request.json
    course_id = data.get('courseId')
    course_name = data.get('courseName')
    establishment_id = data.get('establishmentId')
    overview = data.get('overview')

    if not course_name or not establishment_id:
        return jsonify({"error": "Missing required fields"}), 400

    try:
        course_id = agent.save_course(course_id, course_name, establishment_id, overview)
        return jsonify({"message": "Course saved successfully", "courseId": course_id})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
