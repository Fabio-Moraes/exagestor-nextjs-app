import { DisconnectEverything } from './_components/DisconnectEverything';
import { SelectTheme } from './_components/SelectTheme';

import * as S from './styles';

export default function Settings() {
  return (
    <S.Container>
      <S.Title>Gerenciar Sistema</S.Title>
      <S.ContainerButton>
        <SelectTheme />
        <DisconnectEverything />
        <S.BoxButton></S.BoxButton>
        <S.BoxButton></S.BoxButton>
        <S.BoxButton></S.BoxButton>
      </S.ContainerButton>
    </S.Container>
  );
}
