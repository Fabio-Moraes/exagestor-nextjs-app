'use client';

import { List } from './_components/List';

import * as S from './styles';

export default function FinishService(/* { params }: SlugType */) {
  return (
    <S.Container>
      <S.Title>
        <h1>Disponibilidade de Serviço</h1>
      </S.Title>
      <List />
    </S.Container>
  );
}
