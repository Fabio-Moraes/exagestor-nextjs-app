'use client';

import Image from 'next/image';

import { usePathname, useRouter } from 'next/navigation';
import add from './assets/svg/add.svg';
import clipboard from './assets/svg/clipboard.svg';
import execution from './assets/svg/execution.svg';
import report from './assets/svg/report.svg';
import {
  Button,
  Container,
  Wrapper
} from './styles';

export function MenuBar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Container>
      <Wrapper>
        <Button
          $path={['/dashboard/new-service', '/'].includes(pathname)}
          href='/dashboard/new-service'
        >
          <Image
            priority
            src={add}
            alt="Add"
            width={25}
            height={25}
          />
          <span>Novo Serviço</span>
        </Button>


        <Button
           $path={['/dashboard/running-service'].includes(pathname)}
           href='/dashboard/running-service'
        >
          <Image
            priority
            src={execution}
            alt="Book"
            width={25}
            height={25}
          />
          <span>Em Execução</span>
        </Button>

        <Button
          href='/'
        >
          <Image
            priority
            src={report}
            alt="Report"
            width={25}
            height={25}
          />
          <span>Fechamento Mensal</span>
        </Button>

        <Button
          href='/'
        >
          <Image
            priority
            src={clipboard}
            alt="Clipboard"
            width={25}
            height={25}
          />
          <span>Materiais Utilizados</span>
        </Button>
      </Wrapper>
    </Container>
  );
}
