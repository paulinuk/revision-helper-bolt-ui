import { NextResponse } from 'next/server';

export async function GET() {
  // Simulated data for students
  const students = [
    { id: '121', name: 'Alice Smith' },
    { id: '122', name: 'Bob Johnson' },
    { id: '123', name: 'Charlie Brown' },
  ];

  return NextResponse.json(students);
}
