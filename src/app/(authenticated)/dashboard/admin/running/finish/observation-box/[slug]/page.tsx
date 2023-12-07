'use client';

import { useEffect, useState } from 'react';

import { TextBox } from './components/TextBox';
import { FullScreenLoading } from 'components/FullScreenLoading';
import { LineSkaleton } from 'components/LineSkaleton';

import { Container, ErrorContainer, Title } from './styles';

import { decryptObject } from 'functions';
import Cookie from 'js-cookie';
import api from 'lib/api';

interface SlugType {
  params: {
    slug: string;
  };
}

interface ServiceData {
  id: number;
  employee_id: number;
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

export default function FinishService({ params }: SlugType) {
  const [serviceData, setServiceData] = useState<ServiceData[]>([]);
  const [connectionError, setConnectionError] = useState(false);
  const [isPopupValue, setIsPopupValue] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const storedCookie = Cookie.get('auth_token');
  const maxRetries = 4;
  const decryptSlug = decryptObject(params.slug);

  async function fetchServices() {
    setConnectionError(false);

    for (let count = 0; count < maxRetries; count++) {
      setIsPopupValue(count > 0 ? `Conectando<br>Tentativa (${count + 1})` : 'Conectando');
      try {
        const response = await api.get('/api/admin/select-material', {
          params: {
            token: storedCookie,
            protocol: decryptSlug.protocol,
            employeeId: decryptSlug.employeeId
          }
        });

        count = maxRetries;
        setServiceData(response.data);
      } catch (error) {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        setConnectionError(true);
      }
    }
    setIsPopupValue(null);
  }

  useEffect(() => {
    fetchServices();
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Container>
      <Title>
        <h1>Campo de Observação</h1>
        {isLoading || !serviceData[0]?.protocol ? (
          <LineSkaleton width="300px" />
        ) : (
          <span>PROTOCOLO: {serviceData[0]?.protocol}</span>
        )}
      </Title>
      {isPopupValue && <FullScreenLoading message={isPopupValue} />}
      {connectionError ? (
        <ErrorContainer>
          <span>
            Não foi possível carregar os dados da página devido a instabilidade na conexão. Por
            favor, tente novamente.
          </span>
        </ErrorContainer>
      ) : (
        <TextBox serviceData={serviceData[0]} />
      )}
    </Container>
  );
}
