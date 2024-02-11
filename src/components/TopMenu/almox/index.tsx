'use client';

import { usePathname, useRouter } from 'next/navigation';

import Image from 'components/Vercel/Image';

import add from './assets/svg/add.svg';
import execution from './assets/svg/execution.svg';
import manage from './assets/svg/manage.svg';
import menu from './assets/svg/menu.svg';

import { Button, Container } from './styles';

export function TopMenu() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Container>
      <Button
        $path={['/dashboard/almox/stock'].includes(pathname)}
        rel="preload"
        onClick={() => router.push(`/dashboard/almox/stock`)}
      >
        <Image priority loading="eager" src={execution} alt="Book" width="25" height="25" />
        <span>
          Gerenciar
          <br />
          Estoque
        </span>
      </Button>

      <Button
        $path={['/dashboard/almox/register', '/'].includes(pathname)}
        rel="preload"
        onClick={() => router.push(`/dashboard/almox/register`)}
      >
        <Image priority loading="eager" src={add} alt="Add" width="25" height="25" />
        <span>
          Novo
          <br />
          Registro
        </span>
      </Button>

      <Button
        style={{ opacity: 0 }}
        $path={['/dashboard/admin/manage'].includes(pathname)}
        rel="preload"
        onClick={() => {}}
      >
        <Image priority loading="eager" src={manage} alt="Report" width="25" height="25" />
        <span>
          Gerenciar <br /> Equipe
        </span>
      </Button>

      <Button style={{ opacity: 0 }} rel="preload" onClick={() => {}}>
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
