from flask import Blueprint, jsonify, request
from crewai.agents.courses_agent import CoursesAgent
from flasgger import swag_from

course_report_blueprint = Blueprint('course_report', __name__)
agent = CoursesAgent()

@course_report_blueprint.route('/api/get-course-report', methods=['GET'])
@swag_from({
    'responses': {
        200: {
            'description': 'A detailed course report',
            'examples': {
                'application/json': {
                    'report': 'Detailed report content here...'
                }
            }
        },
        400: {
            'description': 'Missing courseId parameter'
        },
        500: {
            'description': 'Internal server error'
        }
    }
})
def get_course_report():
    course_id = request.args.get('courseId')

    if not course_id:
        return jsonify({"error": "Missing courseId parameter"}), 400

    try:
        report = agent.generate_course_report(course_id)
        return jsonify({"report": report})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
