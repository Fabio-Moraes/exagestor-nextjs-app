import { NextRequest, NextResponse } from 'next/server';

import jwt from 'jsonwebtoken';
/* import cookie from 'cookie';*/
import api from 'lib/api';

const JWT_SECRET_KEY = '202b5105-39a4-4fd9-9d9e-d17542d05994';

interface RequestType {
  identification: string;
  password: string;
}

export async function POST(request: NextRequest) {
  try {
    const { identification, password }: RequestType = await request.json();

    await api.post('/api/auth/signin', {
      identification,
      password
    });

    const contentJwt = {
      user: {
        id: 2,
        name: 'Fabio Moraes',
        role: 'admin'
      }
    };

    const token = jwt.sign(contentJwt, JWT_SECRET_KEY, { expiresIn: '7d' });

    const data = {
      message: 'Login successful',
      success: true
    };

    const response = NextResponse.json({ data }, { status: 200 });

    response.cookies.set('auth_token', token, {
      path: '/',
      secure: true,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      sameSite: 'none'
    });

    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'Erro desconhecido' }, { status: 500 });
    }
  }
}

/* export async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  console.log('123123123wsdafsad');

  const { identification, password } = req.body;

  try {
    await api.post('/api/auth/signin', {
      identification,
      password
    });

    res.setHeader(
      'Set-Cookie',
      cookie.serialize('jwt', 'jwt-6753e487634r5tvcuhghsiu', {
        httpOnly: true,
        secure: false,
        maxAge: 60 * 60 * 24 * 365, // 1 year
        //sameSite: 'strict',
        path: '/'
      })
    );
  } catch (err) {
    console.error('Error updating password:', err);
    return res.status(500).json({
      error: 'An unexpected error occurred.'
    });
  }
} */
