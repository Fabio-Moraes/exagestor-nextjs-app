import type React from 'react';
import { useCallback, useRef, useState } from 'react';

import { Modal } from './_components/Modal';
import { ProgressBar } from './_components/ProgressBar';
import { HandleLogout } from 'functions/HandleLogout';
import { TimedWait } from 'functions/TimedWait';
import { internalApi } from 'services/apiAxios';

import { v4 as uuidv4 } from 'uuid';

import * as S from './styles';

type ServiceCableData = {
  id: number;
  protocol: string;
  description: string;
  cable_length_meters: number;
  adequacy_length_meters: number;
  created_at: string;
};

interface ListCableProps {
  serviceCable: ServiceCableData[];
}

const formatDate = (date: string) => {
  const now = new Date(date);
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

export function ListServiceCable(props: ListCableProps) {
  const [count, setCount] = useState(0);
  const [, /* runningLoad */ setRunningLoad] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { serviceCable } = props;

  const maxRetries = 4;

  async function fetchCableLaying() {
    setRunningLoad(true);

    for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
      try {
        const serviceCableData = serviceCable[Number(selectedCard)];
        const { id, protocol, cable_length_meters, adequacy_length_meters } = serviceCableData;
        const adequacyLengthMeters =
          count <= cable_length_meters - adequacy_length_meters ? count : null;

        const data = await internalApi.post('/api/bridge', {
          baseURL: '/api/tec/running/construction/class-l/cable-adequacy',
          id: id,
          protocol: protocol,
          adequacyLengthMeters: adequacyLengthMeters
        });

        if (dialogRef.current) dialogRef.current.close();
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
    const startY = e.pageY;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const walk = moveEvent.pageY - startY;
      if (Math.abs(walk) > 5) {
        // Se o movimento for maior que 5px, considere como arrasto
        setIsDragging(true);
      }
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      setIsDragging(false);

      scrollRef.current?.classList.remove('dragging');
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
    const serviceCableData = serviceCable[Number(selectedCard)];
    const { cable_length_meters, adequacy_length_meters } = serviceCableData;
    const limiter = cable_length_meters - adequacy_length_meters;
    setCount((i) => (i < limiter ? i + 1 : i));
  }, [selectedCard, serviceCable]);

  const handleDecrement = () => {
    setCount((i) => Math.max(0, i - 1));
  };

  const verificationInputChange = useCallback(
    (inputValue: string) => {
      const { cable_length_meters, adequacy_length_meters } = serviceCable[Number(selectedCard)];
      const limiter = cable_length_meters - adequacy_length_meters;

      if (inputValue === '') return 0;
      if (Number(inputValue) > limiter) return limiter;

      return Number.parseInt(inputValue, 10);
    },
    [selectedCard, serviceCable]
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
      <div ref={scrollRef} onMouseDown={handleMouseDown}>
        {serviceCable &&
          serviceCable.map((item, index) => (
            <div key={uuidv4()}>
              <S.TableRow $isSelected={false} onClick={() => handleOpenDialog(index)} key={uuidv4()}>
                <span>CABO {item.description}</span>

                <div>
                  <div>
                    <span>LANÇAMENTO</span>
                  </div>
                  <div>
                    <span>{item.cable_length_meters.toLocaleString('pt-BR')}M</span>
                  </div>
                </div>
                <div>
                  <div>
                    <span>ADEQUAÇÃO</span>
                  </div>
                  <div>
                    <span>{item.adequacy_length_meters.toLocaleString('pt-BR')}M</span>
                  </div>
                </div>
                <div>
                  <div>
                    <ProgressBar
                      description=""
                      percentage={(item.adequacy_length_meters / item.cable_length_meters) * 100}
                    />
                  </div>
                </div>

                <span>inicio {formatDate(item.created_at)}</span>
              </S.TableRow>
            </div>
          ))}
      </div>
      <Modal
        dialogRef={dialogRef}
        count={count}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onChange={handleInputChange}
        onCableLaying={fetchCableLaying}
      />
    </>
  );
}
