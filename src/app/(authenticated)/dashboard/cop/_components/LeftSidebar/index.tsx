'use client';

import { usePathname } from 'next/navigation';

import Image from 'components/Vercel/Image';
import Link from 'components/Vercel/Link';

import execution from './_assets/svg/execution.svg';
import manage from './_assets/svg/manage.svg';

import * as S from './styles';

export function LeftSidebar() {
  const pathname = usePathname();

  return (
    <S.Container>
      <S.Wrapper>
        <Link href="/dashboard/cop/running" scroll={false}>
          <S.WrapperLink $path={['/dashboard/cop/running'].includes(pathname)}>
            <Image
              priority
              loading="eager"
              src={execution}
              alt="Book"
              width="25"
              height="25"
            />
            <span>Em Execução</span>
          </S.WrapperLink>
        </Link>

        <Link href="/dashboard/cop/manage" scroll={false}>
          <S.WrapperLink $path={['/dashboard/cop/manage'].includes(pathname)}>
            <Image priority loading="eager" src={manage} alt="Report" width="25" height="25" />
            <span>Gerenciar Equipe</span>
          </S.WrapperLink>
        </Link>
      </S.Wrapper>
    </S.Container>
  );
}
