import { Container } from './styles';

interface Material {
  id: number;
  name_tec: string;
  name_role: string;
  product_name: string;
  unit_type: string;
  product_code: string;
  quantity_value: string;
  created_at: string;
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

export function Card({ service }: { service: Material }) {
  const createdAt = formatDate(service.created_at);

  // const status = {
  //   concluded: '✅ Finalizado',
  //   analysis: '🔍 Em análise',
  //   active: '🚧 Em andamento',
  //   paused: '⏸️ Pausado',
  //   canceled: '❌ Cancelado'
  // } as { [key: string]: string };

  return (
    <Container rel="preload" onClick={() => {}}>
      <p></p>
      <div>
        <p>
          FUNCIONÁRIO: {service?.name_tec?.concat(` (${service?.name_role.toUpperCase()})`)}
        </p>
        <p>MATERIAIS: {service?.product_name}</p>
        <p>QUANTIDADE: {service?.quantity_value}</p>
        <p>TIPO: {service?.unit_type}</p>
        <p>CÓDIGO: {service?.product_code}</p>
        <p>ENVIADO EM: {createdAt}</p>
        {/* <p>Serviço: {status[service?.status]}</p> */}
      </div>
    </Container>
  );
}
