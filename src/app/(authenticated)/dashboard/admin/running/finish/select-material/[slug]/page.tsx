'use client';

import { useEffect, useState } from 'react';

import { List } from './components/List';
import { FullScreenLoading } from 'components/FullScreenLoading';
import { LineSkaleton } from 'components/LineSkaleton';

import { Container, ErrorContainer, Title } from './styles';

import { decryptObject } from 'functions';
import Cookie from 'js-cookie';
import api from 'lib/api';

const data = [
  { id: '0', description: 'PARAFUSOS DE AÇO INOXIDÁVEL' },
  { id: '1', description: 'FIOS DE COBRE ESMALTADOS' },
  { id: '2', description: 'TUBOS DE PVC DE 3 POLEGADAS' },
  { id: '3', description: 'CONECTORES DE METAL GALVANIZADO' },
  { id: '4', description: 'FIBRAS DE VIDRO PARA ISOLAMENTO' },
  { id: '5', description: 'LÂMPADAS LED DE ALTA EFICIÊNCIA' },
  { id: '6', description: 'PLACAS DE CIRCUITOS ELETRÔNICOS' },
  { id: '7', description: 'TINTAS EPÓXI ANTICORROSIVAS' },
  { id: '8', description: 'ISOLADORES DE PORCELANA PARA ALTA TENSÃO' }
];

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
      try {
        setIsPopupValue(count > 0 ? `Conectando<br>Tentativa (${count + 1})` : 'Conectando');

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
        <h1>Selecionar Material</h1>
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
        <List items={data} serviceData={serviceData[0]} />
      )}
    </Container>
  );
}
