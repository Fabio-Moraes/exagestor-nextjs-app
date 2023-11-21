'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import add from './assets/svg/add.svg';
import execution from './assets/svg/execution.svg';
import menu from './assets/svg/menu.svg';
import report from './assets/svg/report.svg';
import { Button, Container } from './styles';

export function TopMenu() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Container>
      <Button
        $path={['/dashboard/employee/new', '/'].includes(pathname)}
        rel="preload"
        onClick={() => router.push(`/dashboard/employee/new`)}
      >
        <Image priority loading="eager" src={add} alt="Add" width="25" height="25" />
        <span>
          Novo
          <br />
          Serviço
        </span>
      </Button>

      <Button
        $path={['/dashboard/employee/running'].includes(pathname)}
        rel="preload"
        onClick={() => router.push(`/dashboard/employee/running`)}
      >
        <Image priority loading="eager" src={execution} alt="Book" width="25" height="25" />
        <span>
          Em
          <br />
          Execução
        </span>
      </Button>

      <Button
        $path={['/dashboard/employee/historic'].includes(pathname)}
        rel="preload"
        onClick={() => router.push(`/dashboard/employee/running`)}
      >
        <Image priority loading="eager" src={report} alt="Report" width="25" height="25" />
        <span>
          Histórico
          <br />
          Geral
        </span>
      </Button>

      <Button rel="preload" onClick={() => router.push('/')}>
        <Image priority loading="eager" src={menu} alt="Menu" width="25" height="25" />
        <span>
          Mais
          <br />
          Opções
        </span>
      </Button>
    </Container>
  );
}
