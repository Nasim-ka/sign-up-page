

import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from './lib/jwtTokenControls'; 

export const config = {
  matcher: '/api/v1/:function*' 
};

export async function middleware(request: NextRequest) {
  const result = await isAuthenticated(request);

  if (!result) {
    return new NextResponse(
      JSON.stringify({ success: false, message: 'Invalid token. Paths starting with `/api/v1/`' }),
      { status: 401 }
    );
  }

 
  return NextResponse.next();
}
