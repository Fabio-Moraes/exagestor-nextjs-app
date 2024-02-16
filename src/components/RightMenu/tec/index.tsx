'use client';

import { usePathname, useRouter } from 'next/navigation';

import Image from 'components/Vercel/Image';

import add from './assets/svg/add.svg';
import execution from './assets/svg/execution.svg';
import menu from './assets/svg/menu.svg';
import report from './assets/svg/report.svg';

import { Button, Container, Wrapper } from './styles';

export function RightMenu() {
  const router = useRouter();

  const pathname = usePathname();
  const proportion = { width: 25, height: 25 };

  return (
    <Container>
      <Wrapper>
        <div>
          <Button
            $path={['/dashboard/tec/new', '/'].includes(pathname)}
            onClick={() => router.push('/dashboard/tec/new')}
            rel="preload"
          >
            <Image priority loading="eager" src={add} alt="Add" {...proportion} />
            <span>Novo Serviço</span>
          </Button>
        </div>

        <div>
          <Button
            $path={['/dashboard/tec/running'].includes(pathname)}
            onClick={() => router.push('/dashboard/tec/running')}
            rel="preload"
          >
            <Image priority loading="eager" src={execution} alt="Book" {...proportion} />
            <span>Em Execução</span>
          </Button>
        </div>

        <div>
          <Button
            $path={['/dashboard/tec/historic'].includes(pathname)}
            onClick={() => router.push('/dashboard/tec/historic')}
            rel="preload"
          >
            <Image priority loading="eager" src={report} alt="Report" {...proportion} />
            <span>Histórico Geral</span>
          </Button>
        </div>

        <div>
          <Button
            $path={['/dashboard/tec/stock'].includes(pathname)}
            onClick={() => router.push('/dashboard/tec/stock')}
            rel="preload"
          >
            <Image priority loading="eager" src={menu} alt="Clipboard" {...proportion} />
            <span>Visualizar Carga</span>
          </Button>
        </div>
      </Wrapper>
    </Container>
  );
}
