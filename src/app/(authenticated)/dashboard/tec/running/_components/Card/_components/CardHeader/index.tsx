'use client';

import Image from 'components/Vercel/Image';

import iconPaused from './_assets/svg/cone.svg';
import iconFlagActive from './_assets/svg/flag_active.svg';
import iconFlagAnalysis from './_assets/svg/flag_analysis.svg';
import iconPin from './_assets/svg/pin.svg';
import iconUser from './_assets/svg/user.svg';

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
  )
} as { [key: string]: React.JSX.Element };

export function CardHeader({ service }: { service: RunningService }) {
  return (
    <Container $color={service?.status === 'analysis' ? '#e9c80f' : '#5e9987'}>
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
          <div>{StatusOptions[service?.status]}</div>
        </div>
        <button>
          <Image
            src={iconPin}
            priority
            loading="eager"
            alt="Axa"
            style={{
              //margin: '0.2rem',
              width: '1.8rem',
              height: 'auto'
            }}
          />
        </button>
      </div>
    </Container>
  );
}
