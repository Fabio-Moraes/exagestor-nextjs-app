import { NextRequest, NextResponse } from 'next/server';
import { baseURL } from './constants/connectedOnServer';

export default async function middleware(request: NextRequest, reponse: NextResponse) {
  const token = request.cookies.get('auth_token')?.value;
  const data = await fetch(`${baseURL}/verify-token`, {
    method: 'POST',
    credentials: "include",
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT'
    },
    body: JSON.stringify({ token }),
  });

  const signinURL = new URL('/login', request.url);
  const dashboardURL = new URL('/dashboard/new-service', request.url);

  if (data.status !== 200) {
    if (['/', '/login'].includes(request.nextUrl.pathname)) {
      return NextResponse.next();
    }
    return NextResponse.redirect(signinURL);
  }

  if (['/', '/login'].includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(dashboardURL);
  }
}

export const config = {
  matcher: ['/', '/login', '/dashboard/:path*']
};