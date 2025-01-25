const sqlite3 = require('sqlite3').verbose();

function createTables() {
  const db = new sqlite3.Database('backend/local_database/revision_helper.db');

  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS establishments (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS courses (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        establishment_id INTEGER,
        FOREIGN KEY (establishment_id) REFERENCES establishments(id)
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS quizzes (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        course_id INTEGER,
        quiz_date DATE NOT NULL,
        FOREIGN KEY (course_id) REFERENCES courses(id)
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS questions (
        id INTEGER PRIMARY KEY,
        text TEXT NOT NULL,
        options TEXT NOT NULL,
        correct_answer TEXT NOT NULL,
        quiz_id INTEGER,
        FOREIGN KEY (quiz_id) REFERENCES quizzes(id)
      )
    `);

    db.run(`
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
    `);
  });

  db.close();
}

createTables();
