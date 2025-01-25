from flask import Blueprint, jsonify, request
from backend.crewai.agents.course_materials_agent import CourseMaterialsAgent

course_materials_blueprint = Blueprint('course_materials', __name__)
agent = CourseMaterialsAgent()

@course_materials_blueprint.route('/', methods=['POST'])
def add_material():
    data = request.json
    course_id = data.get('courseId')
    name = data.get('name')
    materialType = data.get('materialType')
    rawData = data.get('rawData')

    if not all([course_id, name, materialType, rawData]):
        return jsonify({"error": "Missing required fields"}), 400

    agent.add_material(course_id, name, materialType, rawData)
    return jsonify({"message": "Material added successfully"}), 201

@course_materials_blueprint.route('/', methods=['GET'])
def get_materials():
    course_id = request.args.get('courseId')
    materials = agent.get_materials(course_id)
    return jsonify(materials)
