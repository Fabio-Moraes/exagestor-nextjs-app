import { useRouter } from 'next/navigation';

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
  finished_at: string;
  observation: string;
  protocol: string;
}

export function Card({ service }: { service: Service }) {
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

  function datePicker(service: Service) {
    if (service.finished_at) return service.finished_at;
    if (service.modification_at) return service.modification_at;
    return service.created_at;
  }

  const createdAt = formatDate(service.created_at);
  const postCardAt = formatDate(datePicker(service));

  const encryptSlug = encryptObject({
    protocol: service?.protocol,
    update_count: service?.update_count
  });

  const router = useRouter();

  return (
    <Container
      rel="preload"
      onClick={() => router.push(`/dashboard/tec/historic/details/${encryptSlug}`)}
    >
      <p>{postCardAt}</p>
      <div>
        <p>Solicitante: {service?.client_name}</p>
        <p>Cidade: {service?.city}</p>
        <p>Protocolo: {service?.protocol}</p>
        <p>Iniciado em: {createdAt}</p>
        <p>Serviço: {status[service?.status]}</p>
      </div>
    </Container>
  );
}
