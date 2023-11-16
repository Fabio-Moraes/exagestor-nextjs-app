'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

import add from './assets/svg/add.svg';
import execution from './assets/svg/execution.svg';
import menu from './assets/svg/menu.svg';
import report from './assets/svg/report.svg';
import { Button, Container } from './styles';

export function TopMenu() {
  const pathname = usePathname();
  const proportion = { width: 25, height: 25 };

  return (
    <Container>
      <Button
        $path={['/dashboard/admin/running'].includes(pathname)}
        href="/dashboard/admin/running"
      >
        <Image priority loading="eager" src={execution} alt="Book" {...proportion} />
        <span>
          Em
          <br />
          Execução
        </span>
      </Button>

      <Button
        $path={['/dashboard/admin/register', '/'].includes(pathname)}
        href="/dashboard/admin/register"
      >
        <Image priority loading="eager" src={add} alt="Add" {...proportion} />
        <span>
          Novo
          <br />
          Registro
        </span>
      </Button>

      <Button
        $path={['/dashboard/employee/historic'].includes(pathname)}
        href="/dashboard/employee/historic"
      >
        <Image priority loading="eager" src={report} alt="Report" {...proportion} />
        <span>
          Histórico
          <br />
          Geral
        </span>
      </Button>

      <Button href="/">
        <Image priority loading="eager" src={menu} alt="Menu" {...proportion} />
        <span>
          Mais
          <br />
          Opções
        </span>
      </Button>
    </Container>
  );
}
