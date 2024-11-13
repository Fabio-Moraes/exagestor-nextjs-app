import type React from 'react';
import { useCallback, useRef, useState } from 'react';

import { Modal } from './_components/Modal';

import { useSelectedCableStore } from '../../store/selectedCable';

import { v4 as uuidv4 } from 'uuid';

import * as S from './styles';

export function HorizontalListCable() {
  const [count, setCount] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { selectedCable, editSelectedCable } = useSelectedCableStore();

  const handleMouseDown = (e: React.MouseEvent) => {
    const startX = e.pageX;
    const scrollLeft = scrollRef.current?.scrollLeft || 0;

    const onMouseMove = (moveEvent: MouseEvent) => {
      if (scrollRef.current) {
        const walk = moveEvent.pageX - startX;
        scrollRef.current.scrollLeft = scrollLeft - walk;
        setIsDragging(true);
      }
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      scrollRef.current?.classList.remove('dragging');
      setIsDragging(false);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    scrollRef.current?.classList.add('dragging');
  };

  const handleOpenDialog = (index: number) => {
    if (isDragging) return;
    setSelectedCard(index);
    setCount(0);
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const handleIncrement = useCallback(() => {
    const limiter = 500000;
    setCount((i) => (i < limiter ? i + 1 : i));
  }, [selectedCard, selectedCable]);

  const handleDecrement = () => {
    setCount((i) => Math.max(0, i - 1));
  };

  const verificationInputChange = useCallback(
    (inputValue: string) => {
      if (inputValue === '') return 0;
      if (Number(inputValue) > 500000) return 500000;

      return Number.parseInt(inputValue, 10);
    },
    [selectedCard, selectedCable]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value.replace(/\./g, '');

      if (/^\d*$/.test(inputValue)) {
        setCount(verificationInputChange(inputValue));
      } else {
        console.error('Por favor, insira apenas números inteiros ou zero.');
      }
    },
    [verificationInputChange]
  );

  return (
    <>
      <S.ListTitle>CABOS</S.ListTitle>
      <S.HorizontalScrollList ref={scrollRef} onMouseDown={handleMouseDown}>
        {selectedCable.map((item, index) => (
          <div key={uuidv4()}>
            <S.TableRow
              $isSelected={Boolean(Number(item?.cable_length_meters) > 0)}
              onClick={() => handleOpenDialog(index)}
            >
              <span>
                {item.description} <br />
                {item.cable_length_meters
                  ? item.cable_length_meters?.toLocaleString('pt-BR').concat('M')
                  : '----'}
              </span>
            </S.TableRow>
          </div>
        ))}
      </S.HorizontalScrollList>
      <Modal
        dialogRef={dialogRef}
        count={count}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onChange={handleInputChange}
        onCableLaying={() => {
          editSelectedCable(selectedCable[selectedCard!].id, count);
          if (dialogRef.current) dialogRef.current.close();
        }}
      />
    </>
  );
}
