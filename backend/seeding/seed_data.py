import os
import sqlite3
import json
from datetime import datetime

def seed_data():
    # Define the path to the database relative to the script's location
    db_path = os.path.join(os.path.dirname(__file__), '../local_database/revision_helper.db')
    db_dir = os.path.dirname(db_path)

    # Create the directory if it doesn't exist
    if not os.path.exists(db_dir):
        os.makedirs(db_dir)

    # Remove the existing database file if it exists
    if os.path.exists(db_path):
        os.remove(db_path)

    # Connect to the database
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # Create tables
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS establishments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
    )
    ''')

    cursor.execute('''
    CREATE TABLE IF NOT EXISTS courses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        establishment_id INTEGER,
        course_overview TEXT,
        approved BOOLEAN DEFAULT FALSE,
        FOREIGN KEY (establishment_id) REFERENCES establishments(id)
    )
    ''')

    cursor.execute('''
    CREATE TABLE IF NOT EXISTS quizzes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        course_id INTEGER,
        quiz_date DATE NOT NULL,
        quiz_number INTEGER,
        student_id INTEGER,
        started BOOLEAN DEFAULT FALSE,
        FOREIGN KEY (course_id) REFERENCES courses(id),
        FOREIGN KEY (student_id) REFERENCES students(id)
    )
    ''')

    cursor.execute('''
    CREATE TABLE IF NOT EXISTS questions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT NOT NULL,
        options TEXT NOT NULL,
        correct_answer TEXT NOT NULL,
        quiz_id INTEGER,
        topic TEXT,
        difficulty_level INTEGER,
        FOREIGN KEY (quiz_id) REFERENCES quizzes(id)
    )
    ''')

    cursor.execute('''
    CREATE TABLE IF NOT EXISTS student_performance (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_id INTEGER NOT NULL,
        course_id INTEGER NOT NULL,
        quiz_id INTEGER NOT NULL,
        question_id INTEGER NOT NULL,
        provided_answer TEXT,
        is_correct BOOLEAN,
        answer_date DATE NOT NULL,
        FOREIGN KEY (course_id) REFERENCES courses(id),
        FOREIGN KEY (quiz_id) REFERENCES quizzes(id),
        FOREIGN KEY (question_id) REFERENCES questions(id)
    )
    ''')

    cursor.execute('''
    CREATE TABLE IF NOT EXISTS student_question_history (
        student_id INTEGER NOT NULL,
        question_id INTEGER NOT NULL,
        last_asked_date DATE,
        PRIMARY KEY (student_id, question_id),
        FOREIGN KEY (question_id) REFERENCES questions(id)
    )
    ''')

    cursor.execute('''
    CREATE TABLE IF NOT EXISTS course_materials (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        course_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        upload_date DATE NOT NULL,
        materialType TEXT NOT NULL,
        rawData BLOB NOT NULL,
        extractedData TEXT,
        FOREIGN KEY (course_id) REFERENCES courses(id)
    )
    ''')

    cursor.execute('''
    CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        forename TEXT NOT NULL,
        surname TEXT NOT NULL,
        full_name TEXT NOT NULL,
        ability_level INTEGER CHECK(ability_level BETWEEN 1 AND 10),
        establishment_id INTEGER,
        FOREIGN KEY (establishment_id) REFERENCES establishments(id)
    )
    ''')

    # Insert sample data
    establishments = [
        (1, 'University A'),
        (2, 'College B'),
        (3, 'Bromley College'),
        (4, 'Tech Institute'),
        (5, 'Art Academy')
    ]
    cursor.executemany('INSERT INTO establishments (id, name) VALUES (?, ?)', establishments)

    courses = [
        (1, 'Mathematics', 1, 'This course covers fundamental mathematical concepts including algebra, calculus, and geometry.', True),
        (2, 'Physics', 1, 'Explore the principles of physics, including mechanics, thermodynamics, and electromagnetism.', True),
        (3, 'Business Studies', 3, 'Learn about business management, marketing strategies, and financial analysis.', True),
        (4, 'Computer Science', 3, 'Introduction to programming, data structures, and algorithms.', True),
        (5, 'Health and Social Care', 3, 'Focus on patient care, health policies, and social work practices.', True),
        (6, 'Engineering', 3, 'Study engineering principles, design processes, and material science.', True),
        (7, 'Graphic Design', 5, 'Explore visual communication, typography, and digital media.', False),
        (8, 'Cybersecurity', 4, 'Learn about network security, cryptography, and ethical hacking.', True)
    ]
    cursor.executemany('INSERT INTO courses (id, name, establishment_id, course_overview, approved) VALUES (?, ?, ?, ?, ?)', courses)

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
        (10, 'Jack', 'Thomas', 'Jack Thomas', 1, 2),
        (11, 'Kara', 'White', 'Kara White', 5, 4),
        (12, 'Liam', 'Green', 'Liam Green', 7, 5)
    ]
    cursor.executemany('INSERT INTO students (id, forename, surname, full_name, ability_level, establishment_id) VALUES (?, ?, ?, ?, ?, ?)', students)

    quizzes = [
        (1, 'Algebra Basics', 1, '2023-10-01', 1, 1, True),
        (2, 'Calculus Intro', 1, '2023-10-02', 2, 1, True),
        (3, 'Business Fundamentals', 3, '2023-10-03', 1, 3, True),
        (4, 'Marketing Principles', 3, '2023-10-04', 2, 3, True),
        (5, 'Introduction to Programming', 4, '2023-10-05', 1, 4, True),
        (6, 'Network Security Basics', 8, '2023-10-06', 1, 8, True)
    ]
    cursor.executemany('INSERT INTO quizzes (id, name, course_id, quiz_date, quiz_number, student_id, started) VALUES (?, ?, ?, ?, ?, ?, ?)', quizzes)

    questions = [
        (1, 'What is 2 + 2?', json.dumps(['3', '4', '5', '6']), '4', 1, 'Arithmetic', 1),
        (2, 'What is the square root of 16?', json.dumps(['2', '4', '6', '8']), '4', 1, 'Arithmetic', 2),
        (3, 'What is the primary goal of a business?', json.dumps(['Maximize profits', 'Social responsibility', 'Customer satisfaction', 'Employee happiness']), 'Maximize profits', 3, 'Business', 3),
        (4, 'What is the capital of France?', json.dumps(['Berlin', 'Madrid', 'Paris', 'Rome']), 'Paris', 5, 'Geography', 1),
        (5, 'What is the chemical symbol for water?', json.dumps(['H2O', 'O2', 'CO2', 'H2']), 'H2O', 6, 'Chemistry', 2)
    ]
    cursor.executemany('INSERT INTO questions (id, text, options, correct_answer, quiz_id, topic, difficulty_level) VALUES (?, ?, ?, ?, ?, ?, ?)', questions)

    student_performance = [
        (1, 1, 1, 1, 1, '4', True, '2023-10-01'),
        (2, 1, 1, 1, 2, '4', True, '2023-10-01'),
        (3, 3, 3, 3, 3, 'Maximize profits', True, '2023-10-03'),
        (4, 4, 4, 4, 4, 'Paris', True, '2023-10-05'),
        (5, 5, 5, 5, 5, 'H2O', True, '2023-10-06'),
        (6, 2, 1, 2, 1, '4', True, '2023-10-02'),
        (7, 2, 1, 2, 2, '4', True, '2023-10-02'),
        (8, 8, 8, 6, 5, 'H2O', True, '2023-10-06')
    ]
    cursor.executemany('INSERT INTO student_performance (id, student_id, course_id, quiz_id, question_id, provided_answer, is_correct, answer_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', student_performance)

    student_question_history = [
        (1, 1, '2023-09-30'),
        (1, 2, '2023-09-30'),
        (3, 3, '2023-10-02'),
        (4, 4, '2023-10-04'),
        (5, 5, '2023-10-06')
    ]
    cursor.executemany('INSERT INTO student_question_history (student_id, question_id, last_asked_date) VALUES (?, ?, ?)', student_question_history)

    course_materials = [
        (1, 1, 'Algebra Textbook', '2023-10-01', 'staticDocument', b'Raw data for Algebra Textbook', 'This textbook covers basic algebraic concepts including variables, equations, and functions.'),
        (2, 2, 'Physics Notes', '2023-10-02', 'handwritten', b'Raw data for Physics Notes', 'These notes include fundamental physics principles such as Newton\'s laws, energy, and momentum.'),
        (3, 3, 'Business Presentation', '2023-10-03', 'pdf', b'Raw data for Business Presentation', 'The presentation outlines key business strategies and market analysis techniques.'),
        (4, 4, 'Computer Science Syllabus', '2023-10-04', 'staticDocument', b'Raw data for Computer Science Syllabus', 'The syllabus provides an overview of programming languages, data structures, and algorithms.'),
        (5, 5, 'Health and Social Care Guide', '2023-10-05', 'pdf', b'Raw data for Health and Social Care Guide', 'This guide discusses patient care, health policies, and social work practices.'),
        (6, 6, 'Engineering Handbook', '2023-10-06', 'staticDocument', b'Raw data for Engineering Handbook', 'The handbook covers engineering principles, design processes, and material science.'),
        (7, 7, 'Graphic Design Portfolio', '2023-10-07', 'pdf', b'Raw data for Graphic Design Portfolio', 'A collection of design projects showcasing typography, layout, and color theory.'),
        (8, 8, 'Cybersecurity Manual', '2023-10-08', 'staticDocument', b'Raw data for Cybersecurity Manual', 'Comprehensive guide on network security protocols, encryption, and threat analysis.')
    ]
    cursor.executemany('INSERT INTO course_materials (id, course_id, name, upload_date, materialType, rawData, extractedData) VALUES (?, ?, ?, ?, ?, ?, ?)', course_materials)

    conn.commit()
    conn.close()

if __name__ == '__main__':
    seed_data()
