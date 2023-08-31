import { NextRequest, NextResponse } from 'next/server';
import { baseURL } from './constants/connectedOnServer';

const front = process.env.NODE_ENV === 'production'
  ? 'https://exatelecom.vercel.app'
  : 'http://192.168.10.100:3000';

export default async function middleware(request: NextRequest, reponse: NextResponse) {
  setInterval(async () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
  
    const createdAt = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  
    const data = await fetch(front, {
      method: 'GET',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT'
      },
    });
  
    console.log('ping', createdAt);
    console.log(data.status);
  }, 15 * 60 * 1000); // 15 minutos;

  ///////////////////////////////////////////////////////////////////

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