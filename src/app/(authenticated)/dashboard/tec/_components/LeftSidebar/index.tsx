'use client';

import { usePathname } from 'next/navigation';

import Image from 'components/Vercel/Image';
import Link from 'components/Vercel/Link';

import add from './_assets/svg/add.svg';
import execution from './_assets/svg/execution.svg';
import menu from './_assets/svg/menu.svg';
import report from './_assets/svg/report.svg';

import * as S from './styles';

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
