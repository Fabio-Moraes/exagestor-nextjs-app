'use client';

import { useRouter } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';

import { Button, Container, Wrapper, Observation, Title, Info } from './styles';

import { decryptObject } from 'functions';
import Cookie from 'js-cookie';
import api from 'lib/api';

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
  observation: string;
  finished_at: string;
  protocol: string;
}

interface SlugType {
  params: {
    slug: string;
  };
}

export default function Details({ params }: SlugType) {
  const router = useRouter();

  const { protocol, update_count } = decryptObject(params.slug);

  /* eslint-disable */
  const [services, setServices] = useState<Service | null>(null);
  const [connectionError, setConnectionError] = useState(false);
  const [isPopupValue, setIsPopupValue] = useState<string | null>(null);
  /* eslint-enable */

  const storedCookie = Cookie.get('auth_token');
  const maxRetries = 4;

  async function fetchServices() {
    setConnectionError(false);

    for (let count = 0; count < maxRetries; count++) {
      try {
        setIsPopupValue(
          count > 0 ? `Conectando<br>Tentativa (${count + 1})` : 'Conectando'
        );

        const response = await api.get('/api/services/historic/details', {
          params: { token: storedCookie, protocol, update_count }
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
          {line ? (
            <p key={String(index)}>{line}</p>
          ) : (
            <div key={`extra-div-${index}`} />
          )}
        </Fragment>
      );
    });
  };

  return (
    <Container>
      <Title>Detalhes</Title>
      <Wrapper>
        <Info>
          <p>Endereço: {services?.address}</p>
          <p>Cidade: {services?.city}</p>
          <p>Classificação: {services?.classification}</p>
          <p>Nome do Cliente: {services?.client_name}</p>
          {services?.created_at && (
            <p>Data de Criação: {formatDate(services?.created_at)}</p>
          )}
          {services?.finished_at && (
            <p>Data de Conclusão: {formatDate(services?.finished_at)}</p>
          )}
          {services?.modification_at && (
            <p>Data de Modificação: {formatDate(services?.modification_at)}</p>
          )}
          <p>Nomenclatura: {services?.nomenclature}</p>
          <p>Protocolo: {services?.protocol}</p>
          <p>Status: {status[services?.status ?? 'active']}</p>
          <p>Contador de Atualização: {services?.update_count}</p>
          {true && services?.observation && (
            <Observation>
              <p>Observação</p>
              <>{renderTextWithLineBreaks(services?.observation ?? '')}</>
            </Observation>
          )}
        </Info>
        <Button onClick={() => router.back()}>Voltar</Button>
      </Wrapper>
    </Container>
  );
}
