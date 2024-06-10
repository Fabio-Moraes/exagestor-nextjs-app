'use client';

import { useEffect, useState } from 'react';

import { LineSkaleton } from 'components/LineSkaleton';
import Image from 'components/Vercel/Image';
import { TimedWait } from 'functions/TimedWait';
import { internalApi } from 'services/apiAxios';

import { useWebSocket } from 'contexts/webSocket';

import iconUser from './_assets/svg/user.svg';
import iconExa from 'app/_assets/svg/brand_logo.svg';

import * as S from './styles';

export function Header() {
  const [user, setUser] = useState({} as { name: string });

  const socket = useWebSocket();
  const maxRetries = 4;

  async function fetchUser() {
    for (let count = 0; count < maxRetries; count++) {
      try {
        const response = await internalApi.post('/api/decode/auth_token');
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
          style={{ width: '5.4rem', height: 'auto' }}
        />
        <S.ProfileInfoCompany>
          <h1>WMAX</h1>
          <span>Soluções em Telecom</span>
        </S.ProfileInfoCompany>
      </S.ProfileCompany>
      <S.ProfileUser>
        {user.name ? <span>{user.name}</span> : <LineSkaleton width="30rem" />}
        <div>
          <div>
            <Image
              src={iconUser}
              priority
              loading="eager"
              alt="Axa"
              style={{ width: '2.3rem', height: 'auto' }}
            />
            <span>TEC</span>
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
