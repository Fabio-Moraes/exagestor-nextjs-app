import type React from 'react';
import { useCallback, useRef, useState } from 'react';

import { Modal } from './_components/Modal';
import { ProgressBar } from './_components/ProgressBar';
import { HandleLogout } from 'functions/HandleLogout';
import { TimedWait } from 'functions/TimedWait';
import { internalApi } from 'services/apiAxios';

import { v4 as uuidv4 } from 'uuid';

import * as S from './styles';

type SelectedCableData = {
  id: number;
  protocol: string;
  description: string;
  cable_length_meters: number;
  used_length_meters: number;
  created_at: string;
};

interface ListCableProps {
  selectedCable: SelectedCableData[];
}

export function HorizontalList(props: ListCableProps) {
  const [count, setCount] = useState(0);
  const [, /* runningLoad */ setRunningLoad] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { selectedCable } = props;

  const maxRetries = 4;

  const handleCloseDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  async function fetchCableLaying() {
    setRunningLoad(true);
    for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
      try {
        const serviceCableData = selectedCable[Number(selectedCard)];
        const { id, protocol, cable_length_meters, used_length_meters } = serviceCableData;
        const usedLengthMeters = count <= cable_length_meters - used_length_meters ? count : null;

        const data = await internalApi.post('/api/bridge', {
          baseURL: '/api/tec/running/construction/class-l/cable-laying',
          id: id,
          protocol: protocol,
          usedLengthMeters: usedLengthMeters
        });

        console.log(data);
        break;
      } catch (error: unknown) {
        if (error instanceof Error) {
          const customError = error as CustomError;
          if (customError.response) {
            const statusCode = customError.response.status;

            if (statusCode === 403) {
              HandleLogout();
              break;
            }

            if (statusCode === 409) {
              break;
            } else {
              await TimedWait(3000);
            }
          }
        }
      } finally {
        setRunningLoad(false);
      }
    }
  }

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
    const { cable_length_meters, used_length_meters } = selectedCable[Number(selectedCard)];
    const limiter = cable_length_meters - used_length_meters;
    setCount((i) => (i < limiter ? i + 1 : i));
  }, [selectedCard, selectedCable]);

  const handleDecrement = () => {
    setCount((i) => Math.max(0, i - 1));
  };

  const verificationInputChange = useCallback(
    (inputValue: string) => {
      const { cable_length_meters, used_length_meters } = selectedCable[Number(selectedCard)];
      const limiter = cable_length_meters - used_length_meters;

      if (inputValue === '') return 0;
      if (Number(inputValue) > limiter) return limiter;

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
      <S.HorizontalScrollList ref={scrollRef} onMouseDown={handleMouseDown}>
        {selectedCable.map((item, index) => (
          <div key={uuidv4()}>
            <S.TableRow $isSelected={false} onClick={() => handleOpenDialog(index)}>
              <span>
                CABO {item.description} <br />
                {item.cable_length_meters.toLocaleString('pt-BR')}M
              </span>
              <div>
                <div>
                  <span>UTILIZADO</span>
                  <span>{item.used_length_meters.toLocaleString('pt-BR')}M</span>
                </div>
              </div>
              <div>
                <div>
                  <ProgressBar
                    description=""
                    percentage={(item.used_length_meters / item.cable_length_meters) * 100}
                  />
                </div>
              </div>
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
        onCableLaying={() => fetchCableLaying().then(handleCloseDialog)}
      />
    </>
  );
}
