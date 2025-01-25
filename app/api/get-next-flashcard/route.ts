import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const courseId = searchParams.get('courseId');
  const studentId = searchParams.get('studentId');

  if (!courseId || !studentId) {
    return NextResponse.json(
      { error: 'Missing required parameters' },
      { status: 400 }
    );
  }

  // Simulated flashcard data with topics
  const flashcards = {
    '1': [
      { topic: 'Arithmetic', front: 'What is 2 + 2?', back: '4' },
      { topic: 'Geography', front: 'What is the capital of France?', back: 'Paris' },
      { topic: 'Mathematics', front: 'What is the square root of 16?', back: '4' },
      { topic: 'Chemistry', front: 'What is the chemical symbol for water?', back: 'H2O' },
      { topic: 'Astronomy', front: 'What is the largest planet in our solar system?', back: 'Jupiter' }
    ],
    '3': [
      { topic: 'Business', front: 'What is the primary goal of a business?', back: 'Maximize profits' },
      { topic: 'Marketing', front: 'What is the main purpose of marketing?', back: 'All of the above' },
      { topic: 'Geography', front: 'What is the capital of Germany?', back: 'Berlin' },
      { topic: 'Chemistry', front: 'What is the chemical symbol for gold?', back: 'Au' },
      { topic: 'Geography', front: 'What is the largest ocean on Earth?', back: 'Pacific Ocean' }
    ]
  };

  const courseFlashcards = flashcards[courseId] || [];
  const randomIndex = Math.floor(Math.random() * courseFlashcards.length);
  const flashcard = courseFlashcards[randomIndex];

  return NextResponse.json(flashcard);
}
