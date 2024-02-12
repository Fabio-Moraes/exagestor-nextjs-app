'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { FullScreenLoading } from 'components/FullScreenLoading';
import { Modal } from 'components/Modal';
import apiRoute from 'services/apiRoute';

import alertSvg from './assets/svg/alert.svg';
import checkedSvg from './assets/svg/checked.svg';

import { Button, CheckboxButton, Container, FormContainer, Input, Title } from './styles';

export default function NewRegister() {
  const [productName, setProductName] = useState('');
  const [productCode, setProductCode] = useState('');
  const [quantityValue, setQuantityValue] = useState('');
  const [unitType, setUnitType] = useState('UNID');

  const [modalValue, setModalValue] = useState('');
  const [iconSvgModal, setIconSvgModal] = useState(alertSvg);
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

      if (productName.trim() === '') {
        setModalValue('Informe o nome do produto.');
        return;
      }

      if (quantityValue.trim() === '') {
        setModalValue('Informe a quantidade');
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
            productName: productName,
            quantityValue: quantityValue,
            unitType: unitType,
            productCode: productCode
          });

          const { status } = response.data;

          if (status === 'already registered') {
            setFullScreenLoadingValue('');
            setModalValue(`já existente.`);
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

      setModalValue('Não foi possível registrar o produto após várias tentativas.');
      setFullScreenLoadingValue('');
    }
  };

  const handleQuantityValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (/^\d*$/.test(inputValue) && inputValue.length <= 9) {
      setQuantityValue(String(inputValue === '' ? 0 : parseInt(inputValue, 10)));
    } else {
      console.error('Por favor, insira apenas números inteiros ou zero.');
    }
  };

  return (
    <Container>
      <Title>Novo Produto</Title>
      <FormContainer onSubmit={handleSubmit}>
        <label htmlFor="Nome do Produto">Nome do Produto:</label>
        <Input
          type="text"
          id="Nome"
          placeholder="Nome do Produto"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />

        <label htmlFor="Lote">Lote:</label>
        <Input type="text" id="Nome" placeholder="Lote" value={''} onChange={() => {}} />

        <label htmlFor="Código">Código:</label>
        <Input
          type="text"
          id="Nome"
          placeholder="Código"
          value={productCode}
          onChange={(e) => setProductCode(e.target.value)}
        />

        <label htmlFor="Quantidade">Quantidade:</label>
        <Input
          type="text"
          placeholder="Quantidade"
          value={quantityValue || 0}
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
            $checked={unitType === 'M'}
            onClick={() => {
              setUnitType('M');
            }}
          >
            <div />
            <span>Metro</span>
          </CheckboxButton>

          <CheckboxButton
            style={{ opacity: 0 }}
            type="button"
            $checked={unitType === 'PAC'}
            onClick={() => {
              //setUnitType('PAC');
            }}
          >
            <div />
            <span>.....</span>
          </CheckboxButton>
        </div>

        <Button type="submit">Registrar</Button>
      </FormContainer>

      {modalValue && !fullScreenLoadingValue && (
        <Modal icon={iconSvgModal} message={modalValue} />
      )}
      {fullScreenLoadingValue && <FullScreenLoading message={fullScreenLoadingValue} />}
    </Container>
  );
}
