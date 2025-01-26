from flask import Blueprint, jsonify, request
from crewai.agents.courses_agent import CoursesAgent

course_report_blueprint = Blueprint('course_report', __name__)
agent = CoursesAgent()

@course_report_blueprint.route('/api/get-course-report', methods=['GET'])
def get_course_report():
    course_id = request.args.get('courseId')

    if not course_id:
        return jsonify({"error": "Missing courseId parameter"}), 400

    try:
        report = agent.generate_course_report(course_id)
        return jsonify({"report": report})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Serve Swagger UI
@course_report_blueprint.route('/api/docs')
def swagger_ui():
    return '''
    <!DOCTYPE html>
    <html>
    <head>
        <title>Swagger UI</title>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/3.36.0/swagger-ui.css" rel="stylesheet">
    </head>
    <body>
        <div id="swagger-ui"></div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/3.36.0/swagger-ui-bundle.js"></script>
        <script>
            const ui = SwaggerUIBundle({
                url: '/api/swagger/swagger.json',  // Updated path
                dom_id: '#swagger-ui',
            });
        </script>
    </body>
    </html>
    '''
