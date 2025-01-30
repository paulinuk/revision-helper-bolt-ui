from flask import Blueprint, request, jsonify, render_template
from faiss_storage import FAISSManager

faiss_bp = Blueprint('faiss', __name__)
faiss_manager = FAISSManager()

@faiss_bp.route("/")
def faiss_dashboard():
    courses = faiss_manager.list_courses()
    return render_template("faiss_dashboard.html", courses=courses)

@faiss_bp.route("/create", methods=["GET", "POST"])
def create_faiss_course():
    if request.method == "POST":
        course_name = request.form.get("course_name")
        if course_name:
            faiss_manager.store_documents(course_name, [])  # Initialize empty FAISS index
        return jsonify({"message": "Course created successfully"})
    return render_template("faiss_create_course.html")

@faiss_bp.route("/view", methods=["GET"])
def view_faiss_course():
    course_name = request.args.get("course_name")
    courses = faiss_manager.list_courses()
    course_data = faiss_manager.retrieve_documents(course_name) if course_name else []
    return render_template("faiss_view_course.html", courses=courses, selected_course=course_name, course_data=course_data)

@faiss_bp.route("/delete", methods=["DELETE"])
def delete_faiss_course():
    course_name = request.args.get("course")
    success = faiss_manager.delete_course(course_name)
    return jsonify({"message": "Course deleted" if success else "Course not found"})
