'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import iconExa from './assets/svg/exa_logo.svg';
import iconEmployee from './assets/svg/user_employee.svg';
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
          style={{ width: '74px', height: 'auto' }}
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
            src={iconEmployee}
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
