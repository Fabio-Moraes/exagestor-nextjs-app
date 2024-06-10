'use client';

import { usePathname } from 'next/navigation';

import Image from 'components/Vercel/Image';
import Link from 'components/Vercel/Link';

import { business } from 'theme/svg/business';

const add = business.menu.addPerson;
const execution = business.menu.rocket;
const menu = business.menu.hamburgerMenu;
const manage = business.menu.bookPen;

import * as S from './styles';

export function Toolbar() {
  const pathname = usePathname();

  return (
    <S.Container>
      <Link href="/dashboard/cop/running" scroll={false}>
        <S.WrapperLink $path={['/dashboard/cop/running'].includes(pathname)}>
          <Image priority loading="eager" src={execution} alt="Book" width="25" height="25" />
          <span>
            Em
            <br />
            Execução
          </span>
        </S.WrapperLink>
      </Link>
      <Link href="/dashboard/cop/manage" scroll={false}>
        <S.WrapperLink $path={['/dashboard/cop/manage'].includes(pathname)}>
          <Image priority loading="eager" src={manage} alt="Report" width="25" height="25" />
          <span>
            Gerenciar <br /> Equipe
          </span>
        </S.WrapperLink>
      </Link>

      <Link href="/" scroll={false}>
        <S.WrapperLink style={{ opacity: 0 }}>
          <Image priority loading="eager" src={menu} alt="Menu" width="25" height="25" />
          <span>
            Mais
            <br />
            Opções
          </span>
        </S.WrapperLink>
      </Link>

      <Link href="/" scroll={false}>
        <S.WrapperLink style={{ opacity: 0 }}>
          <Image priority loading="eager" src={add} alt="Add" width="25" height="25" />
          <span>
            Novo
            <br />
            Registro
          </span>
        </S.WrapperLink>
      </Link>
    </S.Container>
  );
}
