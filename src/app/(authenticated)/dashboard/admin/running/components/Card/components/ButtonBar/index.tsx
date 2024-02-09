'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Image from 'components/Vercel/Image';
import { encryptObject } from 'functions';
import apiRoute from 'services/apiRoute';

import checkSvg from './assets/svg/check.svg';
import closeSvg from './assets/svg/close.svg';
import docSvg from './assets/svg/doc.svg';
import pauseSvg from './assets/svg/pause.svg';
import playSvg from './assets/svg/play.svg';
import refreshSvg from './assets/svg/refresh.svg';

import { Container, Wrapper } from './styles';

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

export function ButtonBar({ service }: { service: Service }) {
  const [runningLoad, setRunningLoad] = useState(false);

  const router = useRouter();
  const maxRetries = 5;

  async function fetchStatusServices() {
    setRunningLoad(true);
    for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
      try {
        await apiRoute.post('/api/bridge', {
          baseURL: `/api/admin/${service?.status === 'active' ? 'pause' : 'start'}`,
          employeeId: String(service?.employee_id),
          protocol: service?.protocol
        });

        break;
      } catch (error) {
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    }
  }

  async function fetchRefreshServices() {
    setRunningLoad(true);
    for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
      try {
        await apiRoute.post('/api/bridge', {
          baseURL: '/api/admin/start',
          employeeId: String(service?.employee_id),
          protocol: service?.protocol
        });

        break;
      } catch (error) {
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    }
  }

  async function fetchCancelServices() {
    setRunningLoad(true);
    for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
      try {
        await apiRoute.post('/api/bridge', {
          baseURL: '/api/admin/cancel',
          employeeId: String(service?.employee_id),
          protocol: service?.protocol
        });

        break;
      } catch (error) {
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    }
  }

  const encryptSlug = encryptObject({
    protocol: service?.protocol,
    employeeId: service?.employee_id,
    updateCount: String(Number(service?.update_count || 0) + 1)
  });

  const buttonState =
    service?.status === 'analysis' ? (
      <button
        style={{
          opacity: runningLoad ? 0.3 : 1
        }}
        rel="preload"
        onClick={() => fetchRefreshServices()}
      >
        <Image priority loading="eager" src={refreshSvg} alt="play" width="50" height="50" />
        <p>{'Reiniciar'}</p>
      </button>
    ) : (
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
    );

  return (
    <Container $animation={runningLoad} $color={'#8bc9a8'}>
      <Wrapper>
        <button
          style={{
            opacity: runningLoad || service?.status === 'paused' ? 0.3 : 1
          }}
          rel="preload"
          onClick={async () => {
            if (service?.status !== 'paused') {
              setRunningLoad(true);
              await new Promise((resolve) => setTimeout(resolve, 1000));
              router.push(`/dashboard/admin/running/finish/select-service/${encryptSlug}`);
            }
          }}
        >
          <Image priority loading="eager" src={checkSvg} alt="Add" width="50" height="50" />
          <p>Finalizar</p>
        </button>
        {buttonState}
        <button
          style={{
            opacity: 1
          }}
          rel="preload"
          onClick={() => {}}
        >
          <Image priority loading="eager" src={docSvg} alt="play" width="50" height="50" />
          <p>Pdf</p>
        </button>
        <button rel="preload" onClick={() => fetchCancelServices()}>
          <Image priority loading="eager" src={closeSvg} alt="close" width="50" height="50" />
          <p>Cancelar</p>
        </button>
      </Wrapper>
    </Container>
  );
}
