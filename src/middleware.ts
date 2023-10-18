import { NextRequest, NextResponse } from 'next/server';
import { baseURL } from './constants/connectedOnServer';

const MAX_RETRIES = 3;
const RETRY_INTERVAL = 3000;

export default async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  let retries = 0;

  while (retries < MAX_RETRIES) {
    try {
      const data = await fetch(`${baseURL}/api/auth/verify-token`, {
        method: 'POST',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT'
        },
        body: JSON.stringify({ token }),
        cache: 'no-store'
      });

      if (data.status === 200) {
        // Token válido, continuar com a lógica do seu aplicativo
        if (['/', '/signin'].includes(request.nextUrl.pathname)) {
          return NextResponse.redirect(new URL('/dashboard/new-service', request.url));
        }
      } else {
        // Token inválido, redirecionar para a página de login
        if (['/', '/signin'].includes(request.nextUrl.pathname)) {
          return NextResponse.next();
        }
        return NextResponse.redirect(new URL('/signin', request.url));
      }
    } catch (error) {
      // Erro na requisição, aguardar um tempo e tentar novamente
      console.error('An error occurred while verifying the token. Retrying...');
      await sleep(RETRY_INTERVAL);
      retries++;
    }
  }

  // Após atingir o número máximo de tentativas, redirecionar para a página de login
  console.error('Failed to verify the token after multiple attempts.');
  return NextResponse.redirect(new URL('/signin', request.url));
};

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const config = {
  matcher: ['/', '/signin', '/dashboard/:path*']
};
