'use client';

import { usePathname } from 'next/navigation';

import Image from 'components/Vercel/Image';
import Link from 'components/Vercel/Link';

import { business } from 'theme/svg/business';

import * as S from './styles';

const add = business.menu.addPerson;
const execution = business.menu.rocket;
const menu = business.menu.hamburgerMenu;
const report = business.menu.bookPen;

export function LeftSidebar() {
  const pathname = usePathname();
  const proportion = { width: 25, height: 25 };

  return (
    <S.Container>
      <S.Wrapper>
        <Link href="/dashboard/tec/new" scroll={false}>
          <S.WrapperLink $path={['/dashboard/tec/new', '/'].includes(pathname)}>
            <Image priority loading="eager" src={add} alt="Add" {...proportion} />
            <span>Novo Serviço</span>
          </S.WrapperLink>
        </Link>

        <Link href="/dashboard/tec/running" scroll={false}>
          <S.WrapperLink $path={['/dashboard/tec/running'].includes(pathname)}>
            <Image priority loading="eager" src={execution} alt="Book" {...proportion} />
            <span>Em Execução</span>
          </S.WrapperLink>
        </Link>

        <Link href="/dashboard/tec/historic" scroll={false}>
          <S.WrapperLink $path={['/dashboard/tec/historic'].includes(pathname)}>
            <Image priority loading="eager" src={report} alt="Report" {...proportion} />
            <span>Histórico Geral</span>
          </S.WrapperLink>
        </Link>

        <Link href="/dashboard/tec/stock" scroll={false}>
          <S.WrapperLink $path={['/dashboard/tec/stock'].includes(pathname)}>
            <Image priority loading="eager" src={menu} alt="Clipboard" {...proportion} />
            <span>Visualizar Carga</span>
          </S.WrapperLink>
        </Link>
      </S.Wrapper>
    </S.Container>
  );
}
