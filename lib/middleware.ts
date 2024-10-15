import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  try {
   
    const token = await getToken({ req });
    

    if (!token) {
      return NextResponse.redirect(new URL('/auth', req.url));
    }

    console.log('Valid token found, proceeding to requested page');
    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.redirect(new URL('/auth', req.url));
  }
}

export const config = { matcher: ["/predictions"] }