'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

import add from './assets/svg/add.svg';
import execution from './assets/svg/execution.svg';
import menu from './assets/svg/menu.svg';
import report from './assets/svg/report.svg';

import {
    Button,
    Container,
} from './styles';

export function Menu() {
  const pathname = usePathname();
  const proportion = { width: 25, height: 25 };

  return (
    <Container>
      <Button
        $path={['/dashboard/new-service', '/'].includes(pathname)}
        href='/dashboard/new-service'
      >
        <Image priority src={add} alt="Add" {...proportion} />
        <span>Novo<br />Serviço</span>
      </Button>

      <Button
        $path={['/dashboard/running-service'].includes(pathname)}
        href='/dashboard/running-service'
      >
        <Image priority src={execution} alt="Book" {...proportion} />
        <span>Em<br />Execução</span>
      </Button>

      <Button   
        $path={['/dashboard/historic-service'].includes(pathname)}
        href='/dashboard/historic-service' >
        <Image priority src={report} alt="Report" {...proportion} />
        <span>Histórico<br />Geral</span>
      </Button>

      <Button href='/' >
        <Image priority src={menu} alt="Menu" {...proportion} />
        <span>Mais<br />Opções</span>
      </Button>
    </Container>
  );
}
