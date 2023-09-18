import { NextRequest, NextResponse } from 'next/server';
import { baseURL } from './constants/connectedOnServer';

export default async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  const controller = new AbortController();

  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const data = await fetch(`${baseURL}/verify-token`, {
      method: 'POST',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT'
      },
      body: JSON.stringify({ token }),
      signal: controller.signal,
      cache: 'no-store'
    });

    clearTimeout(timeoutId);

    if (data?.status !== 200) {
      if (['/', '/login'].includes(request.nextUrl.pathname)) {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL('/login', request.url));
    }

    if (['/', '/login'].includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL('/dashboard/new-service', request.url));
    }
  } catch (error) {
    clearTimeout(timeoutId);
    console.error('An error occurred while verifying the token.');
    return NextResponse.redirect(new URL('/login', request.url));
  }
};

export const config = {
  matcher: ['/', '/login', '/dashboard/:path*']
};
