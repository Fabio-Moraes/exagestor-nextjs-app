'use client';

import { useEffect, useState } from 'react';

import { Container } from './styles';

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

export function DisplayInfo({ service }: { service: Service }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Defina o tempo de atraso em milissegundos (neste exemplo, 2 segundos)

    return () => {
      clearTimeout(timer); // Limpar o temporizador se o componente for desmontado antes do tempo limite
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
    active: '🚧 Em andamento',
    paused: '⏸️ Pausado'
  } as { [key: string]: string };

  const createdAt = formatDate(service.created_at);

  return (
    <Container>
      {isLoading && (
        <div>
          <p>Solicitante: {service?.client_name}</p>
          <p>Cidade: {service?.city}</p>
          <p>Endereço de origem do serviço: {service?.address}</p>
          <p>Nomenclatura de caixa ou cabo: {service?.nomenclature}</p>
          <p>Classe: {service?.classification}</p>
          <p>Protocolo: {service?.protocol}</p>
          <p>Início: {createdAt}</p>
          <p>Status do serviço: {status[service?.status]}</p>
          <p>Atualização de status: {service?.update_count}</p>
        </div>
      )}
    </Container>
  );
}
