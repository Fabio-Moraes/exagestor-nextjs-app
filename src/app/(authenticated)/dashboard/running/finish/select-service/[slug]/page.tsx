'use client';

import { useEffect, useState } from 'react';

import { List } from './components/List';
import { FullScreenLoading } from 'components/FullScreenLoading';

import { decryptObject } from '../../../../../../../functions';
import { Container, ErrorContainer, Title } from './styles';

import Cookie from 'js-cookie';
import api from 'lib/api';

const data = [
  { id: '0', description: 'ADQ DE POSTES (EQPTOS MEC NO POSTE)' },
  { id: '1', description: 'READQ DE POSTES (EQPTOS MEC NO POSTE)' },
  { id: '2', description: 'LANÇ DE CORD' },
  { id: '3', description: 'RETENC CORD/ CBS' },
  { id: '4', description: 'RET CORD DO POSTE' },
  { id: '5', description: 'MANUT PODA DE GALHOS COM REMOCAO-F' },
  { id: '6', description: 'MANUT CAPINA LIMPZ SOBRE TAMP DE C' },
  { id: '7', description: 'MANUT CAPINA DE POSTE RAIO = 2,0M-' },
  { id: '8', description: 'MANUT CAPINA DE MARCO DIÂMTR DE 2.0M' }
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

  /* eslint-disable */
    const [isPopupValue, setIsPopupValue] = useState<string | null>(null);
    /* eslint-enable */

  const storedCookie = Cookie.get('auth_token');

  async function fetchServices() {
    setConnectionError(false);

    const maxRetries = 4;
    const decryptSlug = decryptObject(params.slug);

    for (let count = 0; count < maxRetries; count++) {
      try {
        setIsPopupValue(
          count > 0 ? `Conectando<br>Tentativa (${count + 1})` : 'Conectando'
        );

        const response = await api.get('/api/services/select-service', {
          params: {
            token: storedCookie,
            protocol: decryptSlug.protocol
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
        <h1>Selecionar Serviço</h1>
        <span>PROTOCOLO: {services[0]?.protocol}</span>
      </Title>
      {false && <FullScreenLoading message={'isPopupValue'} />}
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
