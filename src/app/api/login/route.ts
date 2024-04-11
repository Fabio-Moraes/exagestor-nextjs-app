import { NextRequest, NextResponse } from 'next/server';

import { backendApi } from 'services/apiAxios';

import { JWT_SECRET_KEY } from '../../../constants';

import jwt from 'jsonwebtoken';

interface RequestType {
  identification: string;
  password: string;
}

interface CustomError extends Error {
  response?: {
    status: number;
  };
}

export async function POST(request: NextRequest) {
  try {
    const nextRequest: RequestType = await request.json();
    const contentJwt = await backendApi.post('/api/auth/signin', nextRequest);
    const token = jwt.sign(contentJwt.data, JWT_SECRET_KEY, { expiresIn: '7d' });
    const appEnv = process.env.NEXT_PUBLIC_APP_ENV === 'production';
    const response = NextResponse.json({ success: true }, { status: 200 });

    response.cookies.set({
      name: 'auth_token',
      value: token,
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
      secure: appEnv,
      httpOnly: true,
      ...(appEnv && { sameSite: 'strict' })
    });

    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      const customError = error as CustomError;

      if (customError.response) {
        const statusCode = customError.response.status;
        return NextResponse.json({ error: error.message }, { status: statusCode });
      }

      return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
    }
  }
}
