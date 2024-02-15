'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';

import { FullScreenLoading } from 'components/FullScreenLoading';
import { Modal } from 'components/Modal';
import apiRoute from 'services/apiRoute';

import alertSvg from './assets/svg/alert.svg';
import checkedSvg from './assets/svg/checked.svg';

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
  //const [productName, setProductName] = useState('');
  const [productCode, setProductCode] = useState('');
  const [productBatch, setProductBatch] = useState('');
  const [quantityValue, setQuantityValue] = useState('');
  const [unitType, setUnitType] = useState('UNID');

  const [observationBox, setObservationBox] = useState<string | null>(null);

  const productName = useRef<HTMLInputElement | null>(null);

  const [modalValue, setModalValue] = useState('');
  const [iconSvgModal, setIconSvgModal] = useState('');
  const [fullScreenLoadingValue, setFullScreenLoadingValue] = useState('');

  const [successfullyCompleted, setSuccessfullyCompleted] = useState(false);

  const router = useRouter();

  const handleClickOutside = () => {
    if (modalValue !== '') {
      !fullScreenLoadingValue && setModalValue('');
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });

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

      const sleep = async (ms: number): Promise<void> => {
        return new Promise((resolve) => setTimeout(resolve, ms));
      };

      const maxRetries = 4;
      const reconnectDelay = 3000;

      for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
        try {
          setFullScreenLoadingValue(
            retryCount > 0 ? `Conectando<br>Tentativa (${retryCount + 1})` : 'Conectando'
          );

          const response = await apiRoute.post('/api/bridge', {
            baseURL: '/api/almox/register',
            productName: productName.current?.value.trim(),
            productCode: productCode,
            productBatch: productBatch,
            quantityValue: quantityValue,
            unitType: unitType,
            observation: observationBox || null
          });

          const { status } = response.data;

          if (status === 'already registered') {
            setFullScreenLoadingValue('');
            setIconSvgModal(alertSvg);
            setModalValue(`Produto já existente.`);
            return;
          }

          if (status === 'success') {
            setSuccessfullyCompleted(true);
            setFullScreenLoadingValue('');
            setIconSvgModal(checkedSvg);
            setModalValue('Novo produto registrado com sucesso.');

            await new Promise((resolve) => setTimeout(resolve, 1000));
            router.push('/dashboard/almox/stock');
            return;
          }
        } catch (error) {
          console.error('Erro na requisição POST:', error);
        }

        await sleep(reconnectDelay);
      }

      setIconSvgModal(alertSvg);
      setModalValue('Não foi possível registrar o produto após várias tentativas.');
      setFullScreenLoadingValue('');
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

      {modalValue && !fullScreenLoadingValue && (
        <Modal icon={iconSvgModal} message={modalValue} />
      )}
      {fullScreenLoadingValue && <FullScreenLoading message={fullScreenLoadingValue} />}
    </Container>
  );
}
