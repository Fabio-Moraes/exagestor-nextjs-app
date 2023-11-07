'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button, Container, Title, Wrapper } from './styles';

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
  const [services, setServices] = useState<Service[]>([]);
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
        setServices(response.data);
        console.log('!!!!', response);
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

  return (
    <Container>
      <Title>Detalhes</Title>
      <Wrapper>
        <section>
          <p>Endereço: {services[0]?.address}</p>
          <p>Cidade: {services[0]?.city}</p>
          <p>Classificação: {services[0]?.classification}</p>
          <p>Nome do Cliente: {services[0]?.client_name}</p>
          <p>Data de Criação: {formatDate(services[0]?.created_at)}</p>
          {services[0]?.finished_at && (
            <p>Data de Conclusão: {formatDate(services[0]?.finished_at)}</p>
          )}
          {services[0]?.modification_at && (
            <p>
              Data de Modificação: {formatDate(services[0]?.modification_at)}
            </p>
          )}
          <p>Nomenclatura: {services[0]?.nomenclature}</p>
          <p>Protocolo: {services[0]?.protocol}</p>
          <p>Status: {status[services[0]?.status]}</p>
          <p>Contador de Atualização: {services[0]?.update_count}</p>
          {services[0]?.observation && (
            <p>Observação: {services[0]?.observation}</p>
          )}
        </section>

        <Button onClick={() => router.back()}>
          <p>Voltar</p>
        </Button>
      </Wrapper>
    </Container>
  );
}
