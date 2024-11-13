'use client';

import { usePathname } from 'next/navigation';

import Image from 'components/Vercel/Image';
import Link from 'components/Vercel/Link';

import { getCurrentBusinessTheme } from 'themes/svg/business';

import * as S from './styles';

export function LeftSidebar() {
  const pathname = usePathname();
  const business = getCurrentBusinessTheme();

  const execution = business?.menu.rocket;

  return (
    <S.Container>
      <S.Wrapper>
        <Link href="/dashboard/config/theme" scroll={false}>
          <S.WrapperLink $path={['/dashboard/config/theme'].includes(pathname)}>
            <Image priority loading="eager" src={execution} alt="Book" width="25" height="25" />
            <span>Gerenciar Sistema</span>
          </S.WrapperLink>
        </Link>
        <Link href="/dashboard/config/upload" scroll={false}>
          <S.WrapperLink $path={['/dashboard/config/upload'].includes(pathname)}>
            <Image priority loading="eager" src={execution} alt="Book" width="25" height="25" />
            <span>Upload Teste</span>
          </S.WrapperLink>
        </Link>
      </S.Wrapper>
    </S.Container>
  );
}
