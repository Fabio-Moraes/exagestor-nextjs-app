'use client';

import { usePathname } from 'next/navigation';

import Image from 'components/Vercel/Image';
import Link from 'components/Vercel/Link';

import { getCurrentBusinessTheme } from 'themes/svg/business';

import * as S from './styles';

export function LeftSidebar() {
  const pathname = usePathname();
  const business = getCurrentBusinessTheme();

  const manage = business?.menu.bookPen;
  const execution = business?.menu.rocket;

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
