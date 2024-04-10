'use client';

import { usePathname } from 'next/navigation';

import Image from 'components/Vercel/Image';
import Link from 'components/Vercel/Link';

import add from './_assets/svg/add.svg';
import execution from './_assets/svg/execution.svg';
import manage from './_assets/svg/manage.svg';
import menu from './_assets/svg/menu.svg';

import { WrapperLink, Container, Wrapper } from './styles';

export function LeftSidebar() {
  const pathname = usePathname();

  return (
    <Container>
      <Wrapper>
        <Link href="/dashboard/admin/running" scroll={false}>
          <WrapperLink $path={['/dashboard/admin/running'].includes(pathname)}>
            <Image
              priority
              loading="eager"
              src={execution}
              alt="Book"
              width="25"
              height="25"
            />
            <span>Em Execução</span>
          </WrapperLink>
        </Link>

        <Link href="/dashboard/admin/register" scroll={false}>
          <WrapperLink $path={['/dashboard/admin/register', '/'].includes(pathname)}>
            <Image priority loading="eager" src={add} alt="Add" width="25" height="25" />
            <span>Novo Resgistro</span>
          </WrapperLink>
        </Link>

        <Link href="/dashboard/admin/manage" scroll={false}>
          <WrapperLink $path={['/dashboard/admin/manage'].includes(pathname)}>
            <Image priority loading="eager" src={manage} alt="Report" width="25" height="25" />
            <span>Gerenciar Equipe</span>
          </WrapperLink>
        </Link>

        <Link href="/" scroll={false}>
          <WrapperLink>
            <Image
              priority
              loading="eager"
              src={menu}
              alt="Clipboard"
              width="25"
              height="25"
            />
            <span>Materiais Utilizados</span>
          </WrapperLink>
        </Link>
      </Wrapper>
    </Container>
  );
}
