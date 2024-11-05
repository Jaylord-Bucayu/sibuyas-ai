import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';


export async function middleware(req: NextRequest) {
  try {
    const token = await getToken({ req });
    const { pathname } = req.nextUrl;


    if (token && pathname === '/') {
        console.log('sdd')
        return NextResponse.next();
      }

      
    if (!token && pathname === '/predictions') {
      return NextResponse.redirect(new URL('/', req.url));
    }
    // If the user is logged in and tries to visit the login page, redirect to /predictions
   
    // If the user is not logged in and tries to access protected routes, redirect to login page
   

    return  NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.redirect(new URL('/', req.url));
  }
}


export const config = {
  matcher: ['/', '/predictions'],
};