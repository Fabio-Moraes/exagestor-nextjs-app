'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { ButtonFinish, Container } from './styles';

import { encryptObject } from 'functions';
import Cookie from 'js-cookie';
import api from 'lib/api';

interface Service {
  id: number;
  client_name: string;
  city: string;
  address: string;
  nomenclature: string;
  classification: string;
  status: string;
  update_count: number;
  created_at: string;
  protocol: string;
}

export function ControlButtons({ service }: { service: Service }) {
  const router = useRouter();

  /* eslint-disable */
  const [connectionError, setConnectionError] = useState(false);
  const [isPopupValue, setIsPopupValue] = useState<string | null>(null);
  /* eslint-enable */

  const storedCookie = Cookie.get('auth_token');
  const maxRetries = 4;

  async function fetchStatusServices() {
    setConnectionError(false);

    for (let count = 0; count < maxRetries; count++) {
      try {
        setIsPopupValue(count > 0 ? `Conectando<br>Tentativa (${count + 1})` : 'Conectando');

        const response = await api.get(
          `/api/tec/${service?.status === 'active' ? 'pause' : 'start'}`,
          {
            params: {
              token: storedCookie,
              protocol: service?.protocol
            }
          }
        );

        count = maxRetries;
        location.reload();
        console.log(response.data);
      } catch (error) {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        setConnectionError(true);
      }
    }
    setIsPopupValue(null);
  }

  async function fetchCancelServices() {
    setConnectionError(false);

    for (let count = 0; count < maxRetries; count++) {
      try {
        setIsPopupValue(count > 0 ? `Conectando<br>Tentativa (${count + 1})` : 'Conectando');

        const response = await api.get('/api/tec/cancel', {
          params: { token: storedCookie, protocol: service?.protocol }
        });

        count = maxRetries;
        location.reload();
        console.log(response.data);
      } catch (error) {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        setConnectionError(true);
      }
    }
    setIsPopupValue(null);
  }

  const encryptSlug = encryptObject({ protocol: service?.protocol });

  return (
    <Container>
      <ButtonFinish
        rel="preload"
        onClick={() =>
          router.push(`/dashboard/tec/running/finish/select-service/${encryptSlug}`)
        }
      >
        <span>Finalizar</span>
      </ButtonFinish>
      <button onClick={() => fetchStatusServices()}>
        {service?.status !== 'active' ? 'Retomar' : 'Pausar'}
      </button>
      <button onClick={() => fetchCancelServices()}>Cancerlar</button>
    </Container>
  );
}
