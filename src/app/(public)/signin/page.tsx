import { Form } from './_components/Form';

import * as S from './styles';

export default function SignIn() {
  return (
    <S.Container>
      <S.Wrapper>
        <S.Main>
          <div>
            <Form />
          </div>
        </S.Main>
      </S.Wrapper>
    </S.Container>
  );
}
