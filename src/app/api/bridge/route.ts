import { NextRequest, NextResponse } from 'next/server';

import { backendApi } from 'services/apiAxios';

import { JWT_SECRET_KEY } from '../../../constants';

import { jwtVerify } from 'jose';

type CustomError = {
  response?: {
    status: number;
  };
} & Error;

type RequestType = {
  baseURL: string;
  ['key']: string | number;
};

export async function POST(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  const { baseURL, ...res }: RequestType = await request.json();

  try {
    await jwtVerify(token ?? '', new TextEncoder().encode(JWT_SECRET_KEY));
    const { data } = await backendApi.post(baseURL, { token, ...res });
    return NextResponse.json(data, { status: 200 });
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
