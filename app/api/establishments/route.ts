import { NextResponse } from 'next/server';

export async function GET() {
  const establishments = [
    { id: '1', name: 'University A' },
    { id: '2', name: 'College B' },
    { id: '3', name: 'Bromley College' },
  ];
  
  return NextResponse.json(establishments);
}
