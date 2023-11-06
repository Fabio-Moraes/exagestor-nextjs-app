'use client';

import { useEffect, useState } from 'react';

import { List } from './components/List';
import { FullScreenLoading } from 'components/FullScreenLoading';

import { decryptObject } from '../../../../../../../functions';
import { Container, ErrorContainer, Title } from './styles';

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

export default function FinishService({ params }: SlugType) {
  const [services, setServices] = useState<Service[]>([]);
  const [connectionError, setConnectionError] = useState(false);
  const [isPopupValue, setIsPopupValue] = useState<string | null>(null);

  const storedCookie = Cookie.get('auth_token');
  const maxRetries = 4;

  async function fetchServices() {
    setConnectionError(false);

    for (let count = 0; count < maxRetries; count++) {
      try {
        setIsPopupValue(
          count > 0 ? `Conectando<br>Tentativa (${count + 1})` : 'Conectando'
        );

        const response = await api.get('/api/services/select-material', {
          params: {
            token: storedCookie,
            protocol: decryptObject(params.slug).protocol
          }
        });

        count = maxRetries;
        setServices(response.data);
      } catch (error) {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        setConnectionError(true);
      }
    }
    setIsPopupValue(null);
  }

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <Container>
      <Title>
        <h1>Selecionar Material</h1>
        {services[0]?.protocol && (
          <span>PROTOCOLO: {services[0]?.protocol}</span>
        )}
      </Title>
      {isPopupValue && <FullScreenLoading message={'isPopupValue'} />}
      {connectionError ? (
        <ErrorContainer>
          <span>
            Não foi possível finalizar o serviço devido a instabilidade na
            conexão. Por favor, tente novamente.
          </span>
        </ErrorContainer>
      ) : (
        <List items={data} service={services[0]} />
      )}
    </Container>
  );
}
