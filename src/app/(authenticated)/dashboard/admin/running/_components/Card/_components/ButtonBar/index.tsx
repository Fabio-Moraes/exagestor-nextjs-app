'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Image from 'components/Vercel/Image';
import { encryptObject } from 'functions';
import { TimedWait } from 'functions/TimedWait';
import apiRoute from 'services/apiRoute';

//import { useWebSocket } from 'contexts/webSocket';

import checkSvg from './_assets/svg/check.svg';
import closeSvg from './_assets/svg/close.svg';
import docSvg from './_assets/svg/doc.svg';
import pauseSvg from './_assets/svg/pause.svg';
import playSvg from './_assets/svg/play.svg';
import refreshSvg from './_assets/svg/refresh.svg';

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

  //const [connectedWebSocket, setConnectedWebSocket] = useState<boolean>(false);

  //const socket = useWebSocket();

  /*   useEffect(() => {
      if (socket) {
        const handleConnectedWebSocket = () => {
          setConnectedWebSocket(socket.connected);
        };
  
        setConnectedWebSocket(socket.connected);
  
        socket.on('connect', handleConnectedWebSocket);
        socket.on('disconnect', handleConnectedWebSocket);
  
        return () => {
          socket.off(`connect`);
          socket.off(`disconnect`);
        };
      } else {
        setConnectedWebSocket(false);
      }
    }, [socket]); */

  async function fetchStatusServices() {
    setRunningLoad(true);
    for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
      try {
        await apiRoute.post('/api/bridge', {
          baseURL: `/api/admin/running/${service?.status === 'active' ? 'pause' : 'start'}`,
          employeeId: String(service?.employee_id),
          protocol: service?.protocol
        });

        setRunningLoad(false);
        break;
      } catch (error: unknown) {
        if (error instanceof Error) {
          const customError = error as CustomError;
          if (customError.response) {
            const statusCode = customError.response.status;
            if (statusCode === 409) {
              break;
            } else {
              await TimedWait(3000);
            }
          }
        }
      }
    }
  }

  async function fetchRefreshServices() {
    setRunningLoad(true);
    for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
      try {
        await apiRoute.post('/api/bridge', {
          baseURL: '/api/admin/running/start',
          employeeId: String(service?.employee_id),
          protocol: service?.protocol
        });

        setRunningLoad(false);
        break;
      } catch (error: unknown) {
        if (error instanceof Error) {
          const customError = error as CustomError;
          if (customError.response) {
            const statusCode = customError.response.status;
            if (statusCode === 409) {
              break;
            } else {
              await TimedWait(3000);
            }
          }
        }
      }
    }
  }

  async function fetchCancelServices() {
    setRunningLoad(true);
    for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
      try {
        await apiRoute.post('/api/bridge', {
          baseURL: '/api/admin/running/cancel',
          employeeId: String(service?.employee_id),
          protocol: service?.protocol
        });
        setRunningLoad(false);
        break;
      } catch (error: unknown) {
        if (error instanceof Error) {
          const customError = error as CustomError;
          if (customError.response) {
            const statusCode = customError.response.status;
            if (statusCode === 409) {
              break;
            } else {
              await TimedWait(3000);
            }
          }
        }
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
        {/* <p>{'Reiniciar'}</p> */}
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
        {/* <p>{service?.status !== 'active' ? 'Retomar' : 'Pausar'}</p> */}
      </button>
    );

  return (
    <Container $animation={runningLoad} $color={'#3f7971'}>
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
          {/* <p>Finalizar</p> */}
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
          {/* <p>Pdf</p> */}
        </button>
        <button rel="preload" onClick={() => fetchCancelServices()}>
          <Image priority loading="eager" src={closeSvg} alt="close" width="50" height="50" />
          {/* <p>Cancelar</p> */}
        </button>
      </Wrapper>
    </Container>
  );
}
