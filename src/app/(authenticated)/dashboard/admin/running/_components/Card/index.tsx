import { useEffect, useState } from 'react';

import { ButtonBar } from './_components/ButtonBar';
import { CardContent } from './_components/CardContent';
import { CardHeader } from './_components/CardHeader';

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
  name_admin: string;
  name_tec: string;
}

export function Card({ service }: { service: RunningService }) {
  const [currentDate, setCurrentDate] = useState(moment());
  const yourDate = moment(service?.start_service_at);
  const passedScheduledDate = yourDate.isSameOrBefore(currentDate);

  useEffect(() => {
    if (!passedScheduledDate) {
      const interval = setInterval(() => {
        setCurrentDate(moment());
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [passedScheduledDate]);

  const props = { service, passedScheduledDate };

  return (
    <S.Container>
      <CardHeader {...props} />
      <S.Wrapper>
        <CardContent {...props} />
        <ButtonBar {...props} />
      </S.Wrapper>
    </S.Container>
  );
}
