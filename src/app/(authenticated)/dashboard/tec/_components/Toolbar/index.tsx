'use client';

import { usePathname, useRouter } from 'next/navigation';

import Image from 'components/Vercel/Image';
import Link from 'components/Vercel/Link';

import add from './_assets/svg/add.svg';
import execution from './_assets/svg/execution.svg';
import menu from './_assets/svg/menu.svg';
import report from './_assets/svg/report.svg';

import * as S from './styles';

export function Toolbar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <S.Container>
      <Link href="/dashboard/tec/new" scroll={false}>
        <S.WrapperLink $path={['/dashboard/tec/new', '/'].includes(pathname)}>
          <Image priority loading="eager" src={add} alt="Add" width="25" height="25" />
          <span>
            Novo
            <br />
            Serviço
          </span>
        </S.WrapperLink>
      </Link>

      <Link href="/dashboard/tec/running" scroll={false}>
        <S.WrapperLink $path={['/dashboard/tec/running'].includes(pathname)}>
          <Image priority loading="eager" src={execution} alt="Book" width="25" height="25" />
          <span>
            Em
            <br />
            Execução
          </span>
        </S.WrapperLink>
      </Link>

      <Link href="/dashboard/tec/historic" scroll={false}>
        <S.WrapperLink
          $path={['/dashboard/tec/historic'].includes(pathname)}
          rel="preload"
          onClick={() => router.push(`/dashboard/tec/historic`)}
        >
          <Image priority loading="eager" src={report} alt="Report" width="25" height="25" />
          <span>
            Histórico
            <br />
            Geral
          </span>
        </S.WrapperLink>
      </Link>

      <Link href="/dashboard/tec/stock" scroll={false}>
        <S.WrapperLink $path={['/dashboard/tec/stock'].includes(pathname)}>
          <Image priority loading="eager" src={menu} alt="Menu" width="25" height="25" />
          <span>
            Visualizar
            <br />
            Carga
          </span>
        </S.WrapperLink>
      </Link>
    </S.Container>
  );
}
