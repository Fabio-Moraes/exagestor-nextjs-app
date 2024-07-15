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
  const manage = business?.menu.bookPen;
  const inCirculation = business?.menu.bringBackward;

  return (
    <S.Container>
      <Link href="/dashboard/almox/stock" scroll={false}>
        <S.WrapperLink $path={['/dashboard/almox/stock'].includes(pathname)}>
          <Image priority loading="eager" src={execution} alt="Book" width="25" height="25" />
          <span>
            Gerenciar
            <br />
            Estoque
          </span>
        </S.WrapperLink>
      </Link>

      <Link href="/dashboard/almox/stock-view" scroll={false}>
        <S.WrapperLink $path={['/dashboard/almox/stock-view'].includes(pathname)}>
          <Image
            priority
            loading="eager"
            src={inCirculation}
            alt="Book"
            width="25"
            height="25"
          />
          <span>
            Visualizar
            <br />
            Materiais
          </span>
        </S.WrapperLink>
      </Link>

      <Link href="/dashboard/almox/register" scroll={false}>
        <S.WrapperLink $path={['/dashboard/almox/register', '/'].includes(pathname)}>
          <Image priority loading="eager" src={add} alt="Add" width="25" height="25" />
          <span>
            Novo
            <br />
            Produto
          </span>
        </S.WrapperLink>
      </Link>

      <Link href="/dashboard/almox/manage" scroll={false}>
        <S.WrapperLink $path={['/dashboard/admin/manage'].includes(pathname)}>
          <Image priority loading="eager" src={manage} alt="Report" width="25" height="25" />
          <span>
            Gerenciar <br /> Equipe
          </span>
        </S.WrapperLink>
      </Link>
    </S.Container>
  );
}
