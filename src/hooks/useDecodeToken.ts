'use client';

import Cookie from 'js-cookie';
import jwtDecode from 'jwt-decode';

interface Decoded {
  user?: {
    id: number;
    name: string;
    role: string;
  };
}

export function useDecodeToken(token: string): Decoded | null {
  const storedCookie = Cookie.get(token || '') || '';

  if (storedCookie && storedCookie.trim() !== '') {
    return jwtDecode(storedCookie) as Decoded;
  } else {
    return null;
  }
}
