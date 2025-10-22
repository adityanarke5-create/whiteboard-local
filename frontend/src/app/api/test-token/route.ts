import { NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth-service';

export async function GET() {
  try {
    // Get the current token
    const token = await AuthService.getCurrentToken();
    
    // Return the token information (don't return the full token for security)
    return NextResponse.json({
      hasToken: !!token,
      tokenLength: token ? token.length : 0,
      tokenPreview: token ? token.substring(0, 20) + '...' : null
    });
  } catch (error) {
    console.error('Error getting token:', error);
    return NextResponse.json({ error: 'Failed to get token' }, { status: 500 });
  }
}