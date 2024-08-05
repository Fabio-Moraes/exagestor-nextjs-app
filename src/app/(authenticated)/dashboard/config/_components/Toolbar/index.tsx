'use client';

import { usePathname } from 'next/navigation';

import Image from 'components/Vercel/Image';
import Link from 'components/Vercel/Link';

import { getCurrentBusinessTheme } from 'themes/svg/business';

import * as S from './styles';

export function Toolbar() {
  const pathname = usePathname();
  const business = getCurrentBusinessTheme();

  const add = business?.menu.addPerson;
  const execution = business?.menu.rocket;
  const menu = business?.menu.hamburgerMenu;

  return (
    <S.Container>
      <Link href="/dashboard/config/theme" scroll={false}>
        <S.WrapperLink $path={['/dashboard/config/theme'].includes(pathname)}>
          <Image priority loading="eager" src={execution} alt="Book" width="25" height="25" />
          <span>
            Gerenciar
            <br />
            Sistema
          </span>
        </S.WrapperLink>
      </Link>
      <Link href="/dashboard/config/upload" scroll={false}>
        <S.WrapperLink $path={['/dashboard/config/upload'].includes(pathname)}>
          <Image priority loading="eager" src={execution} alt="Book" width="25" height="25" />
          <span>
            Upload <br /> Teste
          </span>
        </S.WrapperLink>
      </Link>

      <Link href="/" scroll={false}>
        <S.WrapperLink style={{ opacity: 0 }}>
          <Image priority loading="eager" src={menu} alt="Menu" width="25" height="25" />
          <span>
            Mais
            <br />
            Opções
          </span>
        </S.WrapperLink>
      </Link>

      <Link href="/" scroll={false}>
        <S.WrapperLink style={{ opacity: 0 }}>
          <Image priority loading="eager" src={add} alt="Add" width="25" height="25" />
          <span>
            Novo
            <br />
            Registro
          </span>
        </S.WrapperLink>
      </Link>
    </S.Container>
  );
}
