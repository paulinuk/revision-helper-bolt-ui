import sqlite3
import json
from datetime import datetime

def seed_data():
    conn = sqlite3.connect('local_database/revision_helper.db')
    cursor = conn.cursor()

    # Insert sample establishments
    establishments = [
        (1, 'University A'),
        (2, 'College B'),
        (3, 'Bromley College')
    ]
    cursor.executemany('INSERT INTO establishments (id, name) VALUES (?, ?)', establishments)

    # Insert sample courses with course_overviews
    courses = [
        (1, 'Mathematics', 1, 'This course covers fundamental mathematical concepts including algebra, calculus, and geometry.', True),
        (2, 'Physics', 1, 'Explore the principles of physics, including mechanics, thermodynamics, and electromagnetism.', True),
        (3, 'Business Studies', 3, 'Learn about business management, marketing strategies, and financial analysis.', True),
        (4, 'Computer Science', 3, 'Introduction to programming, data structures, and algorithms.', True),
        (5, 'Health and Social Care', 3, 'Focus on patient care, health policies, and social work practices.', True),
        (6, 'Engineering', 3, 'Study engineering principles, design processes, and material science.', True)
    ]
    cursor.executemany('INSERT INTO courses (id, name, establishment_id, course_overview, approved) VALUES (?, ?, ?, ?, ?)', courses)

    # Insert sample students
    students = [
        (1, 'Alice', 'Smith', 'Alice Smith', 8, 1),
        (2, 'Bob', 'Johnson', 'Bob Johnson', 5, 2),
        (3, 'Charlie', 'Brown', 'Charlie Brown', 7, 3),
        (4, 'David', 'Wilson', 'David Wilson', 6, None),
        (5, 'Eva', 'Davis', 'Eva Davis', 9, 1),
        (6, 'Frank', 'Miller', 'Frank Miller', 4, 2),
        (7, 'Grace', 'Lee', 'Grace Lee', 10, 3),
        (8, 'Hannah', 'Taylor', 'Hannah Taylor', 3, None),
        (9, 'Ian', 'Anderson', 'Ian Anderson', 2, 1),
        (10, 'Jack', 'Thomas', 'Jack Thomas', 1, 2)
    ]
    cursor.executemany('INSERT INTO students (id, forename, surname, full_name, ability_level, establishment_id) VALUES (?, ?, ?, ?, ?, ?)', students)

    # Insert sample quizzes
    quizzes = [
        (1, 'Algebra Basics', 1, '2023-10-01', 1, 1, True),
        (2, 'Calculus Intro', 1, '2023-10-02', 2, 1, True),
        (3, 'Business Fundamentals', 3, '2023-10-03', 1, 3, True),
        (4, 'Marketing Principles', 3, '2023-10-04', 2, 3, True)
    ]
    cursor.executemany('INSERT INTO quizzes (id, name, course_id, quiz_date, quiz_number, student_id, started) VALUES (?, ?, ?, ?, ?, ?, ?)', quizzes)

    # Insert sample questions with JSON options
    questions = [
        (1, 'What is 2 + 2?', json.dumps(['3', '4', '5', '6']), '4', 1, 'Arithmetic', 1),
        (2, 'What is the square root of 16?', json.dumps(['2', '4', '6', '8']), '4', 1, 'Arithmetic', 2),
        (3, 'What is the primary goal of a business?', json.dumps(['Maximize profits', 'Social responsibility', 'Customer satisfaction', 'Employee happiness']), 'Maximize profits', 3, 'Business', 3)
    ]
    cursor.executemany('INSERT INTO questions (id, text, options, correct_answer, quiz_id, topic, difficulty_level) VALUES (?, ?, ?, ?, ?, ?, ?)', questions)

    # Insert sample student performance
    student_performance = [
        (1, 1, 1, 1, 1, '4', True, '2023-10-01'),
        (2, 1, 1, 1, 2, '4', True, '2023-10-01'),
        (3, 3, 3, 3, 3, 'Maximize profits', True, '2023-10-03')
    ]
    cursor.executemany('INSERT INTO student_performance (id, student_id, course_id, quiz_id, question_id, provided_answer, is_correct, answer_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', student_performance)

    # Insert sample student question history
    student_question_history = [
        (1, 1, '2023-09-30'),
        (1, 2, '2023-09-30'),
        (3, 3, '2023-10-02')
    ]
    cursor.executemany('INSERT INTO student_question_history (student_id, question_id, last_asked_date) VALUES (?, ?, ?)', student_question_history)

    # Insert sample course materials
    course_materials = [
        (1, 1, 'Algebra Textbook', '2023-10-01', 'staticDocument', b'Raw data for Algebra Textbook', 'This textbook covers basic algebraic concepts including variables, equations, and functions.'),
        (2, 2, 'Physics Notes', '2023-10-02', 'handwritten', b'Raw data for Physics Notes', 'These notes include fundamental physics principles such as Newton\'s laws, energy, and momentum.'),
        (3, 3, 'Business Presentation', '2023-10-03', 'pdf', b'Raw data for Business Presentation', 'The presentation outlines key business strategies and market analysis techniques.'),
        (4, 4, 'Computer Science Syllabus', '2023-10-04', 'staticDocument', b'Raw data for Computer Science Syllabus', 'The syllabus provides an overview of programming languages, data structures, and algorithms.'),
        (5, 5, 'Health and Social Care Guide', '2023-10-05', 'pdf', b'Raw data for Health and Social Care Guide', 'This guide discusses patient care, health policies, and social work practices.'),
        (6, 6, 'Engineering Handbook', '2023-10-06', 'staticDocument', b'Raw data for Engineering Handbook', 'The handbook covers engineering principles, design processes, and material science.')
    ]
    cursor.executemany('INSERT INTO course_materials (id, course_id, name, upload_date, materialType, rawData, extractedData) VALUES (?, ?, ?, ?, ?, ?, ?)', course_materials)

    conn.commit()
    conn.close()

if __name__ == '__main__':
    seed_data()
