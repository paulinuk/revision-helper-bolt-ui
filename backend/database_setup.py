import sqlite3

def create_tables():
    conn = sqlite3.connect('local_database/revision_helper.db')
    cursor = conn.cursor()

    # Create tables
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS establishments (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL
    )
    ''')

    cursor.execute('''
    CREATE TABLE IF NOT EXISTS courses (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        establishment_id INTEGER,
        FOREIGN KEY (establishment_id) REFERENCES establishments(id)
    )
    ''')

    cursor.execute('''
    CREATE TABLE IF NOT EXISTS quizzes (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        course_id INTEGER,
        quiz_date DATE NOT NULL,
        FOREIGN KEY (course_id) REFERENCES courses(id)
    )
    ''')

    cursor.execute('''
    CREATE TABLE IF NOT EXISTS questions (
        id INTEGER PRIMARY KEY,
        text TEXT NOT NULL,
        options TEXT NOT NULL,
        correct_answer TEXT NOT NULL,
        quiz_id INTEGER,
        FOREIGN KEY (quiz_id) REFERENCES quizzes(id)
    )
    ''')

    cursor.execute('''
    CREATE TABLE IF NOT EXISTS student_performance (
        id INTEGER PRIMARY KEY,
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

    conn.commit()
    conn.close()

if __name__ == '__main__':
    create_tables()
