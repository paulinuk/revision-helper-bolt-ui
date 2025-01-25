import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const courseId = searchParams.get('courseId');
  
  const quizzes = [
    { id: '1', name: 'Algebra Basics', courseId: '1' },
    { id: '2', name: 'Calculus Intro', courseId: '1' },
    { id: '3', name: 'Business Fundamentals', courseId: '3' },
    { id: '4', name: 'Marketing Principles', courseId: '3' },
    { id: '5', name: 'Programming Basics', courseId: '4' },
    { id: '6', name: 'Web Development', courseId: '4' },
    { id: '7', name: 'Anatomy Basics', courseId: '5' },
    { id: '8', name: 'Care Principles', courseId: '5' },
    { id: '9', name: 'Mechanical Principles', courseId: '6' },
    { id: '10', name: 'Electrical Circuits', courseId: '6' },
  ].filter(quiz => quiz.courseId === courseId);
  
  return NextResponse.json(quizzes);
}
