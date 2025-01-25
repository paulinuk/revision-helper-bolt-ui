import sqlite3
import json

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

    # Insert sample courses
    courses = [
        (1, 'Mathematics', 1),
        (2, 'Physics', 1),
        (3, 'Business Studies', 3),
        (4, 'Computer Science', 3),
        (5, 'Health and Social Care', 3),
        (6, 'Engineering', 3)
    ]
    cursor.executemany('INSERT INTO courses (id, name, establishment_id) VALUES (?, ?, ?)', courses)

    # Insert sample quizzes
    quizzes = [
        (1, 'Algebra Basics', 1, '2023-10-01'),
        (2, 'Calculus Intro', 1, '2023-10-02'),
        (3, 'Business Fundamentals', 3, '2023-10-03'),
        (4, 'Marketing Principles', 3, '2023-10-04')
    ]
    cursor.executemany('INSERT INTO quizzes (id, name, course_id, quiz_date) VALUES (?, ?, ?, ?)', quizzes)

    # Insert sample questions with JSON options
    questions = [
        (1, 'What is 2 + 2?', json.dumps(['3', '4', '5', '6']), '4', 1),
        (2, 'What is the square root of 16?', json.dumps(['2', '4', '6', '8']), '4', 1),
        (3, 'What is the primary goal of a business?', json.dumps(['Maximize profits', 'Social responsibility', 'Customer satisfaction', 'Employee happiness']), 'Maximize profits', 3)
    ]
    cursor.executemany('INSERT INTO questions (id, text, options, correct_answer, quiz_id) VALUES (?, ?, ?, ?, ?)', questions)

    # Insert sample student performance
    student_performance = [
        (1, 121, 1, 1, 1, '4', True, '2023-10-01'),
        (2, 121, 1, 1, 2, '4', True, '2023-10-01'),
        (3, 121, 3, 3, 3, 'Maximize profits', True, '2023-10-03')
    ]
    cursor.executemany('INSERT INTO student_performance (id, student_id, course_id, quiz_id, question_id, provided_answer, is_correct, answer_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', student_performance)

    conn.commit()
    conn.close()

if __name__ == '__main__':
    seed_data()
