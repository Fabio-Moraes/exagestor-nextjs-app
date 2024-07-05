'use client';

import { usePathname } from 'next/navigation';

import Image from 'components/Vercel/Image';
import Link from 'components/Vercel/Link';

import { business } from 'theme/svg/business';

import * as S from './styles';

const add = business.menu.addPerson;
const execution = business.menu.rocket;
const graph = business.menu.pitzChart;
const manage = business.menu.bookPen;

export function LeftSidebar() {
  const pathname = usePathname();

  return (
    <S.Container>
      <S.Wrapper>
        <Link href="/dashboard/superadmin/monitor" scroll={false}>
          <S.WrapperLink $path={['/dashboard/superadmin/monitor'].includes(pathname)}>
            <Image priority loading="eager" src={graph} alt="Menu" width="25" height="25" />
            <span>Monitor Geral</span>
          </S.WrapperLink>
        </Link>

        <Link href="/dashboard/superadmin/running" scroll={false}>
          <S.WrapperLink $path={['/dashboard/superadmin/running'].includes(pathname)}>
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

        <Link href="/dashboard/superadmin/register" scroll={false}>
          <S.WrapperLink $path={['/dashboard/superadmin/register', '/'].includes(pathname)}>
            <Image priority loading="eager" src={add} alt="Add" width="25" height="25" />
            <span>Novo Registro</span>
          </S.WrapperLink>
        </Link>

        <Link href="/dashboard/superadmin/manage" scroll={false}>
          <S.WrapperLink $path={['/dashboard/superadmin/manage'].includes(pathname)}>
            <Image priority loading="eager" src={manage} alt="Report" width="25" height="25" />
            <span>Gerenciar Sistema</span>
          </S.WrapperLink>
        </Link>
      </S.Wrapper>
    </S.Container>
  );
}
