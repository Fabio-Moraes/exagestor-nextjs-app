'use client';

import { usePathname } from 'next/navigation';

import Image from 'components/Vercel/Image';
import Link from 'components/Vercel/Link';

import { business } from 'theme/svg/business';

import * as S from './styles';

const add = business.menu.addPerson;
const execution = business.menu.rocket;
const manage = business.menu.bookPen;
const menu = business.menu.hamburgerMenu;

export function Toolbar() {
  const pathname = usePathname();

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

      <Link href="/" scroll={false}>
        <S.WrapperLink style={{ opacity: 0 }} rel="preload">
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
