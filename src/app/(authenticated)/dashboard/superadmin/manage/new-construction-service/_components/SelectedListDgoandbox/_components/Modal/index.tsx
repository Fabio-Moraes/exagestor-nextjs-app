'use client';

import React, { RefObject } from 'react';

import { useNodeName } from '../../../../store/nodeName';
import { useSelectedDgoandboxStore } from '../../../../store/selectedDgoandbox';
import { useSelectedListDgoandbox } from '../../../../store/selectedListDgoandbox';

import * as S from './styles';

interface ModalProps {
  idSelected: number;
  dialogRef: RefObject<HTMLDialogElement>;
  typeDgoandboxSelected: string;
  valueDgoandboxSelected: string;
  onCableLaying: () => void;
}

export function Modal({
  idSelected,
  dialogRef,
  onCableLaying,
  typeDgoandboxSelected,
  valueDgoandboxSelected
}: ModalProps) {
  const { nodeName } = useNodeName();
  const { selectedListDgoandbox, editSelectedListDgoandbox } = useSelectedListDgoandbox();
  const { selectedDgoandbox } = useSelectedDgoandboxStore();

  const handleClickOutsideDialog = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (dialogRef.current) {
      const rect = dialogRef.current.getBoundingClientRect();
      const { clientX, clientY } = event;
      if (clientX < rect.left || clientX > rect.right || clientY < rect.top || clientY > rect.bottom) {
        dialogRef.current.close();
      }
    }
  };

  const inputIndexes = Array.from({ length: Number(valueDgoandboxSelected) }, (_, index) => index + 1);

  const handleInputChange = (index: number, newValue: string) => {
    editSelectedListDgoandbox(String(idSelected), String(index), newValue);
  };

  const node = selectedDgoandbox.filter((item) => item.id === idSelected && item.node === 'defined');

  return (
    <S.Dialog ref={dialogRef} onClick={handleClickOutsideDialog}>
      <span>
        {typeDgoandboxSelected} - {valueDgoandboxSelected}
      </span>
      <div>
        {inputIndexes.map((_, index) => (
          <S.InputContainer key={index}>
            <span>{typeDgoandboxSelected}.</span>
            <span>{node.length > 0 && `${nodeName.toUpperCase()}.`}</span>
            <S.Input
              type="text"
              value={selectedListDgoandbox?.[String(idSelected)]?.[String(index)]?.value || ''}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
          </S.InputContainer>
        ))}
      </div>
      <S.ContainerButton>
        <S.Button onClick={onCableLaying}>
          <p>CANCELAR SELEÇÃO</p>
        </S.Button>
      </S.ContainerButton>
    </S.Dialog>
  );
}
