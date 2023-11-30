import Image from 'components/Vercel/Image';

import { Container } from './styles';

type Props = { message: string; icon: null | string };

export function Modal({ message = '', icon = null }: Props) {
  return (
    <Container>
      {icon && <Image priority src={icon} alt="Book" width={55} height={55} />}
      <span dangerouslySetInnerHTML={{ __html: message }} />
    </Container>
  );
}
