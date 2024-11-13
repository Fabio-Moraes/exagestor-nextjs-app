'use client';

import type React from 'react';
import type { RefObject } from 'react';

import * as S from './styles';

interface ModalProps {
  dialogRef: RefObject<HTMLDialogElement>;
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCableLaying: () => void;
}

export function Modal(props: ModalProps) {
  const { dialogRef, count, onIncrement, onDecrement, onChange, onCableLaying } = props;

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
      <div>
        <S.IncrementButton onClick={onIncrement}>+</S.IncrementButton>
        <S.SearchBar type="text" value={String(count.toLocaleString('pt-BR'))} onChange={onChange} />
        <S.DecrementButton onClick={onDecrement}>-</S.DecrementButton>
      </div>
      <button
        style={{ opacity: count > 0 ? 1 : 0.3 }}
        onClick={() => {
          count > 0 && onCableLaying();
        }}
      >
        <p>CABO LANÇADO</p>
      </button>
    </S.Dialog>
  );
}
