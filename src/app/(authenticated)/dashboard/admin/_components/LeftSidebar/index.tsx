'use client';

import { usePathname, useRouter } from 'next/navigation';

import Image from 'components/Vercel/Image';

import add from './_assets/svg/add.svg';
import execution from './_assets/svg/execution.svg';
import manage from './_assets/svg/manage.svg';
import menu from './_assets/svg/menu.svg';

import { Button, Container, Wrapper } from './styles';

export function LeftSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Container>
      <Wrapper>
        <div>
          <Button
            $path={['/dashboard/admin/running'].includes(pathname)}
            onClick={() => router.push('/dashboard/admin/running', { scroll: false })}
            rel="preload"
          >
            <Image
              priority
              loading="eager"
              src={execution}
              alt="Book"
              width="25"
              height="25"
            />
            <span>Em Execução</span>
          </Button>
        </div>

        <div>
          <Button
            $path={['/dashboard/admin/register', '/'].includes(pathname)}
            onClick={() => router.push('/dashboard/admin/register', { scroll: false })}
            rel="preload"
          >
            <Image priority loading="eager" src={add} alt="Add" width="25" height="25" />
            <span>Novo Resgistro</span>
          </Button>
        </div>

        <div>
          <Button
            $path={['/dashboard/admin/manage'].includes(pathname)}
            onClick={() => router.push('/dashboard/admin/manage', { scroll: false })}
            rel="preload"
          >
            <Image priority loading="eager" src={manage} alt="Report" width="25" height="25" />
            <span>Gerenciar Equipe</span>
          </Button>
        </div>

        <div>
          <Button>
            <Image
              priority
              loading="eager"
              src={menu}
              alt="Clipboard"
              width="25"
              height="25"
            />
            <span>Materiais Utilizados</span>
          </Button>
        </div>
      </Wrapper>
    </Container>
  );
}
