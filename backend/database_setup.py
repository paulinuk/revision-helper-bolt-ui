import sqlite3
import os
from seeding.seed_data import seed_data

def create_tables():
    db_path = 'local_database/revision_helper.db'

    # Delete the existing database file if it exists
    if os.path.exists(db_path):
        os.remove(db_path)

    # Create a new database connection
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
        ability_level INTEGER NOT NULL CHECK(ability_level BETWEEN 1 AND 10),
        establishment_id INTEGER,
        FOREIGN KEY (establishment_id) REFERENCES establishments(id)
    )
    ''')

    conn.commit()
    conn.close()

if __name__ == '__main__':
    create_tables()
    seed_data()
