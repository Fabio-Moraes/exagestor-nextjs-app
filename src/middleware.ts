import { NextRequest, NextResponse } from 'next/server';

import { jwtVerify } from 'jose';
import jwtDecode from 'jwt-decode';

type Decoded = {
  user?: {
    id: number;
    name: string;
    role: 'tec' | 'almox' | 'cop' | 'admin' | 'superadmin' | 'config';
  };
};

const redirectRole = {
  tec: '/dashboard/tec/running',
  almox: '/dashboard/almox/stock',
  cop: '/dashboard/cop/running',
  admin: '/dashboard/admin/running',
  superadmin: '/dashboard/superadmin/monitor',
  config: '/dashboard/config/theme'
};

const JWT_SECRET_KEY = '202b5105-39a4-4fd9-9d9e-d17542d05999';
const isPublicEndpoint = (pathname: string) => ['/', '/signin'].includes(pathname);

export default async function middleware(request: NextRequest) {
  const cookie = request.cookies.get('auth_token');
  const token = cookie?.value;
  const decoded: Decoded = token ? await jwtDecode(token) : {};
  const account = token && (await fetchAccountStatus(token));

  try {
    await jwtVerify(token ?? '', new TextEncoder().encode(JWT_SECRET_KEY));

    if (account?.status === 'inactive') {
      const response = NextResponse.redirect(new URL('/signin', request.url));
      response.cookies.delete('auth_token');
      return response;
    }

    if (decoded.user && !request.nextUrl.pathname.includes(decoded.user.role)) {
      return NextResponse.redirect(new URL(redirectRole[decoded.user.role], request.url));
    }

    if (decoded.user && isPublicEndpoint(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL(redirectRole[decoded.user.role], request.url));
    }

    return NextResponse.next();
  } catch (error) {
    if (isPublicEndpoint(request.nextUrl.pathname)) return NextResponse.next();
    return NextResponse.redirect(new URL('/signin', request.url));
  }
}

async function fetchAccountStatus(token: string) {
  const baseURL = process.env.NEXT_PUBLIC_BACKEND_ORIGIN_BASEURL;
  const res = await fetch(`${baseURL}/api/auth/data_user`, {
    method: 'POST',
    body: JSON.stringify({ token }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return await res.json();
}

export const config = {
  matcher: ['/', '/signin', '/dashboard/:path*']
};
