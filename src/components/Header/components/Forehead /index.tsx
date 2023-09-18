'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

import Cookie from 'js-cookie';
import jwtDecode from "jwt-decode";
import exa from './assets/svg/exa_logo.svg';

import { Container, ProfileInfo } from './styles';

interface DecodedToken {
  [key: string]: string;
}

export function Forehead() {
  const [decoded, setDecoded] = useState<DecodedToken | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedCookie = Cookie.get('auth_token') || '';

    function handleTokenChange() {
      try {
        if (storedCookie && storedCookie.trim() !== "") {
          setDecoded(jwtDecode(storedCookie) as DecodedToken);
        } else {
          setDecoded(null);
        }
      } catch {
        setDecoded(null);
      }
    }

    handleTokenChange();
  }, []);

  return (
    <Container>
      <Image
        priority
        src={exa}
        alt="Axa"
        width={60}
        height={60}
      />
      <ProfileInfo>
        <strong>EXA TELECOM</strong>
        <span>Telecomunicações</span>
      </ProfileInfo>
      <div>
        <span>
          {decoded?.name || 'Carregando...'}
        </span>
        <button
          onClick={() => {
            Cookie.remove('auth_token');
            router.refresh();
          }}
        >
          <span>Sair</span>
        </button>
      </div>
    </Container>
  );
}
