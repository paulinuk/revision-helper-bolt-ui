import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const quizId = searchParams.get('quizId');
  const questionNumber = Number(searchParams.get('questionNumber'));

  if (!quizId || !questionNumber) {
    return NextResponse.json(
      { error: 'Missing required parameters' },
      { status: 400 }
    );
  }

  // Enhanced quiz database with more questions
  const quizzesDatabase = {
    '1': {
      name: 'Mathematics Fundamentals',
      questions: [
        { 
          id: '1-1', 
          topic: 'Basic Arithmetic',
          text: 'What is 2 + 2?', 
          options: ['3', '4', '5', '6'], 
          correctAnswer: '4' 
        },
        { 
          id: '1-2', 
          topic: 'Square Roots',
          text: 'What is the square root of 16?', 
          options: ['2', '4', '6', '8'], 
          correctAnswer: '4' 
        },
        { 
          id: '1-3', 
          topic: 'Multiplication',
          text: 'What is 3 * 3?', 
          options: ['6', '9', '12', '15'], 
          correctAnswer: '9' 
        },
        { 
          id: '1-4', 
          topic: 'Subtraction',
          text: 'What is 10 - 5?', 
          options: ['2', '5', '7', '10'], 
          correctAnswer: '5' 
        },
        { 
          id: '1-5', 
          topic: 'Division',
          text: 'What is 8 / 2?', 
          options: ['2', '3', '4', '5'], 
          correctAnswer: '4' 
        }
      ]
    },
    '2': {
      name: 'Business Basics',
      questions: [
        { 
          id: '2-1', 
          topic: 'Business Goals',
          text: 'What is the primary goal of a business?', 
          options: ['Maximize profits', 'Social responsibility', 'Customer satisfaction', 'Employee happiness'], 
          correctAnswer: 'Maximize profits' 
        },
        { 
          id: '2-2', 
          topic: 'Marketing',
          text: 'What is the main purpose of marketing?', 
          options: ['Increase sales', 'Build brand awareness', 'Customer satisfaction', 'All of the above'], 
          correctAnswer: 'All of the above' 
        }
      ]
    }
  };

  const quiz = quizzesDatabase[quizId];
  if (!quiz) {
    return NextResponse.json(
      { error: 'Quiz not found' },
      { status: 404 }
    );
  }

  const quizQuestions = quiz.questions;

  if (questionNumber < 1 || questionNumber > quizQuestions.length) {
    return NextResponse.json(
      { error: 'Question not found' },
      { status: 404 }
    );
  }

  const currentQuestion = quizQuestions[questionNumber - 1];

  return NextResponse.json({
    ...currentQuestion,
    quizName: quiz.name,
    totalQuestions: quizQuestions.length,
    hasNext: questionNumber < quizQuestions.length
  });
}
