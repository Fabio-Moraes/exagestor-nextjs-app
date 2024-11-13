'use client';

import type React from 'react';
import type { RefObject } from 'react';

import * as S from './styles';

interface ModalProps {
  dialogRef: RefObject<HTMLDialogElement>;
  textCableSelected: string;
  onCableLaying: () => void;
}

export function Modal(props: ModalProps) {
  const { dialogRef, onCableLaying, textCableSelected } = props;

  const handleClickOutsideDialog = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (dialogRef.current) {
      const rect = dialogRef.current.getBoundingClientRect();
      const { clientX, clientY } = event;
      if (clientX < rect.left || clientX > rect.right || clientY < rect.top || clientY > rect.bottom) {
        dialogRef.current.close();
      }
    }
  };

  return (
    <S.Dialog ref={dialogRef} onClick={handleClickOutsideDialog}>
      <span>{textCableSelected}</span>
      <S.ContainerButton>
        <button
          onClick={() => {
            onCableLaying();
          }}
        >
          <p>CANCELAR SELEÇÃO</p>
        </button>
      </S.ContainerButton>
    </S.Dialog>
  );
}
