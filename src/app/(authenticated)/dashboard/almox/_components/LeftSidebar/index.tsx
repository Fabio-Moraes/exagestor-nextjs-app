'use client';

import { usePathname } from 'next/navigation';

import Image from 'components/Vercel/Image';
import Link from 'components/Vercel/Link';

import add from './_assets/svg/add.svg';
import execution from './_assets/svg/execution.svg';
import manage from './_assets/svg/manage.svg';

import * as S from './styles';

export function LeftSidebar() {
  const pathname = usePathname();

  return (
    <S.Container>
      <S.Wrapper>
        <Link href="/dashboard/almox/stock" scroll={false}>
          <S.WrapperLink $path={['/dashboard/almox/stock'].includes(pathname)}>
            <Image
              priority
              loading="eager"
              src={execution}
              alt="Book"
              width="25"
              height="25"
            />
            <span>Gerenciar Estoque</span>
          </S.WrapperLink>
        </Link>

        <Link href="/dashboard/almox/register" scroll={false}>
          <S.WrapperLink $path={['/dashboard/almox/register', '/'].includes(pathname)}>
            <Image priority loading="eager" src={add} alt="Add" width="25" height="25" />
            <span>Novo Produto</span>
          </S.WrapperLink>
        </Link>

        <Link href="/dashboard/almox/manage" scroll={false}>
          <S.WrapperLink $path={['/dashboard/almox/manage'].includes(pathname)}>
            <Image priority loading="eager" src={manage} alt="Report" width="25" height="25" />
            <span>Gerenciar Equipe</span>
          </S.WrapperLink>
        </Link>
      </S.Wrapper>
    </S.Container>
  );
}
