'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import exa from './assets/svg/exa_logo.svg';
import {
  Container,
  ProfileCompany,
  ProfileInfoCompany,
  ProfileUser,
  ProfileUserNameSkeleton
} from './styles';

import { useDecodeToken } from 'hooks/useDecodeToken';
import Cookie from 'js-cookie';

export function Header() {
  const decoderToken = useDecodeToken<{ name: string }>('auth_token');
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Defina o tempo de atraso em milissegundos (neste exemplo, 2 segundos)

    return () => {
      clearTimeout(timer); // Limpar o temporizador se o componente for desmontado antes do tempo limite
    };
  }, []);

  return (
    <Container>
      <ProfileCompany>
        <Image
          src={exa}
          priority
          loading="eager"
          alt="Axa"
          style={{ width: '74px', height: 'auto' }}
        />
        <ProfileInfoCompany>
          <strong>EXA TELECOM</strong>
          <span>Telecomunicações</span>
        </ProfileInfoCompany>
      </ProfileCompany>
      <ProfileUser>
        {/* <ProfileUserNameSkeleton /> */}
        {decoderToken?.name && !isLoading ? (
          <span>{decoderToken?.name}</span>
        ) : (
          <ProfileUserNameSkeleton />
        )}
        <button
          onClick={() => {
            Cookie.remove('auth_token');
            router.refresh();
          }}
        >
          <span>Sair</span>
        </button>
      </ProfileUser>
    </Container>
  );
}
