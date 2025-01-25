import { NextResponse } from 'next/server';

export async function GET() {
  const establishments = [
    { id: '1', name: 'University A' },
    { id: '2', name: 'College B' },
    { id: '3', name: 'Bromley College' },
  ];
  
  // Simulate a delay to show loading state
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return NextResponse.json(establishments);
}
