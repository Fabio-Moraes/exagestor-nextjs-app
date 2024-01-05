'use client';

import { useRouter } from 'next/navigation';

import { useContexState as useContexState2 } from '../../../../../hooks/useGlobalContext';
import Image from 'components/Vercel/Image';
import { encryptObject } from 'functions';
import apiRoute from 'services/apiRoute';

import checkSvg from './assets/svg/check.svg';
import closeSvg from './assets/svg/close.svg';
import pauseSvg from './assets/svg/pause.svg';
import pinSvg from './assets/svg/pin.svg';
import playSvg from './assets/svg/play.svg';

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

export function ControlButtons({ service }: { service: Service }) {
  const router = useRouter();
  const maxRetries = 4;

  const { runningLoad, setRunningLoad } = useContexState2();

  async function fetchStatusServices() {
    setRunningLoad(true);
    for (let count = 0; count < maxRetries; count++) {
      try {
        const response = await apiRoute.post('/api/bridge', {
          baseURL: `/api/admin/${service?.status === 'active' ? 'pause' : 'start'}`,
          employeeId: String(service?.employee_id),
          protocol: service?.protocol
        });

        count = maxRetries;
        console.log(response.data);
      } catch (error) {
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    }
  }

  async function fetchCancelServices() {
    setRunningLoad(true);
    for (let count = 0; count < maxRetries; count++) {
      try {
        const response = await apiRoute.post('/api/bridge', {
          baseURL: '/api/admin/cancel',
          employeeId: String(service?.employee_id),
          protocol: service?.protocol
        });

        count = maxRetries;
        console.log(response.data);
      } catch (error) {
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    }
  }

  const encryptSlug = encryptObject({
    protocol: service?.protocol,
    employeeId: service?.employee_id
  });

  return (
    <Container $animation={runningLoad}>
      <Wrapper>
        <button
          style={{
            opacity: runningLoad ? 1 : service?.status === 'paused' ? 0.3 : 1
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
            opacity: runningLoad ? 1 : 0.3
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
      </Wrapper>
    </Container>
  );
}
