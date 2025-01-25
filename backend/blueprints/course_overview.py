from flask import Blueprint, jsonify, request
from backend.crewai.agents.course_overview_agent import CourseOverviewAgent

course_overview_blueprint = Blueprint('course_overview', __name__)
agent = CourseOverviewAgent()

@course_overview_blueprint.route('/', methods=['GET'])
def get_overview():
    course_id = request.args.get('courseId')
    overview_mode = request.args.get('overviewMode')

    if not all([course_id, overview_mode]):
        return jsonify({"error": "Missing required parameters"}), 400

    try:
        overview = agent.generate_overview(course_id, overview_mode)
        return jsonify({"overview": overview})
    except ValueError as e:
        return jsonify({"error": str(e)}), 400

@course_overview_blueprint.route('/approve', methods=['POST'])
def approve_overview():
    data = request.json
    course_id = data.get('courseId')

    if not course_id:
        return jsonify({"error": "Missing courseId parameter"}), 400

    agent.approve_overview(course_id)
    return jsonify({"message": "Course overview approved successfully"})
