import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Redirect authenticated users from login page to predictions
  if (token && pathname === '/') {
    return NextResponse.redirect(new URL('/predictions', req.url));
  }

  // Redirect unauthenticated users from protected pages to login
  if (!token && pathname === '/predictions') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Allow the request to continue
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/predictions'],
};