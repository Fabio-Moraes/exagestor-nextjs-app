import moment from 'moment';

import * as S from './styles';

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
  start_service_at: string;
  created_at: string;
  protocol: string;
  name_tec: string;
  name_creator_leader: string;
  role_creator_leader: string;
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

export function CardContent(props: { service: RunningService; passedScheduledDate: boolean }) {
  const { service, passedScheduledDate } = props;

  const createdAt = formatDate(service.created_at);
  const startServiceAt = formatDate(service.start_service_at);

  const yourDate = moment(service?.start_service_at);
  const timeDifference = yourDate.diff(moment());
  const duration = moment.duration(timeDifference);

  const days = duration.days() !== 0 ? `${duration.days()} dias, ` : '';
  const hours = duration.hours() !== 0 ? `${duration.hours()} horas, ` : '';
  const minutes = duration.minutes() !== 0 ? `${duration.minutes()} minutos, ` : '';
  const seconds = `${duration.seconds()} segundos`;
  const countdownToScheduledDate = `${days}${hours}${minutes}${seconds}`;

  return (
    <S.Container>
      {!passedScheduledDate && (
        <S.Countdown>
          <p>O serviço será iniciado em:</p>
          <p>{countdownToScheduledDate}</p>
        </S.Countdown>
      )}
      <div>
        <p>SOLICITANTE: {service?.client_name.toUpperCase()}</p>
        <p>CIDADE: {service?.city.toUpperCase()}</p>
        <p>ENDEREÇO: {service?.address.toUpperCase()}</p>
        {service?.nomenclature && <p>NOMENCL. CX OU CABO: {service?.nomenclature.toUpperCase()}</p>}
        {service?.classification && <p>CLASSE: {service?.classification}</p>}
        <p>PROTOCOLO: {service?.protocol}</p>
        <p>EMISSÃO: {createdAt}</p>
        <p>PARA: {startServiceAt}</p>
        <p>
          INICIADO POR:
          {service?.name_creator_leader
            ? ` ${service?.name_creator_leader
                .concat(` (${service?.role_creator_leader})`)
                .toUpperCase()}`
            : ` ${service?.name_tec.toUpperCase().concat(' (TEC)')}`}
        </p>
        <p>ATUALIZAÇÃO DE STATUS: {service?.update_count}</p>
      </div>
    </S.Container>
  );
}
