'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { ButtonFinish, Container } from './styles';

import { encryptObject } from 'functions';
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

        const response = await api.get('/api/admin/cancel', {
          params: {
            token: storedCookie,
            employeeId: String(service?.employee_id),
            protocol: service?.protocol
          }
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

  const encryptSlug = encryptObject({
    protocol: service?.protocol,
    employeeId: service?.employee_id
  });

  return (
    <Container>
      <ButtonFinish
        rel="preload"
        onClick={() =>
          router.push(`/dashboard/admin/running/finish/select-service/${encryptSlug}`)
        }
      >
        <span>Finalizar</span>
      </ButtonFinish>
      <button rel="preload" onClick={() => fetchStatusServices()}>
        {service?.status !== 'active' ? 'Retomar' : 'Pausar'}
      </button>
      <button rel="preload" onClick={() => fetchCancelServices()}>
        Cancerlar
      </button>
    </Container>
  );
}
