'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Image from 'components/Vercel/Image';
import { encryptObject } from 'functions';

import Cookie from 'js-cookie';
import api from 'lib/api';

import checkSvg from './assets/svg/check.svg';
import closeSvg from './assets/svg/close.svg';
import pauseSvg from './assets/svg/pause.svg';
import pinSvg from './assets/svg/pin.svg';
import playSvg from './assets/svg/play.svg';

import { Container } from './styles';

interface RunningService {
  id: number;
  employee_id: number;
  client_name: string;
  city: string;
  address: string;
  nomenclature: string;
  classification: string;
  update_count: number;
  status: string;
  created_at: string;
  protocol: string;
  name_admin: string;
  name_tec: string;
}

export function ControlButtons({ service }: { service: RunningService }) {
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
      <button
        style={{
          opacity: service?.status === 'paused' || service?.status === 'analysis' ? 0.3 : 1
        }}
        rel="preload"
        onClick={() =>
          service?.status !== 'analysis' &&
          service?.status !== 'paused' &&
          router.push(`/dashboard/tec/running/finish/select-service/${encryptSlug}`)
        }
      >
        <Image priority loading="eager" src={checkSvg} alt="Add" width="50" height="50" />
        <p>Finalizar</p>
      </button>
      <button
        rel="preload"
        style={{
          opacity: service?.status === 'analysis' ? 0.3 : 1
        }}
        onClick={() => service?.status !== 'analysis' && fetchStatusServices()}
      >
        <Image
          priority
          loading="eager"
          src={service?.status !== 'active' ? playSvg : pauseSvg}
          alt="play"
          width="50"
          height="50"
        />
        <p>{service?.status !== 'active' ? 'Retomar' : 'Pausar'}</p>
      </button>
      <button
        rel="preload"
        style={{
          opacity: 0.3
        }}
        onClick={() => {}}
      >
        <Image priority loading="eager" src={pinSvg} alt="close" width="50" height="50" />
        <p>Fixar</p>
      </button>
      <button
        rel="preload"
        style={{
          opacity: service?.status === 'analysis' ? 0.3 : 1
        }}
        onClick={() => service?.status !== 'analysis' && fetchCancelServices()}
      >
        <Image priority loading="eager" src={closeSvg} alt="close" width="50" height="50" />
        <p>Cancelar</p>
      </button>
    </Container>
  );
}
