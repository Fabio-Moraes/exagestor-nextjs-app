import { useRouter } from 'next/navigation';

import { encryptObject } from 'functions';

import * as S from './styles';

interface Service {
  id: number;
  employee_id: number;
  client_name: string;
  city: string;
  address: string;
  nomenclature: string;
  classification: string;
  status: string;
  update_count: number;
  start_service_at: string;
  created_at: string;
  modification_at: string;
  finished_at: string;
  observation: string;
  protocol: string;
}

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

export function Card({ service }: { service: Service }) {
  const status = {
    concluded: '✅ Finalizado',
    analysis: '🔍 Em análise',
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
  const startServiceAt = formatDate(service.start_service_at);
  const postCardAt = formatDate(datePicker(service));

  const encryptSlug = encryptObject({
    protocol: service?.protocol,
    updateCount: service?.update_count,
    employeeId: service?.employee_id
  });

  const router = useRouter();

  return (
    <S.Container
      rel="preload"
      onClick={() => router.push(`/dashboard/tec/historic/details/${encryptSlug}`, { scroll: false })}
    >
      <p>{postCardAt}</p>
      <div>
        <p>Solicitante: {service?.client_name}</p>
        <p>Cidade: {service?.city}</p>
        <p>Protocolo: {service?.protocol}</p>
        <p>Emissão: {createdAt}</p>
        <p>Para: {startServiceAt}</p>
        <p>Serviço: {status[service?.status]}</p>
      </div>
    </S.Container>
  );
}
