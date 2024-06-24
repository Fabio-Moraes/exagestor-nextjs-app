import { Spinner } from './_components/Spinner';

import * as S from './styles';

export function FullScreenLoading({ message = '' }: { message?: string }) {
  return (
    <S.Container>
      <S.Wrapper>
        <Spinner />
        <span dangerouslySetInnerHTML={{ __html: message }} />
      </S.Wrapper>
    </S.Container>
  );
}
