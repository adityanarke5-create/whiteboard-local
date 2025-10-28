import { NextResponse } from 'next/server';

// GET /api/boards - Get all boards for a user
export async function GET(request: Request) {
  try {
    // Extract the authorization header
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Authorization header missing' },
        { status: 401 }
      );
    }

    // Make request to backend API
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
    console.log('Backend URL being used:', backendUrl); // Debug log
    
    const backendRequestUrl = `${backendUrl}/api/boards`;
    console.log('Making request to:', backendRequestUrl); // Debug log
    
    const response = await fetch(backendRequestUrl, {
      method: 'GET',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
      },
    });
    
    console.log('Backend response status:', response.status); // Debug log
    console.log('Backend response headers:', Object.fromEntries(response.headers)); // Debug log

    const data = await response.json();
    console.log('Backend response data:', data); // Debug log
    
    if (!response.ok) {
      console.error('Backend API error:', data);
      return NextResponse.json(
        { error: data.error || 'Failed to fetch boards' },
        { status: response.status }
      );
    }

    // Ensure we're returning an array even if empty
    return NextResponse.json(Array.isArray(data) ? data : []);
  } catch (error) {
    console.error('Error fetching boards:', error);
    return NextResponse.json(
      { error: 'Failed to fetch boards' },
      { status: 500 }
    );
  }
}

// POST /api/boards - Create a new board
export async function POST(request: Request) {
  try {
    const { title } = await request.json();
    
    // Extract the authorization header
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Authorization header missing' },
        { status: 401 }
      );
    }

    // Make request to backend API
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
    console.log('Backend URL being used:', backendUrl); // Debug log
    
    const backendRequestUrl = `${backendUrl}/api/boards`;
    console.log('Making request to:', backendRequestUrl); // Debug log
    
    const response = await fetch(backendRequestUrl, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    });
    
    console.log('Backend response status:', response.status); // Debug log
    console.log('Backend response headers:', Object.fromEntries(response.headers)); // Debug log

    const data = await response.json();
    console.log('Backend response data:', data); // Debug log
    
    if (!response.ok) {
      return NextResponse.json(
        { error: data.error || 'Failed to create board' },
        { status: response.status }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error creating board:', error);
    return NextResponse.json(
      { error: 'Failed to create board' },
      { status: 500 }
    );
  }
}