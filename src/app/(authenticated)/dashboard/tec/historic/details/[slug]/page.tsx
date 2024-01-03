'use client';

import { useRouter } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';

import { FullScreenLoading } from 'components/FullScreenLoading';
import { LineSkaleton } from 'components/LineSkaleton';
import { decryptObject } from 'functions';
import apiRoute from 'services/apiRoute';

import { ErrorContainer } from './styles';
import { Button, Container, Wrapper, Observation, Title, Info } from './styles';

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
  modification_at: string;
  finished_at: string;
  observation: string;
  protocol: string;
}

interface SlugType {
  params: {
    slug: string;
  };
}

export default function Details({ params }: SlugType) {
  const [services, setServices] = useState<Service | null>(null);
  const [connectionError, setConnectionError] = useState(false);
  const [isPopupValue, setIsPopupValue] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { protocol, update_count } = decryptObject(params.slug);

  const router = useRouter();

  const maxRetries = 4;

  async function fetchServices() {
    setConnectionError(false);

    for (let count = 0; count < maxRetries; count++) {
      try {
        setIsPopupValue(count > 0 ? `Conectando<br>Tentativa (${count + 1})` : 'Conectando');

        const response = await apiRoute.post('/api/bridge', {
          baseURL: '/api/tec/historic/details',
          protocol,
          update_count
        });

        count = maxRetries;
        setServices(response.data[0]);
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

  function formatDate(date: string) {
    const now = new Date(date);
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }

  const status = {
    concluded: '✅ Finalizado',
    active: '🚧 Em andamento',
    paused: '⏸️ Pausado',
    canceled: '❌ Cancelado'
  } as { [key: string]: string };

  const renderTextWithLineBreaks = (text: string) => {
    const lines = text.split('\n');

    return lines.map((line: string, index: number) => {
      return (
        <Fragment key={String(index)}>
          {line ? <p key={String(index)}>{line}</p> : <div key={`extra-div-${index}`} />}
        </Fragment>
      );
    });
  };

  const modificationFilter = () => {
    if (
      services?.modification_at &&
      services?.update_count > 0 &&
      services?.status !== 'concluded'
    ) {
      if (services?.status === 'paused') {
        return <p>Pausado em: {formatDate(services?.modification_at)}</p>;
      }

      if (services?.status === 'active') {
        return <p>Retomado em: {formatDate(services?.modification_at)}</p>;
      }
    }
  };

  return (
    <Container>
      <Title>Detalhes</Title>
      {isPopupValue && <FullScreenLoading message={isPopupValue} />}
      {connectionError ? (
        <ErrorContainer>
          <span>
            Não foi possível consultar o histórico devido a instabilidade na conexão. Por
            favor, tente novamente.
          </span>
        </ErrorContainer>
      ) : (
        <Wrapper>
          <Info>
            {isLoading || !services ? (
              <>
                <LineSkaleton width="180px" />
                <LineSkaleton width="120px" />
                <LineSkaleton width="100px" />
                <LineSkaleton width="250px" />
                <LineSkaleton width="230px" />
                <LineSkaleton width="150px" />
                <LineSkaleton width="250px" />
                <LineSkaleton width="200px" />
                <LineSkaleton width="210px" />
              </>
            ) : (
              <>
                <p>Endereço: {services?.address}</p>
                <p>Cidade: {services?.city}</p>
                <p>Classificação: {services?.classification}</p>
                <p>Solicitante: {services?.client_name}</p>
                <p>Iniciado em: {formatDate(services?.created_at)}</p>
                {services?.finished_at && (
                  <p>Concluído em: {formatDate(services?.finished_at)}</p>
                )}
                {services?.modification_at && modificationFilter()}
                <p>Nomenclatura: {services?.nomenclature}</p>
                <p>Protocolo: {services?.protocol}</p>
                <p>Serviço: {status[services?.status]}</p>
                <p>Contador de Atualização: {services?.update_count}</p>
                {services?.observation && (
                  <Observation>
                    <p>Observação</p>
                    <>{renderTextWithLineBreaks(services?.observation ?? '')}</>
                  </Observation>
                )}
              </>
            )}
          </Info>
          <Button onClick={() => router.back()}>Voltar</Button>
        </Wrapper>
      )}
    </Container>
  );
}
