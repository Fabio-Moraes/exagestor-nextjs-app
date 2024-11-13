'use client';

import Image from 'components/Vercel/Image';

import iconPaused from './_assets/svg/cone.svg';
import iconFlagActive from './_assets/svg/flag_active.svg';
import iconFlagAnalysis from './_assets/svg/flag_analysis.svg';
import iconFlagDate from './_assets/svg/flag_date.svg';
import iconPin from './_assets/svg/pin.svg';
import iconUser from './_assets/svg/user.svg';

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
  name_creator_leader: string;
  name_tec: string;
}

const StatusOptions = {
  analysis: (
    <>
      <Image
        src={iconFlagAnalysis}
        priority
        loading="eager"
        alt="Axa"
        style={{ width: '2rem', height: 'auto' }}
      />
      <p>EM ANÁLISE</p>
    </>
  ),
  active: (
    <>
      <Image
        src={iconFlagActive}
        priority
        loading="eager"
        alt="Axa"
        style={{ width: '2rem', height: 'auto' }}
      />
      <p>EM ANDAMENTO</p>
    </>
  ),
  paused: (
    <>
      <Image
        src={iconPaused}
        priority
        loading="eager"
        alt="Axa"
        style={{ width: '2rem', height: 'auto' }}
      />
      <p>PAUSADO</p>
    </>
  ),
  scheduled: (
    <>
      <Image
        src={iconFlagDate}
        priority
        loading="eager"
        alt="Axa"
        style={{ width: '2rem', height: 'auto' }}
      />
      <p>AGENDADO</p>
    </>
  )
} as const;

const statusColor = {
  analysis: '--color-palette-analysis',
  active: '--color-secondary-03',
  paused: '--color-secondary-03',
  scheduled: '--color-palette-scheduled'
} as const;

export function CardHeader(props: { service: RunningService; passedScheduledDate: boolean }) {
  const { service, passedScheduledDate } = props;

  return (
    <S.Container
      $color={
        statusColor[
          passedScheduledDate ? (service?.status as 'analysis' | 'active' | 'paused') : 'scheduled'
        ]
      }
    >
      <div>
        <div>
          <div>
            <Image
              src={iconUser}
              priority
              loading="eager"
              alt="Axa"
              style={{ width: '2.05rem', height: 'auto' }}
            />
            <p>{service?.name_tec.toLocaleUpperCase()}</p>
          </div>
          <div>
            {
              StatusOptions[
                passedScheduledDate ? (service?.status as 'analysis' | 'active' | 'paused') : 'scheduled'
              ]
            }
          </div>
        </div>
        <button>
          <Image
            src={iconPin}
            priority
            loading="eager"
            alt="Axa"
            style={{
              width: '1.8rem',
              height: 'auto'
            }}
          />
        </button>
      </div>
    </S.Container>
  );
}
