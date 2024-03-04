'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { LineSkaleton } from 'components/LineSkaleton';
import Image from 'components/Vercel/Image';
import apiRoute from 'services/apiRoute';

import iconExa from './_assets/svg/exa_logo.svg';
import iconUser from './_assets/svg/user.svg';

import { Container, ProfileCompany, ProfileInfoCompany, ProfileUser } from './styles';

export function Header() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({} as { name: string });

  const router = useRouter();
  const maxRetries = 4;

  async function fetchUser() {
    for (let count = 0; count < maxRetries; count++) {
      try {
        const response = await apiRoute.post('/api/user');

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
        await apiRoute.post('/api/logout');
        router.refresh();
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
        {user.name && !isLoading ? <span>{user.name}</span> : <LineSkaleton width="30rem" />}
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
      </ProfileUser>
    </Container>
  );
}
