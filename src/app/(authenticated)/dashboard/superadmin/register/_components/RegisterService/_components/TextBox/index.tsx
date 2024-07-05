'use client';

import { useRef, useState } from 'react';

import { ListContainer, InputContainer, Input, ContainerCounter } from './styles';

export function TextBox({ onValue }: { onValue: (i: string) => void }) {
  const [observationBox, setObservationBox] = useState<string>('');

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
      setObservationBox(removeCharactersByIndex());
    } else {
      setObservationBox(textInput.slice(0, 500));
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
      setObservationBox(`${part1}\n${part2}`.slice(0, 500));
      moveCursor();
    }

    onValue(`${part1}\n${part2}`.slice(0, 500));
  };

  return (
    <>
      <ListContainer>
        <InputContainer>
          <Input
            ref={textareaRef}
            value={observationBox ?? ''}
            onChange={handleDescriptionChange}
            onKeyDown={handleTextareaKeyDown}
            placeholder="Descreva o serviço aqui..."
            contentEditable="true"
          />
        </InputContainer>
        <ContainerCounter>
          <p>{500 - (observationBox?.length ?? 0)}</p>
        </ContainerCounter>
        <div />
      </ListContainer>
    </>
  );
}
