'use client';

//import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { List } from './components/List';
import { FullScreenLoading } from 'components/FullScreenLoading';
import { LineSkaleton } from 'components/LineSkaleton';
import { decryptObject } from 'functions';
import apiRoute from 'services/apiRoute';

import { Container, ErrorContainer, Title } from './styles';

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
  const [ServiceData, setServiceData] = useState<ServiceData[]>([]);
  const [connectionError, setConnectionError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPopupValue, setIsPopupValue] = useState<string | null>(null);

  const maxRetries = 4;
  const decryptSlug = decryptObject(params.slug);

  //const router = useRouter();

  async function fetchServices() {
    setConnectionError(false);

    for (let count = 0; count < maxRetries; count++) {
      try {
        setIsPopupValue(count > 0 ? `Conectando<br>Tentativa (${count + 1})` : 'Conectando');

        const response = await apiRoute.post('/api/bridge', {
          baseURL: '/api/admin/select-service',
          protocol: decryptSlug.protocol?.toString(),
          employeeId: decryptSlug.employeeId?.toString()
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
        <h1>Selecionar Serviço</h1>
        {isLoading || !ServiceData[0]?.protocol ? (
          <LineSkaleton width="300px" />
        ) : (
          <span>PROTOCOLO: {ServiceData[0]?.protocol}</span>
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
        <List items={data} ServiceData={ServiceData[0]} />
      )}
    </Container>
  );
}
