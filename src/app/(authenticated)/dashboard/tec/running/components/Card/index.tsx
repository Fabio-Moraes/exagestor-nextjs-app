import { ButtonBar } from './components/ButtonBar';
import { CardContent } from './components/CardContent';
import { CardHeader } from './components/CardHeader';

import { Wrapper, Container } from './styles';

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
      <CardHeader service={service} />
      <Wrapper>
        <CardContent service={service} />
        <ButtonBar service={service} />
      </Wrapper>
    </Container>
  );
}
