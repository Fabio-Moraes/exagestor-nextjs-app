import Image from 'components/Vercel/Image';

import * as S from './styles';

type Props = { message: string; icon: null | string };

export function Modal({ message = '', icon = null }: Props) {
  return (
    <S.Container>
      {icon && <Image priority src={icon} alt="Book" width={55} height={55} />}
      <span dangerouslySetInnerHTML={{ __html: message }} />
    </S.Container>
  );
}
