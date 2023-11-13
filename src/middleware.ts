import { NextRequest, NextResponse } from 'next/server';

import { jwtVerify } from 'jose';
import jwtDecode from 'jwt-decode';

type Decode = { role?: string };

export default async function middleware(request: NextRequest) {
  const TOKEN = request.cookies.get('auth_token')?.value;
  const JWT_SECRET_KEY = '202b5105-39a4-4fd9-9d9e-d17542d05994';

  const { role }: Decode = TOKEN ? await jwtDecode(TOKEN) : {};

  try {
    await jwtVerify(TOKEN ?? '', new TextEncoder().encode(JWT_SECRET_KEY));

    if (role === 'admin' && request.nextUrl.pathname.includes('employee')) {
      return NextResponse.redirect(new URL('/dashboard/admin', request.url));
    }

    if (role === 'employee' && request.nextUrl.pathname.includes('admin')) {
      return NextResponse.redirect(new URL('/dashboard/employee/new', request.url));
    }

    if (['/', '/signin'].includes(request.nextUrl.pathname)) {
      if (role === 'admin') {
        return NextResponse.redirect(new URL('/dashboard/admin', request.url));
      }

      if (role === 'employee') {
        return NextResponse.redirect(new URL('/dashboard/employee/new', request.url));
      }
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
  matcher: ['/', '/signin', '/dashboard/:path*']
};
