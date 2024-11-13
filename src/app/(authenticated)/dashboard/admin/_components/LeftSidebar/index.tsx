'use client';

import { usePathname } from 'next/navigation';

import Image from 'components/Vercel/Image';
import Link from 'components/Vercel/Link';

import { getCurrentBusinessTheme } from 'themes/svg/business';

import * as S from './styles';

export function LeftSidebar() {
  const pathname = usePathname();
  const business = getCurrentBusinessTheme();

  const add = business?.menu.addPerson;
  const execution = business?.menu.rocket;
  const manage = business?.menu.bookPen;
  const menu = business?.menu.hamburgerMenu;

  return (
    <S.Container>
      <S.Wrapper>
        <Link href="/dashboard/admin/running" scroll={false}>
          <S.WrapperLink $path={['/dashboard/admin/running'].includes(pathname)}>
            <Image priority loading="eager" src={execution} alt="Book" width="25" height="25" />
            <span>Em Execução</span>
          </S.WrapperLink>
        </Link>

        <Link href="/dashboard/admin/register" scroll={false}>
          <S.WrapperLink $path={['/dashboard/admin/register', '/'].includes(pathname)}>
            <Image priority loading="eager" src={add} alt="Add" width="25" height="25" />
            <span>Novo Resgistro</span>
          </S.WrapperLink>
        </Link>

        <Link href="/dashboard/admin/manage" scroll={false}>
          <S.WrapperLink $path={['/dashboard/admin/manage'].includes(pathname)}>
            <Image priority loading="eager" src={manage} alt="Report" width="25" height="25" />
            <span>Gerenciar Equipe</span>
          </S.WrapperLink>
        </Link>

        <Link href="/" scroll={false}>
          <S.WrapperLink>
            <Image priority loading="eager" src={menu} alt="Clipboard" width="25" height="25" />
            <span>Materiais Utilizados</span>
          </S.WrapperLink>
        </Link>
      </S.Wrapper>
    </S.Container>
  );
}
