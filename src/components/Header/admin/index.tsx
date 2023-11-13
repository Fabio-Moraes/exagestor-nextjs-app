'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import iconExa from './assets/svg/exa_logo.svg';
import iconUser from './assets/svg/user.svg';
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
  const decoderToken = useDecodeToken<{ name: string; role: string }>('auth_token');
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
          <strong>EXA TELECOM</strong>
          <span>Telecomunicações</span>
        </ProfileInfoCompany>
      </ProfileCompany>
      <ProfileUser>
        {decoderToken?.name && !isLoading ? (
          <span>{decoderToken?.name}</span>
        ) : (
          <ProfileUserNameSkeleton />
        )}
        <div>
          <Image
            src={iconUser}
            priority
            loading="eager"
            alt="Axa"
            style={{ width: '25px', height: 'auto' }}
          />
          <button
            onClick={() => {
              Cookie.remove('auth_token');
              router.refresh();
            }}
          >
            <span>Sair</span>
          </button>
        </div>
      </ProfileUser>
    </Container>
  );
}
