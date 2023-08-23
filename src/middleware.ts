import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(request: NextRequest, reponse: NextResponse) {
  const baseURL = 'https://exa-telecom-server.onrender.com';
  //const baseURL = 'http://192.168.0.5:3333';
  //////
  
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

  const signinURL = new URL('/', request.url);
  const dashboardURL = new URL('/dashboard/novo-servico', request.url);

  if (data.status !== 200) {
    if (request.nextUrl.pathname === '/') {
      return NextResponse.next();
    }

    return NextResponse.redirect(signinURL);
  }

  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(dashboardURL);
  }
}

export const config = {
  matcher: ['/', '/dashboard/:path*']
};