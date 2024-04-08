import { NextRequest, NextResponse } from 'next/server';

import { JWT_SECRET_KEY } from '../../../../constants';

import { jwtVerify } from 'jose';
import jwtDecode from 'jwt-decode';

interface Decoded {
  user?: {
    id: number;
    name: string;
    role: string;
    accountStatus: string;
  };
}

interface CustomError extends Error {
  response?: {
    status: number;
  };
}

export async function POST(request: NextRequest) {
  const TOKEN = request.cookies.get('auth_token')?.value;

  const { user }: Decoded = TOKEN ? await jwtDecode(TOKEN) : {};
  try {
    await jwtVerify(TOKEN ?? '', new TextEncoder().encode(JWT_SECRET_KEY));

    return NextResponse.json({ ...user }, { status: 200 });
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
