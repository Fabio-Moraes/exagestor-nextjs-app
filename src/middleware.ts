import { type NextRequest, NextResponse } from 'next/server';

import CryptoJS from 'crypto-js';
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

const isPublicEndpoint = (pathname: string) => ['/', '/signin'].includes(pathname);

export default async function middleware(request: NextRequest) {
  const auth = request.cookies.get('_session_auth')?.value;
  const ssid = request.cookies.get('_session_ssid')?.value;
  const salt = process.env.SECRET_SALT!;

  const authentication = CryptoJS.SHA256(ssid + salt).toString(CryptoJS.enc.Hex);
  const account = auth && (await fetchAccountStatus(auth));
  const decoded: Decoded = auth ? await jwtDecode(auth) : {};

  try {
    await jwtVerify(auth ?? '', new TextEncoder().encode(authentication));

    if (account?.status === 'inactive') {
      const response = NextResponse.redirect(new URL('/signin', request.url));
      response.cookies.delete('_session_auth');
      response.cookies.delete('_session_ssid');
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
