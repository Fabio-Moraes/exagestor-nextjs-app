'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { LineSkaleton } from 'components/LineSkaleton';
import Image from 'components/Vercel/Image';
import { TimedWait } from 'functions/TimedWait';
import apiRoute from 'services/apiRoute';

import { useWebSocket } from 'contexts/webSocket';

import iconExa from './_assets/svg/exa_logo.svg';
import iconUser from './_assets/svg/user.svg';

import { Container, ProfileCompany, ProfileInfoCompany, ProfileUser } from './styles';

export function Header() {
  const [user, setUser] = useState({} as { name: string });

  const router = useRouter();
  const socket = useWebSocket();
  const maxRetries = 5;

  async function fetchUser() {
    for (let count = 0; count < maxRetries; count++) {
      try {
        const response = await apiRoute.post('/api/user');

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
        await apiRoute.post('/api/logout');
        if (socket) socket.disconnect();
        router.refresh();
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
    <Container>
      <ProfileCompany>
        <Image
          src={iconExa}
          priority
          loading="eager"
          alt="Axa"
          style={{ width: '5.4rem', height: 'auto' }}
        />
        <ProfileInfoCompany>
          <h1>EXA TELECOM</h1>
          <span>Telecomunicações</span>
        </ProfileInfoCompany>
      </ProfileCompany>
      <ProfileUser>
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
            <span>ADMIN</span>
          </div>
          <button
            onClick={() => {
              fetchDeletedeToken();
            }}
          >
            <h2>Sair</h2>
          </button>
        </div>
      </ProfileUser>
    </Container>
  );
}
