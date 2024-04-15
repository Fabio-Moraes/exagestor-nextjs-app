'use client';

import { useEffect, useState } from 'react';

import { LineSkaleton } from 'components/LineSkaleton';
import Image from 'components/Vercel/Image';
import { internalApi } from 'services/apiAxios';

import iconExa from './_assets/svg/exa_logo.svg';
import iconUser from './_assets/svg/user.svg';

import * as S from './styles';

export function Header() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({} as { name: string });

  const maxRetries = 4;

  async function fetchUser() {
    for (let count = 0; count < maxRetries; count++) {
      try {
        const response = await internalApi.post('/api/decode/auth_token');

        count = maxRetries;
        setUser(response.data);
      } catch (error) {
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    }
  }

  async function fetchDeletedeToken() {
    setIsLoading(true);
    for (let count = 0; count < maxRetries; count++) {
      try {
        await internalApi.post('/api/logout');
        window.location.reload();
        count = maxRetries;
      } catch (error) {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        if (count === maxRetries) setIsLoading(false);
      }
    }
  }

  useEffect(() => {
    fetchUser();

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <S.Container>
      <S.ProfileCompany>
        <Image
          src={iconExa}
          priority
          loading="eager"
          alt="Axa"
          style={{ width: '5.4rem', height: 'auto' }}
        />
        <S.ProfileInfoCompany>
          <h1>EXA TELECOM</h1>
          <span>Telecomunicações</span>
        </S.ProfileInfoCompany>
      </S.ProfileCompany>
      <S.ProfileUser>
        {user.name && !isLoading ? (
          <span>{user.name}</span>
        ) : (
          <LineSkaleton width="30rem" color="#b78e6a" />
        )}
        <div>
          <div>
            <Image
              src={iconUser}
              priority
              loading="eager"
              alt="Axa"
              style={{ width: '2.3rem', height: 'auto' }}
            />
            <span>ALMOX</span>
          </div>
          <button
            onClick={() => {
              fetchDeletedeToken();
            }}
          >
            <h2>Sair</h2>
          </button>
        </div>
      </S.ProfileUser>
    </S.Container>
  );
}
