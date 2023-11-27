'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { LineSkaleton } from 'components/LineSkaleton';

import {
  Button,
  ListContainer,
  InputContainer,
  Input,
  SkaletonInput,
  ContainerCounter
} from './styles';

import { useContexState } from 'hooks/useGlobalContext';
import Cookie from 'js-cookie';
import api from 'lib/api';

interface Service {
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

export function TextBox({ service }: { service: Service }) {
  /* eslint-disable */
  const [connectionError, setConnectionError] = useState(false);
  const [isPopupValue, setIsPopupValue] = useState<string | null>(null);

  const [description, setDescription] = useState('');
  /* eslint-enable */

  const [isLoading, setIsLoading] = useState(true);

  const { setObservationBox, observationBox } = useContexState();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const storedCookie = Cookie.get('auth_token');
  const maxRetries = 4;

  const router = useRouter();

  async function fetchConcludedMaterial() {
    setConnectionError(false);

    for (let count = 0; count < maxRetries; count++) {
      try {
        setIsPopupValue(count > 0 ? `Conectando<br>Tentativa (${count + 1})` : 'Conectando');

        const response = await api.get('/api/admin/concluded', {
          params: {
            token: storedCookie,
            protocol: service?.protocol,
            employeeId: service?.employee_id,
            serviceIds: JSON.stringify('selectedItems'),
            observation: String(observationBox[service?.protocol])
          }
        });

        count = maxRetries;
        router.push('/dashboard/admin/running');
        console.log(response.data);
      } catch (error) {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        setConnectionError(true);
      }
    }
    setIsPopupValue(null);
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
          [service?.protocol]: removeCharactersByIndex()
        };
      });
    } else {
      setObservationBox((prevItems) => {
        return {
          ...prevItems,
          [service?.protocol]: textInput.slice(0, 500)
        };
      });
    }
  };

  const moveCursor = () => {
    const cursorPosition = textareaRef.current?.selectionStart ?? 0;
    if (textareaRef.current) {
      setTimeout(() => {
        textareaRef.current?.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
        textareaRef.current?.focus(); // Foca no elemento para que o cursor seja movido
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
          [service?.protocol]: `${part1}\n${part2}`.slice(0, 500)
        };
      });
      moveCursor();
    }
  };

  return (
    <ListContainer>
      <InputContainer>
        {isLoading || !service?.protocol ? (
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
            value={observationBox[service?.protocol] ?? ''}
            onChange={handleDescriptionChange}
            onKeyDown={handleTextareaKeyDown}
            placeholder="Escreva sua descrição aqui..."
            contentEditable="true"
          />
        )}
      </InputContainer>
      <ContainerCounter>
        {isLoading || !service?.protocol ? (
          <LineSkaleton width="30px" />
        ) : (
          <p>{500 - (observationBox[service?.protocol]?.length ?? 0)}</p>
        )}
      </ContainerCounter>
      <div>
        <Button onClick={() => router.back()}>Voltar</Button>
        <Button onClick={() => fetchConcludedMaterial()}>Concluir</Button>
      </div>
    </ListContainer>
  );
}
