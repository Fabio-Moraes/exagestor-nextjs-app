'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { FullScreenLoading } from 'components/FullScreenLoading';
import { LineSkaleton } from 'components/LineSkaleton';
import { encryptObject } from 'functions';
import { TimedWait } from 'functions/TimedWait';
import { internalApi } from 'services/apiAxios';

import { useLocalStorage } from 'contexts/localStorage';

import {
  Button,
  ListContainer,
  InputContainer,
  Input,
  SkaletonInput,
  ContainerCounter,
  ErrorContainer
} from './styles';

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

  const { setObservationBox, observationBox, selectMaterial, selectService } =
    useLocalStorage();

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

  function generateConnectingMessage(count: number): string {
    return count > 0 ? `Conectando<br>Tentativa (${count + 1})` : 'Conectando';
  }

  async function fetchConcludedMaterial() {
    if (!requestInProcess) {
      setRequestInProcess(true);
      setConnectionError(false);

      for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
        try {
          setIsPopupValue(generateConnectingMessage(retryCount));

          await internalApi.post('/api/bridge', {
            baseURL: '/api/admin/concluded',
            protocol: serviceData?.protocol,
            employeeId: String(serviceData?.employee_id),
            observation: String(observationBox[serviceData?.protocol]),
            listService: JSON.stringify(selectService[serviceData?.protocol]),
            listMaterial: JSON.stringify(selectMaterial[serviceData?.protocol])
          });

          const encryptSlug = encryptObject({
            protocol: serviceData?.protocol,
            employeeId: serviceData?.employee_id,
            updateCount: serviceData?.update_count + 1
          });

          router.push(`/dashboard/admin/manage/details/${encryptSlug}`);
          break;
        } catch (error: unknown) {
          if (error instanceof Error) {
            const customError = error as CustomError;
            if (customError.response) {
              const statusCode = customError.response.status;
              if (statusCode === 409) {
                await TimedWait(10000);
              } else {
                await TimedWait(3000);
              }

              if (retryCount === maxRetries) {
                setConnectionError(true);
                setIsPopupValue(null);
              }
            }
          }
        }
      }
      setRequestInProcess(false);
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
      console.log('Está no começo da linha');
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
        <ErrorContainer>
          <span>
            Não foi possível carregar os dados da página devido a instabilidade na conexão. Por
            favor, tente novamente.
          </span>
        </ErrorContainer>
      ) : (
        <ListContainer>
          <InputContainer>
            {isLoading || !serviceData?.protocol ? (
              <SkaletonInput>
                <LineSkaleton width="100%" />
                <LineSkaleton width="100%" />
                <LineSkaleton width="65%" />
                <LineSkaleton width="85%" />
                <LineSkaleton width="75%" />
              </SkaletonInput>
            ) : (
              <Input
                ref={textareaRef}
                value={observationBox[serviceData?.protocol] ?? ''}
                onChange={handleDescriptionChange}
                onKeyDown={handleTextareaKeyDown}
                placeholder="Escreva sua descrição aqui..."
                contentEditable="true"
              />
            )}
          </InputContainer>
          <ContainerCounter>
            {isLoading || !serviceData?.protocol ? (
              <LineSkaleton width="3rem" />
            ) : (
              <p>{500 - (observationBox[serviceData?.protocol]?.length ?? 0)}</p>
            )}
          </ContainerCounter>
          <div>
            <Button onClick={() => router.back()}>Voltar</Button>
            <Button onClick={() => fetchConcludedMaterial()}>Concluir</Button>
          </div>
        </ListContainer>
      )}
    </>
  );
}
