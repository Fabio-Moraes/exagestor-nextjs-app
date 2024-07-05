'use client';

import { useState } from 'react';

import { RegisterEmployee } from './_components/RegisterEmployee';
import { RegisterService } from './_components/RegisterService';

import * as S from './styles';

export default function NewRegister() {
  const [selectRegister, setSelectRegister] = useState('employee');
  return (
    <S.Container>
      <S.Title>Novo Registro</S.Title>
      <S.BoxButton>
        <S.CheckboxButton
          type="button"
          $checked={selectRegister === 'employee'}
          onClick={() => {
            setSelectRegister('employee');
          }}
        >
          <div />
          <span>Novo Funcionário</span>
        </S.CheckboxButton>

        <S.CheckboxButton
          type="button"
          $checked={selectRegister === 'service'}
          onClick={() => {
            setSelectRegister('service');
          }}
        >
          <div />
          <span>Novo Serviço</span>
        </S.CheckboxButton>
      </S.BoxButton>
      {selectRegister === 'employee' ? <RegisterEmployee /> : <RegisterService />}
    </S.Container>
  );
}
