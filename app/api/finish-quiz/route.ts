import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const quizId = searchParams.get('quizId');
  const studentId = searchParams.get('studentId');

  if (!quizId || !studentId) {
    return NextResponse.json(
      { error: 'Missing required parameters' },
      { status: 400 }
    );
  }

  // Simulated API response with more questions
  const response = {
    Score: 75,
    CorrectAnswers: 15,
    IncorrectAnswers: 5,
    QuizName: 'Mathematics Fundamentals',
    TopicSummary: [
      {
        TopicName: 'Basic Arithmetic',
        CorrectAnswers: 5,
        IncorrectAnswers: 0,
        ScorePercentage: 100
      },
      {
        TopicName: 'Square Roots',
        CorrectAnswers: 3,
        IncorrectAnswers: 2,
        ScorePercentage: 60
      },
      {
        TopicName: 'Multiplication',
        CorrectAnswers: 4,
        IncorrectAnswers: 1,
        ScorePercentage: 80
      }
    ],
    CorrectQuestions: [
      { Question: 'What is 2 + 2?', CorrectAnswer: '4' },
      { Question: 'What is the square root of 16?', CorrectAnswer: '4' },
      { Question: 'What is 5 * 5?', CorrectAnswer: '25' },
      { Question: 'What is 10 - 5?', CorrectAnswer: '5' }
    ],
    IncorrectQuestions: [
      {
        Question: 'What is 3 * 3?',
        ProvidedAnswer: '8',
        CorrectAnswer: '9'
      },
      {
        Question: 'What is 8 / 2?',
        ProvidedAnswer: '3',
        CorrectAnswer: '4'
      }
    ],
    Recommendation: 'Review the topics of square roots and division for better understanding.'
  };

  return NextResponse.json(response);
}
