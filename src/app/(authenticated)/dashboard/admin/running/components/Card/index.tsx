import { ControlButtons } from './components/ControlButtons';
import { Info } from './components/Info';

import { Wrapper, Container, Title } from './styles';

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

const status = {
  analysis: '🔍 EM ANÁLISE',
  active: '🚧 EM ANDAMENTO',
  paused: '⏸️ PAUSADO'
} as { [key: string]: string };

export function Card({ service }: { service: RunningService }) {
  return (
    <Container>
      <Title $path={service?.status === 'analysis' ? '#e9c80f' : ' #3c7d5d'}>
        <p>TÉCNICO: 👤 {service?.name_tec.toLocaleUpperCase()}</p>
        <p>SERVIÇO: {status[service?.status]}</p>
      </Title>
      <Wrapper>
        <Info service={service} />
        <ControlButtons service={service} />
      </Wrapper>
    </Container>
  );
}
