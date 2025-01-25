import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const establishmentId = searchParams.get('establishmentId');
  
  const courses = [
    { id: '1', name: 'Mathematics', establishmentId: '1' },
    { id: '2', name: 'Physics', establishmentId: '1' },
    { id: '3', name: 'Business Studies', establishmentId: '3' },
    { id: '4', name: 'Computer Science', establishmentId: '3' },
    { id: '5', name: 'Health and Social Care', establishmentId: '3' },
    { id: '6', name: 'Engineering', establishmentId: '3' },
  ].filter(course => course.establishmentId === establishmentId);
  
  return NextResponse.json(courses);
}
