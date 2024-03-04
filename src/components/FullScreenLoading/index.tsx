import { Spinner } from './_components/Spinner';

import { Container, Wrapper } from './styles';

export function FullScreenLoading({ message = '' }: { message?: string }) {
  return (
    <Container>
      <Wrapper>
        <Spinner />
        <span dangerouslySetInnerHTML={{ __html: message }} />
      </Wrapper>
    </Container>
  );
}
