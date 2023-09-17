'use client';

import Cookie from 'js-cookie';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import add from './assets/svg/add.svg';
import exa from './assets/svg/exa_logo.svg';
import execution from './assets/svg/execution.svg';
import menu from './assets/svg/menu.svg';
import report from './assets/svg/report.svg';
import {
  Button,
  Container,
  Forehead,
  MenuHeader,
  ProfileInfo
} from './styles';

export function Header() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Container>
      <Forehead>
        <Image
          priority
          src={exa}
          alt="Axa"
          width={60}
          height={60}
        />
        <ProfileInfo>
          <strong>EXA TELECOM</strong>
          <span>Telecomunicações</span>
        </ProfileInfo>
        <div>
          <span>Caetano Veloso</span>
          <button
            onClick={() => {
              Cookie.remove('auth_token');
              router.refresh();
            }}
          >
            <span>Sair</span>
          </button>
        </div>
      </Forehead>

      <MenuHeader>
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
          <span>Novo<br />Serviço</span>
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
          <span>Em<br />Execução</span>
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
          <span>Fechamento<br />Mensal</span>
        </Button>

        <Button
         href='/'
        >
          <Image
            priority
            src={menu}
            alt="Menu"
            width={25}
            height={25}
          />
          <span>Mais<br />Opções</span>
        </Button>
      </MenuHeader>
    </Container>
  );
}
