import { Container } from './styles';

interface RunningService {
  id: number;
  employee_id: number;
  client_name: string;
  city: string;
  address: string;
  nomenclature: string;
  classification: string;
  update_count: number;
  status: string;
  created_at: string;
  protocol: string;
  name_admin: string;
  name_tec: string;
}

export function CardContent({ service }: { service: RunningService }) {
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

  const createdAt = formatDate(service.created_at);
  const patternProtocol = /(\d{1})(\d{4})(\d{4})(\d{4})(\d{4})/;

  return (
    <Container>
      <div>
        <p>SOLICITANTE: {service?.client_name.toUpperCase()}</p>
        <p>CIDADE: {service?.city.toUpperCase()}</p>
        <p>ENDEREÇO DE ORIGEM DO SERVIÇO: {service?.address.toUpperCase()}</p>
        <p>NOMENCLATURA DE CAIXA OU CABO: {service?.nomenclature.toUpperCase()}</p>
        <p>CLASSE: {service?.classification}</p>
        <p>PROTOCOLO: {service?.protocol.replace(patternProtocol, '$1-$2-$3-$4-$5')}</p>
        <p>INICIADO EM: {createdAt}</p>
        <p>
          INICIADO POR:
          {service?.name_admin
            ? ` ${service?.name_admin.toUpperCase().concat(' (ADMIN)')}`
            : ` ${service?.name_tec.toUpperCase().concat(' (TEC)')}`}
        </p>
        <p>ATUALIZAÇÃO DE STATUS: {service?.update_count}</p>
      </div>
    </Container>
  );
}
