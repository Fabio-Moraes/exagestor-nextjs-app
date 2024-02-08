'use client';

import Image from 'components/Vercel/Image';

import iconPaused from './assets/svg/cone.svg';
import iconFlagActive from './assets/svg/flag_active.svg';
import iconFlagAnalysis from './assets/svg/flag_analysis.svg';
import iconMenu from './assets/svg/menu.svg';

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
        style={{ width: '20px', height: 'auto' }}
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
        style={{ width: '20px', height: 'auto' }}
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
        style={{ width: '20px', height: 'auto' }}
      />
      <p>PAUSADO</p>
    </>
  )
} as { [key: string]: React.JSX.Element };

export function CardHeader({ service }: { service: RunningService }) {
  return (
    <Container $path={service?.status === 'analysis' ? '#e9c80f' : ' #3c7d5d'}>
      <div>
        <p>SERVIÇO:</p>
        {StatusOptions[service?.status]}
      </div>
      <div>
        <button>
          <Image
            src={iconMenu}
            priority
            loading="eager"
            alt="Axa"
            style={{ width: '20px', height: 'auto' }}
          />
        </button>
      </div>
    </Container>
  );
}
