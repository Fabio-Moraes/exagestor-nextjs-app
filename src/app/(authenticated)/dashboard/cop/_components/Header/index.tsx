'use client';

import { useEffect, useState } from 'react';

import { LineSkaleton } from 'components/LineSkaleton';
import Image from 'components/Vercel/Image';
import { TimedWait } from 'functions/TimedWait';
import { internalApi } from 'services/apiAxios';

import { useWebSocket } from 'contexts/webSocket';

import iconExa from './_assets/svg/exa_logo.svg';
import iconUser from './_assets/svg/user.svg';

import * as S from './styles';

export function Header() {
  const [user, setUser] = useState({} as { name: string });

  const socket = useWebSocket();
  const maxRetries = 5;

  async function fetchUser() {
    for (let count = 0; count < maxRetries; count++) {
      try {
        const response = await internalApi.post('/api/decode/auth_token');

        count = maxRetries;
        setUser(response.data);
        break;
      } catch (error) {
        await TimedWait(5000);
      }
    }
  }

  async function fetchDeletedeToken() {
    for (let count = 0; count < maxRetries; count++) {
      try {
        await internalApi.post('/api/logout');
        if (socket) socket.disconnect();
        window.location.reload();
        break;
      } catch (error) {
        await TimedWait(5000);
      }
    }
  }

  useEffect(() => {
    const initialize = async () => {
      await fetchUser();
    };

    initialize();
  }, []);

  return (
    <S.Container>
      <S.ProfileCompany>
        <Image
          src={iconExa}
          priority
          loading="eager"
          alt="Axa"
          style={{ width: '5.8rem', height: 'auto' }}
        />
        <S.ProfileInfoCompany>
          <h1>EXATELECOM</h1>
          <span>Telecomunicações</span>
        </S.ProfileInfoCompany>
      </S.ProfileCompany>
      <S.ProfileUser>
        {user.name ? <span>{user.name}</span> : <LineSkaleton width="30rem" color="#b78e6a" />}
        <div>
          <div>
            <Image
              src={iconUser}
              priority
              loading="eager"
              alt="Axa"
              style={{ width: '2.3rem', height: 'auto' }}
            />
            <span>COP</span>
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
