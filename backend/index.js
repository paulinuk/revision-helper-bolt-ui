const express = require('express');
const app = express();
const port = 3001;

// Simulated data for establishments
const establishments = [
  { id: '1', name: 'University A' },
  { id: '2', name: 'College B' },
  { id: '3', name: 'Bromley College' },
];

app.get('/api/establishments', (req, res) => {
  res.json(establishments);
});

app.get('/api/courses', (req, res) => {
  const establishmentId = req.query.establishmentId;
  // Logic to retrieve courses for the given establishment
  const courses = getCourses(establishmentId);
  res.json(courses);
});

app.get('/api/quizzes', (req, res) => {
  const courseId = req.query.courseId;
  // Logic to retrieve quizzes for the given course
  const quizzes = getQuizzes(courseId);
  res.json(quizzes);
});

app.get('/api/quiz-question', (req, res) => {
  const courseId = req.query.courseId;
  const studentId = req.query.studentId;
  // Logic to retrieve the next question for the student
  const question = getNextQuestion(courseId, studentId);
  res.json(question);
});

function getCourses(establishmentId) {
  // Simulated logic to get courses
  return [
    { id: '1', name: 'Mathematics', establishmentId: '1' },
    { id: '2', name: 'Physics', establishmentId: '1' },
    { id: '3', name: 'Business Studies', establishmentId: '3' },
  ].filter(course => course.establishmentId === establishmentId);
}

function getQuizzes(courseId) {
  // Simulated logic to get quizzes
  return [
    { id: '1', name: 'Algebra Basics', courseId: '1' },
    { id: '2', name: 'Calculus Intro', courseId: '1' },
  ].filter(quiz => quiz.courseId === courseId);
}

function getNextQuestion(courseId, studentId) {
  // Simulated logic to get the next question
  return {
    question: 'What is 2 + 2?',
    options: ['3', '4', '5', '6'],
    correctAnswer: '4',
  };
}

app.listen(port, () => {
  console.log(`Backend app listening at http://localhost:${port}`);
});
