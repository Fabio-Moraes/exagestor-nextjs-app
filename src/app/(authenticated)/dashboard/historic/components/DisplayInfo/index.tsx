import { Container } from './styles';

import { encryptObject } from 'functions';

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
  protocol: string;
}

export function DisplayInfo({ service }: { service: Service }) {
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

  const modificationAt = formatDate(
    service[service.modification_at ? 'modification_at' : 'created_at']
  );

  const createdAt = formatDate(service.created_at);

  const encryptSlug = encryptObject({
    protocol: service?.protocol,
    update_count: service?.update_count
  });

  return (
    <Container href={`/dashboard/historic/details/${encryptSlug}`}>
      <p>{modificationAt}</p>
      <div>
        <p>Solicitante: {service?.client_name}</p>
        <p>Cidade: {service?.city}</p>
        <p>Protocolo: {service?.protocol}</p>
        <p>Início: {createdAt}</p>
        <p>Status do serviço: {status[service?.status]}</p>
      </div>
    </Container>
  );
}
