import { ButtonBar } from './_components/ButtonBar';
import { CardContent } from './_components/CardContent';
import { CardHeader } from './_components/CardHeader';

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
  created_at: string;
  protocol: string;
  name_admin: string;
  name_tec: string;
}

export function Card({ service }: { service: RunningService }) {
  return (
    <S.Container>
      <CardHeader service={service} />
      <S.Wrapper>
        <CardContent service={service} />
        <ButtonBar service={service} />
      </S.Wrapper>
    </S.Container>
  );
}
