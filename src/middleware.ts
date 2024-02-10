import { NextRequest, NextResponse } from 'next/server';

import { jwtVerify } from 'jose';
import jwtDecode from 'jwt-decode';

interface Decoded {
  user?: {
    id: number;
    name: string;
    role: 'admin' | 'tec' | 'almox';
  };
}

export default async function middleware(request: NextRequest) {
  const TOKEN = request.cookies.get('auth_token')?.value;
  const JWT_SECRET_KEY = '202b5105-39a4-4fd9-9d9e-d17542d05994';

  const { user }: Decoded = TOKEN ? await jwtDecode(TOKEN) : {};

  const redirect = {
    admin: '/dashboard/admin/running',
    tec: '/dashboard/tec/new',
    almox: '/dashboard/almox/stock'
  };

  try {
    await jwtVerify(TOKEN ?? '', new TextEncoder().encode(JWT_SECRET_KEY));

    if (user && !request.nextUrl.pathname.includes(user.role)) {
      return NextResponse.redirect(new URL(redirect[user.role], request.url));
    }

    if (user && ['/', '/signin'].includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL(redirect[user.role], request.url));
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
