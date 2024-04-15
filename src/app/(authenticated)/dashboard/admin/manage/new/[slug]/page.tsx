'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { FullScreenLoading } from 'components/FullScreenLoading';
import { Modal } from 'components/Modal';
import { decryptObject } from 'functions';
import { TimedWait } from 'functions/TimedWait';
import { internalApi } from 'services/apiAxios';

import alertSvg from './_assets/svg/alert.svg';
import checkedSvg from './_assets/svg/checked.svg';

import * as S from './styles';

interface SlugType {
  params: {
    slug: string;
  };
}

const cities = ['Curitiba', 'Paranaguá', 'Matinhos', 'Ponta Grossa'];

export default function NewService({ params }: SlugType) {
  const [selectedCity, setSelectedCity] = useState('');
  const [classificationL, setClassificationL] = useState(0);
  const [classificationF, setClassificationF] = useState(0);
  const [address, setAddress] = useState('');
  const [nomenclature, setNomenclature] = useState('');
  const [name, setName] = useState('');

  const [modalValue, setModalValue] = useState('');
  const [iconSvgModal, setIconSvgModal] = useState(alertSvg);
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

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(e.target.value);
    setModalValue('');
  };

  const handleCheckboxClickClassL = () => {
    setClassificationL((checkedState) => (checkedState === 1 ? 0 : 1));
    setModalValue('');
  };

  const handleCheckboxClickClassF = () => {
    setClassificationF((checkedState) => (checkedState === 1 ? 0 : 1));
    setModalValue('');
  };

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleServiceOriginAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handleBoxOrCableNomenclatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNomenclature(e.target.value);
  };

  function generateConnectingMessage(count: number): string {
    return count > 0 ? `Conectando<br>Tentativa (${count + 1})` : 'Conectando';
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    function validateName(str: string) {
      return /^[a-zA-ZÀ-ÿ ]+$/.test(str);
    }

    if (!successfullyCompleted) {
      setIconSvgModal(iconSvgModal);

      if (name.trim() === '') {
        setModalValue('Informe o nome do solicitante.');
        return;
      }

      if (!validateName(name)) {
        setModalValue('O nome não pode conter números ou caracteres inválidos.');
        return;
      }

      if (selectedCity === '') {
        setModalValue('Selecione pelo menos uma cidade.');
        return;
      }

      if (address.trim() === '') {
        setModalValue('Informe o endereço de origem do serviço.');
        return;
      }

      if (nomenclature.trim() === '') {
        setModalValue('Informe a nomenclatura de caixa do cabo.');
        return;
      }

      if (classificationL === 0 && classificationF === 0) {
        setModalValue('Selecione pelo menos uma opção (Classe L ou Classe F).');
        return;
      }

      const maxRetries = 4;

      for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
        try {
          setIsPopupValue(generateConnectingMessage(retryCount));

          const getClassification = ({ classificationL = 0, classificationF = 0 }) => {
            const classificationArray = [];

            if (classificationL === 1) {
              classificationArray.push('L');
            }

            if (classificationF === 1) {
              classificationArray.push('F');
            }

            const classification = classificationArray.join('');
            return classification;
          };

          const classification = getClassification({
            classificationL,
            classificationF
          });

          const response = await internalApi.post('/api/bridge', {
            baseURL: '/api/admin/manage/new',
            employeeId: decryptObject(params.slug).userId,
            clientName: name,
            city: selectedCity,
            classification: classification,
            nomenclature: nomenclature,
            address: address
          });

          const { success } = response.data;

          if (success) {
            setSuccessfullyCompleted(true);
            setIsPopupValue('');
            setIconSvgModal(checkedSvg);
            setModalValue('Novo serviço iniciado com êxito.');

            await new Promise((resolve) => setTimeout(resolve, 1000));
            router.push('/dashboard/tec/running');
            return;
          } else {
            console.error('Erro:', response.data.error);
          }
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
                setModalValue('Não foi possível iniciar o serviço após várias tentativas.');
                setIsPopupValue('');
              }
            }
          }
        }
      }
    }
  };

  return (
    <S.Container>
      <S.Title>Novo Serviço</S.Title>
      <S.FormContainer onSubmit={handleSubmit}>
        <label htmlFor="requester">Solicitante:</label>
        <S.Input
          type="text"
          id="requester"
          placeholder="Informe o nome do solicitante"
          value={name}
          onChange={handleName}
        />

        <label htmlFor="selectedCity">Cidade:</label>
        <S.Select id="selectedCity" value={selectedCity} onChange={handleCityChange}>
          <S.Option value="">Selecione uma cidade</S.Option>
          {cities.map((city, index) => (
            <S.Option key={index.toString()} value={city}>
              {city}
            </S.Option>
          ))}
        </S.Select>

        <label htmlFor="serviceOriginAddress">Endereço de origem do serviço:</label>
        <S.Input
          type="text"
          id="serviceOriginAddress"
          placeholder="Informe o endereço de origem do serviço"
          value={address}
          onChange={handleServiceOriginAddressChange}
        />

        <label htmlFor="boxOrCableNomenclature">Nomenclatura de caixa ou cabo:</label>
        <S.Input
          type="text"
          id="boxOrCableNomenclature"
          placeholder="Informe a nomenclatura de caixa ou cabo"
          value={nomenclature}
          onChange={handleBoxOrCableNomenclatureChange}
        />

        <div>
          <S.CheckboxButton
            type="button"
            $checked={classificationF}
            onClick={handleCheckboxClickClassF}
          >
            <div />
            <span>Classe F</span>
          </S.CheckboxButton>

          <S.CheckboxButton
            type="button"
            $checked={classificationL}
            onClick={handleCheckboxClickClassL}
          >
            <div />
            <span>Classe L</span>
          </S.CheckboxButton>
        </div>

        <S.Button type="submit">Iniciar Serviço</S.Button>
      </S.FormContainer>

      {modalValue && !isPopupValue && <Modal icon={iconSvgModal} message={modalValue} />}
      {isPopupValue && <FullScreenLoading message={isPopupValue} />}
    </S.Container>
  );
}
