'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { FullScreenLoading } from 'components/FullScreenLoading';
import { LineSkaleton } from 'components/LineSkaleton';
import { encryptObject } from 'functions';
import { HandleLogout } from 'functions/HandleLogout';
import { TimedWait } from 'functions/TimedWait';
import { internalApi } from 'services/apiAxios';

import { useLocalStorage } from 'contexts/localStorage';

import * as S from './styles';

interface ServiceData {
  id: number;
  employee_id: number;
  client_name: string;
  city: string;
  address: string;
  nomenclature: string;
  classification: string;
  status: string;
  update_count: number;
  created_at: string;
  protocol: string;
}

export function TextBox({ serviceData }: { serviceData: ServiceData }) {
  const [connectionError, setConnectionError] = useState(false);
  const [isPopupValue, setIsPopupValue] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [requestInProcess, setRequestInProcess] = useState(false);

  const { setObservationBox, observationBox, selectMaterial, selectService } = useLocalStorage();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const maxRetries = 4;
  const router = useRouter();

  async function fetchConcludedMaterial() {
    if (!requestInProcess) {
      setRequestInProcess(true);
      setConnectionError(false);

      for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
        try {
          await internalApi.post('/api/bridge', {
            baseURL: '/api/tec/running/finish/concluded',
            protocol: serviceData?.protocol,
            serviceIds: JSON.stringify('selectedItems'),
            observation: String(observationBox[serviceData?.protocol]) ?? '',
            listService: JSON.stringify(selectService[serviceData?.protocol]),
            listMaterial: JSON.stringify(selectMaterial[serviceData?.protocol])
          });

          const encryptSlug = encryptObject({
            protocol: serviceData?.protocol,
            employeeId: serviceData?.employee_id,
            updateCount: serviceData?.update_count + 1
          });

          router.push(`/dashboard/tec/historic/details/${encryptSlug}`, { scroll: false });
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
                await TimedWait(10000);
              }

              if (retryCount === maxRetries) {
                setConnectionError(true);
                setIsPopupValue(null);
              } else {
                await TimedWait(3000);
              }
            }
          }
        }
      }

      setRequestInProcess(false);
      setIsPopupValue(null);
    }
  }

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function removeCharactersByIndex() {
    const cursorPosition = textareaRef.current?.selectionStart ?? 0;
    const textInput = textareaRef.current?.value ?? '';

    if (cursorPosition >= 0 && cursorPosition - 1 >= 0) {
      const part1 = textInput.slice(0, cursorPosition - 1);
      const part2 = textInput.slice(cursorPosition);
      return part1 + part2;
    }

    return '';
  }

  const handleCursorPosition = () => {
    const cursorPosition = textareaRef.current?.selectionStart ?? 0;
    const textBeforeCursor = textareaRef.current?.value.substring(0, cursorPosition) ?? '';

    const lineNumber = textBeforeCursor.split('\n').length - 1;
    const columnNumber = Number(textBeforeCursor.split('\n').pop()?.length) + 1;
    return { lineNumber, columnNumber };
  };

  const handleDescriptionChange = () => {
    const textInput = textareaRef.current?.value ?? '';

    if (handleCursorPosition()?.columnNumber === 0) {
      //Está no começo da linha
      setObservationBox((prevItems) => {
        return {
          ...prevItems,
          [serviceData?.protocol]: removeCharactersByIndex()
        };
      });
    } else {
      setObservationBox((prevItems) => {
        return {
          ...prevItems,
          [serviceData?.protocol]: textInput.slice(0, 500)
        };
      });
    }
  };

  const moveCursor = () => {
    const cursorPosition = textareaRef.current?.selectionStart ?? 0;
    if (textareaRef.current) {
      setTimeout(() => {
        textareaRef.current?.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
        textareaRef.current?.focus();
      }, 0);
    }
  };

  const handleTextareaKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const cursorPosition = textareaRef.current?.selectionStart ?? 0;
    const textInput = textareaRef.current?.value ?? '';

    const part1 = textInput.slice(0, cursorPosition);
    const part2 = textInput.slice(cursorPosition);

    if (event.key === 'Enter') {
      event.preventDefault();
      setObservationBox((prevItems) => {
        return {
          ...prevItems,
          [serviceData?.protocol]: `${part1}\n${part2}`.slice(0, 500)
        };
      });
      moveCursor();
    }
  };

  return (
    <>
      {isPopupValue && <FullScreenLoading message={isPopupValue} />}
      {connectionError ? (
        <S.ErrorContainer>
          <span>
            Não foi possível carregar os dados da página devido a instabilidade na conexão. Por favor,
            tente novamente.
          </span>
        </S.ErrorContainer>
      ) : (
        <S.ListContainer>
          <S.InputContainer>
            {isLoading || !serviceData?.protocol ? (
              <S.SkaletonInput>
                <LineSkaleton width="100%" />
                <LineSkaleton width="100%" />
                <LineSkaleton width="65%" />
                <LineSkaleton width="85%" />
                <LineSkaleton width="75%" />
              </S.SkaletonInput>
            ) : (
              <S.Input
                ref={textareaRef}
                value={observationBox[serviceData?.protocol] ?? ''}
                onChange={handleDescriptionChange}
                onKeyDown={handleTextareaKeyDown}
                placeholder="Escreva sua descrição aqui..."
                contentEditable="true"
              />
            )}
          </S.InputContainer>
          <S.ContainerCounter>
            {isLoading || !serviceData?.protocol ? (
              <LineSkaleton width="3rem" />
            ) : (
              <p>{500 - (observationBox[serviceData?.protocol]?.length ?? 0)}</p>
            )}
          </S.ContainerCounter>
          <div>
            <S.Button onClick={() => router.back()}>Voltar</S.Button>
            <S.Button onClick={() => fetchConcludedMaterial()}>Concluir</S.Button>
          </div>
        </S.ListContainer>
      )}
    </>
  );
}
