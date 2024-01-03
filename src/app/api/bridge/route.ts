import { NextRequest, NextResponse } from 'next/server';

import api from 'services/apiBackend';

import { JWT_SECRET_KEY } from '../../../constants';

import { jwtVerify } from 'jose';

interface CustomError extends Error {
  response?: {
    status: number;
  };
}

interface RequestType {
  baseURL: string;
  ['key']: string | number;
}

export async function POST(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  const { baseURL, ...res }: RequestType = await request.json();

  try {
    await jwtVerify(token ?? '', new TextEncoder().encode(JWT_SECRET_KEY));

    const { data } = await api.post(baseURL, { token, ...res });

    return NextResponse.json(data, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      const customError = error as CustomError;

      if (customError.response) {
        const statusCode = customError.response.status;

        if (statusCode === 401) {
          return NextResponse.json({ error: error.message }, { status: 401 });
        }
      } else {
        return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
      }
    }
  }
}
