import { NextRequest, NextResponse } from 'next/server';
import { baseURL } from './constants/connectedOnServer';

const front = process.env.NODE_ENV === 'production'
  ? 'https://exatelecom.vercel.app'
  : 'http://192.168.10.100:3000';

export default async function middleware(request: NextRequest, response: NextResponse) {
  const token = request.cookies.get('auth_token')?.value;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // Set a timeout of 10 seconds

  try {
    const data = await fetch(`${baseURL}/verify-token`, {
      method: 'POST',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT'
      },
      body: JSON.stringify({ token }),
      signal: controller.signal, // Connect the AbortController signal to the fetch request
    });

    clearTimeout(timeoutId); // Clear the timeout since the request completed within the time limit

    const signinURL = new URL('/login', request.url);
    const dashboardURL = new URL('/dashboard/new-service', request.url);

    if (data?.status !== 200) {
      if (['/', '/login'].includes(request.nextUrl.pathname)) {
        return NextResponse.next();
      }
      return NextResponse.redirect(signinURL);
    }

    if (['/', '/login'].includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(dashboardURL);
    }
  } catch (error) {
    clearTimeout(timeoutId); 
    console.error('An error occurred while verifying the token.');
  }
}

export const config = {
  matcher: ['/', '/login', '/dashboard/:path*']
};
