import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const quizId = searchParams.get('quizId');

  // Sample questions data
  const questions = {
    '1': [
      {
        id: '1',
        text: 'What is 2 + 2?',
        options: ['3', '4', '5', '6'],
        correctAnswer: '4'
      },
      {
        id: '2',
        text: 'What is the square root of 16?',
        options: ['2', '4', '6', '8'],
        correctAnswer: '4'
      }
    ],
    '3': [
      {
        id: '3',
        text: 'What is the primary goal of a business?',
        options: ['Maximize profits', 'Social responsibility', 'Customer satisfaction', 'Employee happiness'],
        correctAnswer: 'Maximize profits'
      }
    ]
  };

  return NextResponse.json(questions[quizId] || []);
}
