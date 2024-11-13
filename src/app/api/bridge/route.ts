import { type NextRequest, NextResponse } from 'next/server';

import { backendApi } from 'services/apiAxios';

import CryptoJS from 'crypto-js';
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
  const auth = request.cookies.get('_session_auth')?.value;
  const ssid = request.cookies.get('_session_ssid')?.value;
  const salt = process.env.SECRET_SALT!;

  const authentication = CryptoJS.SHA256(ssid + salt).toString(CryptoJS.enc.Hex);
  const { baseURL, ...res }: RequestType = await request.json();

  try {
    await jwtVerify(auth ?? '', new TextEncoder().encode(authentication));
    const { data } = await backendApi.post(baseURL, { token: auth, ...res });
    return NextResponse.json(data, { status: 200 });
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
