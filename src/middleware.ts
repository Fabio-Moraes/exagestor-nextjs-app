import { NextRequest, NextResponse } from 'next/server';

import { jwtVerify } from 'jose';

export default async function middleware(request: NextRequest) {
  const TOKEN = request.cookies.get('auth_token')?.value;
  const JWT_SECRET_KEY = '202b5105-39a4-4fd9-9d9e-d17542d05994';

  try {
    await jwtVerify(TOKEN ?? '', new TextEncoder().encode(JWT_SECRET_KEY));

    if (['/', '/signin'].includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(
        new URL('/dashboard/employee/new', request.url)
      );
    }

    return NextResponse.next();
  } catch (error) {
    if (['/', '/signin'].includes(request.nextUrl.pathname)) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/signin', request.url));
  }
}

export const config = {
  matcher: ['/', '/signin', '/dashboard/employee/:path*']
};
