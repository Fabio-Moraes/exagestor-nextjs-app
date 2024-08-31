import { useEffect, useState } from 'react';

import { ButtonBar } from './_components/ButtonBar';
import { CardContent } from './_components/CardContent';
import { CardHeader } from './_components/CardHeader';

import moment from 'moment';

import * as S from './styles';

type RunningService = {
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
  name_creator_leader: string;
  name_tec: string;
  type_operation: string;
};

type CardTypes = {
  service: RunningService;
  shared?: boolean;
};

export function Card({ service, shared }: CardTypes) {
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
      <CardHeader shared={shared} {...props} />
      <S.Wrapper>
        <CardContent {...props} />
        <ButtonBar shared={shared} {...props} />
      </S.Wrapper>
    </S.Container>
  );
}
