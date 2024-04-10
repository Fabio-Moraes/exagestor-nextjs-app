'use client';

import { usePathname } from 'next/navigation';

import Image from 'components/Vercel/Image';
import Link from 'components/Vercel/Link';

import add from './_assets/svg/add.svg';
import execution from './_assets/svg/execution.svg';
import manage from './_assets/svg/manage.svg';
import menu from './_assets/svg/menu.svg';

import * as S from './styles';

export function Toolbar() {
  const pathname = usePathname();

  return (
    <S.Container>
      <Link href="/dashboard/admin/running" scroll={false}>
        <S.WrapperLink $path={['/dashboard/admin/running'].includes(pathname)}>
          <Image priority loading="eager" src={execution} alt="Book" width="25" height="25" />
          <span>
            Em
            <br />
            Execução
          </span>
        </S.WrapperLink>
      </Link>

      <Link href="/dashboard/admin/register" scroll={false}>
        <S.WrapperLink $path={['/dashboard/admin/register', '/'].includes(pathname)}>
          <Image priority loading="eager" src={add} alt="Add" width="25" height="25" />
          <span>
            Novo
            <br />
            Registro
          </span>
        </S.WrapperLink>
      </Link>
      <Link href="/dashboard/admin/manage" scroll={false}>
        <S.WrapperLink $path={['/dashboard/admin/manage'].includes(pathname)}>
          <Image priority loading="eager" src={manage} alt="Report" width="25" height="25" />
          <span>
            Gerenciar <br /> Equipe
          </span>
        </S.WrapperLink>
      </Link>

      <Link href="/" scroll={false}>
        <S.WrapperLink>
          <Image priority loading="eager" src={menu} alt="Menu" width="25" height="25" />
          <span>
            Mais
            <br />
            Opções
          </span>
        </S.WrapperLink>
      </Link>
    </S.Container>
  );
}
