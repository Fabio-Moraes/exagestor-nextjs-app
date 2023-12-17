'use client';

import { useEffect, useState } from 'react';

import Cookie from 'js-cookie';
import jwtDecode from 'jwt-decode';

export function useDecodeToken<S>(token: string): S | null {
  const [decoded, setDecoded] = useState<S | null>(null);

  useEffect(() => {
    function handleTokenChange() {
      const storedCookie = Cookie.get(token) || '';

      try {
        if (storedCookie && storedCookie.trim() !== '') {
          setDecoded(jwtDecode(storedCookie) as S);
        } else {
          setDecoded(null);
        }
      } catch {
        setDecoded(null);
      }
    }

    handleTokenChange();
  }, []);

  return decoded;
}
