'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';

import { FullScreenLoading } from 'components/FullScreenLoading';
import { Modal } from 'components/Modal';
import { TimedWait } from 'functions/TimedWait';
import apiRoute from 'services/apiRoute';

import alertSvg from './_assets/svg/alert.svg';
import checkedSvg from './_assets/svg/checked.svg';

import {
  Button,
  CheckboxButton,
  Container,
  FormContainer,
  Input,
  Title,
  Observation,
  ContainerObservation,
  ContainerCounter,
  Asterisk
} from './styles';

export default function NewRegister() {
  const [productCode, setProductCode] = useState('');
  const [productBatch, setProductBatch] = useState('');
  const [quantityValue, setQuantityValue] = useState('');
  const [unitType, setUnitType] = useState('UNID');

  const [observationBox, setObservationBox] = useState<string | null>(null);

  const productName = useRef<HTMLInputElement | null>(null);

  const [modalValue, setModalValue] = useState('');
  const [iconSvgModal, setIconSvgModal] = useState('');
  const [isPopupValue, setIsPopupValue] = useState('');

  const [successfullyCompleted, setSuccessfullyCompleted] = useState(false);

  const router = useRouter();

  const handleClickOutside = () => {
    if (modalValue !== '') {
      !isPopupValue && setModalValue('');
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });

  function generateConnectingMessage(count: number): string {
    return count > 0 ? `Conectando<br>Tentativa (${count + 1})` : 'Conectando';
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!successfullyCompleted) {
      setIconSvgModal(iconSvgModal);

      if (!productName.current?.value || productName.current?.value.trim() === '') {
        setModalValue('Informe o nome do produto.');
        return;
      }

      if (quantityValue.trim() === '') {
        setModalValue('Informe a quantidade');
        return;
      }

      if (productCode.trim() === '') {
        setModalValue('Informe o código do produto');
        return;
      }

      const maxRetries = 4;

      for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
        try {
          setIsPopupValue(generateConnectingMessage(retryCount));

          const response = await apiRoute.post('/api/bridge', {
            baseURL: '/api/almox/register',
            productName: productName.current?.value,
            productCode: productCode,
            productBatch: productBatch || null,
            quantityValue: quantityValue,
            unitType: unitType,
            observation: observationBox || null
          });

          const { status } = response.data;

          if (status === 'already registered') {
            setIsPopupValue('');
            setIconSvgModal(alertSvg);
            setModalValue(`Produto já existente.`);
            return;
          }

          if (status === 'success') {
            setSuccessfullyCompleted(true);
            setIsPopupValue('');
            setIconSvgModal(checkedSvg);
            setModalValue('Novo produto registrado com sucesso.');
            await TimedWait(1000);
            router.push('/dashboard/almox/stock');
            return;
          }
        } catch (error: unknown) {
          if (error instanceof Error) {
            const customError = error as CustomError;
            if (customError.response) {
              const statusCode = customError.response.status;
              if (statusCode === 409) {
                break;
              }

              if (retryCount === maxRetries) {
                setIconSvgModal(alertSvg);
                setModalValue('Não foi possível registrar o produto após várias tentativas.');
                setIsPopupValue('');
              } else {
                await TimedWait(3000);
              }
            }
          }
        }
      }
    }
  };

  const handleQuantityValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    if (/^\d*$/.test(inputValue) && inputValue.length <= 8) {
      setQuantityValue(String(inputValue === '' ? 0 : parseInt(inputValue, 10)));
    }
  };

  const handleProductCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    if (/^\d*$/.test(inputValue) && inputValue.length <= 8) {
      setProductCode(String(inputValue === '' ? 0 : parseInt(inputValue, 10)));
    }
  };

  const handleProductBatch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.replace(/\s/g, '');

    if (inputValue.length <= 10) setProductBatch(inputValue);
  };

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
  };

  return (
    <Container>
      <Title>Novo Produto</Title>
      <FormContainer onSubmit={handleSubmit}>
        <label htmlFor="Nome do Produto">
          Nome do Produto: <Asterisk>*</Asterisk>
        </label>
        <Input type="text" id="Nome" placeholder="Nome do Produto" ref={productName} />

        <label htmlFor="Lote">Lote:</label>
        <Input
          type="text"
          id="Nome"
          placeholder="Lote"
          value={productBatch}
          onChange={handleProductBatch}
        />

        <label htmlFor="Código">
          Código: <Asterisk>*</Asterisk>
        </label>
        <Input
          type="text"
          id="Nome"
          placeholder="Código"
          value={productCode}
          onChange={handleProductCode}
        />

        <label htmlFor="Quantidade">
          Quantidade: <Asterisk>*</Asterisk>
        </label>
        <Input
          type="text"
          placeholder="Quantidade"
          value={quantityValue !== '0' ? quantityValue : ''}
          onChange={handleQuantityValue}
        />

        <div>
          <CheckboxButton
            type="button"
            $checked={unitType === 'UNID'}
            onClick={() => {
              setUnitType('UNID');
            }}
          >
            <div />
            <span>Und.</span>
          </CheckboxButton>

          <CheckboxButton
            type="button"
            $checked={unitType === 'CX'}
            onClick={() => {
              setUnitType('CX');
            }}
          >
            <div />
            <span>Cx.</span>
          </CheckboxButton>

          <CheckboxButton
            type="button"
            $checked={unitType === 'METRO'}
            onClick={() => {
              setUnitType('METRO');
            }}
          >
            <div />
            <span>Metro</span>
          </CheckboxButton>
        </div>
        <ContainerObservation>
          <Observation
            ref={textareaRef}
            value={observationBox ?? ''}
            onChange={handleDescriptionChange}
            onKeyDown={handleTextareaKeyDown}
            placeholder="Escreva sua descrição aqui..."
            contentEditable="true"
          />
          <ContainerCounter>
            <p>{500 - (observationBox?.length ?? 0)}</p>
          </ContainerCounter>
        </ContainerObservation>
        <Button type="submit">Registrar</Button>
        <span>
          Todos os campos marcados com <Asterisk>*</Asterisk> são obrigatórios.
        </span>
      </FormContainer>

      {modalValue && !isPopupValue && <Modal icon={iconSvgModal} message={modalValue} />}
      {isPopupValue && <FullScreenLoading message={isPopupValue} />}
    </Container>
  );
}
