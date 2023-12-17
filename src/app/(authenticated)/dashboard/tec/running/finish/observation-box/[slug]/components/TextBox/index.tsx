'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { LineSkaleton } from 'components/LineSkaleton';
import { useContexState } from 'hooks/useGlobalContext';

import Cookie from 'js-cookie';
import api from 'lib/api';

import {
  Button,
  ListContainer,
  InputContainer,
  Input,
  SkaletonInput,
  ContainerCounter
} from './styles';

interface ServiceData {
  id: number;
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

        const response = await api.get('/api/tec/concluded', {
          params: {
            token: storedCookie,
            protocol: serviceData?.protocol,
            serviceIds: JSON.stringify('selectedItems'),
            observation: String(observationBox[serviceData?.protocol])
          }
        });

        count = maxRetries;
        router.push('/dashboard/tec/new');
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
          [serviceData?.protocol]: `${part1}\n${part2}`.slice(0, 500)
        };
      });
      moveCursor();
    }
  };

  return (
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
          <LineSkaleton width="30px" />
        ) : (
          <p>{500 - (observationBox[serviceData?.protocol]?.length ?? 0)}</p>
        )}
      </ContainerCounter>
      <div>
        <Button onClick={() => router.back()}>Voltar</Button>
        <Button onClick={() => fetchConcludedMaterial()}>Concluir</Button>
      </div>
    </ListContainer>
  );
}
