import { NextRequest, NextResponse } from 'next/server';

import CryptoJS from 'crypto-js';
import { jwtVerify } from 'jose';
import jwtDecode from 'jwt-decode';

type Decoded = {
  user?: {
    id: number;
    name: string;
    role: string;
    accountStatus: string;
  };
};

type CustomError = {
  response?: {
    status: number;
  };
} & Error;

export async function POST(request: NextRequest) {
  const auth = request.cookies.get('_session_auth')?.value;
  const ssid = request.cookies.get('_session_ssid')?.value;
  const salt = process.env.SECRET_SALT!;

  const authentication = CryptoJS.SHA256(ssid + salt).toString(CryptoJS.enc.Hex);
  const { user }: Decoded = auth ? await jwtDecode(auth) : {};

  try {
    await jwtVerify(auth ?? '', new TextEncoder().encode(authentication));
    return NextResponse.json({ ...user }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      const customError = error as CustomError;

      if (customError.response) {
        const statusCode = customError.response.status;

        if (statusCode === 403) {
          const response = NextResponse.json({ error: error.message }, { status: 403 });
          response.cookies.delete('_session_auth');
          response.cookies.delete('_session_ssid');
          return response;
        }

        return NextResponse.json({ error: error.message }, { status: statusCode });
      }

      return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
    }
  }
}
