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

export function Card({ service }: { service: RunningService }) {
  return (
    <Container>
      <Title>
        <p>{service?.name_tec.concat(' (TEC)')}</p>
      </Title>
      <Wrapper>
        <Info service={service} />
        <ControlButtons service={service} />
      </Wrapper>
    </Container>
  );
}
