'use client';

import { usePathname } from 'next/navigation';

import Image from 'components/Vercel/Image';

import add from './assets/svg/add.svg';
import execution from './assets/svg/execution.svg';
import menu from './assets/svg/menu.svg';
import report from './assets/svg/report.svg';
import { Button, Container, Wrapper } from './styles';

export function RightMenu() {
  const pathname = usePathname();
  const proportion = { width: 25, height: 25 };

  return (
    <Container>
      <Wrapper>
        <div>
          <Button
            $path={['/dashboard/admin/running'].includes(pathname)}
            //href="/dashboard/admin/running"
            rel="preload"
          >
            <Image priority loading="eager" src={execution} alt="Book" {...proportion} />
            <span>Em Execução</span>
          </Button>
        </div>

        <div>
          <Button
            $path={['/dashboard/admin/register', '/'].includes(pathname)}
            //href="/dashboard/admin/register"
            rel="preload"
          >
            <Image priority loading="eager" src={add} alt="Add" {...proportion} />
            <span>Novo Resgistro</span>
          </Button>
        </div>

        <div>
          <Button
            $path={['/dashboard/tec/historic'].includes(pathname)}
            //href="/dashboard/tec/historic"
            rel="preload"
          >
            <Image priority loading="eager" src={report} alt="Report" {...proportion} />
            <span>Histórico Geral</span>
          </Button>
        </div>

        <div>
          <Button>
            <Image priority loading="eager" src={menu} alt="Clipboard" {...proportion} />
            <span>Materiais Utilizados</span>
          </Button>
        </div>
      </Wrapper>
    </Container>
  );
}
