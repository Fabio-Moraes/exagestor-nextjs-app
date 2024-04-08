import { NextResponse } from 'next/server';

interface CustomError extends Error {
  response?: {
    status: number;
  };
}

export async function POST() {
  try {
    const response = NextResponse.json({ success: true }, { status: 200 });
    response.cookies.delete('auth_token');

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
