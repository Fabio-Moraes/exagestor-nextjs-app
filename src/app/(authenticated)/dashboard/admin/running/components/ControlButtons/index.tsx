'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Image from 'components/Vercel/Image';

import checkSvg from './assets/svg/check.svg';
import closeSvg from './assets/svg/close.svg';
import pauseSvg from './assets/svg/pause.svg';
import pinSvg from './assets/svg/pin.svg';
import playSvg from './assets/svg/play.svg';
import { Container } from './styles';

import { encryptObject } from 'functions';
//import { useContexState } from 'hooks/useGlobalContext';
import Cookie from 'js-cookie';
import api from 'lib/api';

interface Service {
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

export function ControlButtons({ service }: { service: Service }) {
  //const { setRunningService } = useContexState();
  const router = useRouter();

  /* eslint-disable */
  const [connectionError, setConnectionError] = useState(false);
  const [isPopupValue, setIsPopupValue] = useState<string | null>(null);
  /* eslint-enable */

  const storedCookie = Cookie.get('auth_token');
  const maxRetries = 4;

  /*   async function fetchRunningServices() {
    setConnectionError(false);

    for (let count = 0; count < maxRetries; count++) {
      try {
        setIsPopupValue(count > 0 ? `Conectando<br>Tentativa (${count + 1})` : 'Conectando');

        const response = await api.get('/api/admin/running', {
          params: { token: storedCookie }
        });

        count = maxRetries;

        setRunningService(response.data);
        //setServices(response.data);
        console.log('response', response.data);
      } catch (error) {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        setConnectionError(true);
      }
    }
    setIsPopupValue(null);
  } */

  async function fetchStatusServices() {
    setConnectionError(false);

    for (let count = 0; count < maxRetries; count++) {
      try {
        setIsPopupValue(count > 0 ? `Conectando<br>Tentativa (${count + 1})` : 'Conectando');

        const response = await api.get(
          `/api/admin/${service?.status === 'active' ? 'pause' : 'start'}`,
          {
            params: {
              token: storedCookie,
              employeeId: String(service?.employee_id),
              protocol: service?.protocol
            }
          }
        );

        count = maxRetries;

        //fetchRunningServices();
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

        const response = await api.get('/api/admin/cancel', {
          params: {
            token: storedCookie,
            employeeId: String(service?.employee_id),
            protocol: service?.protocol
          }
        });

        count = maxRetries;
        //fetchRunningServices();
        console.log(response.data);
      } catch (error) {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        setConnectionError(true);
      }
    }
    setIsPopupValue(null);
  }

  const encryptSlug = encryptObject({
    protocol: service?.protocol,
    employeeId: service?.employee_id
  });

  return (
    <Container>
      <button
        style={{
          opacity: service?.status === 'paused' ? 0.3 : 1
        }}
        rel="preload"
        onClick={() =>
          (service?.status === 'active' || service?.status !== 'paused') &&
          router.push(`/dashboard/admin/running/finish/select-material/${encryptSlug}`)
        }
      >
        <Image priority loading="eager" src={checkSvg} alt="Add" width="50" height="50" />
        <p>Finalizar</p>
      </button>
      <button rel="preload" onClick={() => fetchStatusServices()}>
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
      <button rel="preload" onClick={() => fetchCancelServices()}>
        <Image priority loading="eager" src={closeSvg} alt="close" width="50" height="50" />
        <p>Cancelar</p>
      </button>
    </Container>
  );
}
