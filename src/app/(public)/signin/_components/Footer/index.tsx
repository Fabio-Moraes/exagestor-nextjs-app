import Image from 'components/Vercel/Image';

import code from './_assets/svg/code.svg';
import coffee from './_assets/svg/coffee.svg';

import * as S from './styles';

export function Footer() {
  return (
    <S.Container>
      <div>
        <h1>Construído com</h1>
        <Image priority src={coffee} alt="Coffee" width={22} height={25} />
        <h1>e</h1>
        <Image priority src={code} alt="Code" width={20} height={20} />
        <h1>por Fabio Moraes</h1>
      </div>
      <span>TODOS OS DIREITOS RESERVADOS.</span>
    </S.Container>
  );
}
