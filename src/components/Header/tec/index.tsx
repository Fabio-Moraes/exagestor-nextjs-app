'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { LineSkaleton } from 'components/LineSkaleton';
import Image from 'components/Vercel/Image';
import { useDecodeToken } from 'hooks/useDecodeToken';

import Cookie from 'js-cookie';

import iconExa from './assets/svg/exa_logo.svg';
import iconUser from './assets/svg/user.svg';

import { Container, ProfileCompany, ProfileInfoCompany, ProfileUser } from './styles';

interface Decoded {
  user: {
    id: number;
    name: string;
    role: string;
  };
}

export function Header() {
  const decoderToken = useDecodeToken<Decoded>('auth_token');
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Container>
      <ProfileCompany>
        <Image
          src={iconExa}
          priority
          loading="eager"
          alt="Axa"
          style={{ width: '54px', height: 'auto' }}
        />
        <ProfileInfoCompany>
          <h1>EXA TELECOM</h1>
          <span>Telecomunicações</span>
        </ProfileInfoCompany>
      </ProfileCompany>
      <ProfileUser>
        {decoderToken?.user.name && !isLoading ? (
          <span>{decoderToken?.user.name}</span>
        ) : (
          <LineSkaleton width="300px" />
        )}
        <div>
          <div>
            <Image
              src={iconUser}
              priority
              loading="eager"
              alt="Axa"
              style={{ width: '23px', height: 'auto' }}
            />
            <span>TEC</span>
          </div>
          <button
            onClick={() => {
              Cookie.remove('auth_token');
              router.refresh();
            }}
          >
            <h2>Sair</h2>
          </button>
        </div>
      </ProfileUser>
    </Container>
  );
}
