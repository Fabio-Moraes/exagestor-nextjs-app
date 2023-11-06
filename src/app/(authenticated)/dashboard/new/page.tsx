'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { FullScreenLoading } from 'components/FullScreenLoading';
import { Modal } from 'components/Modal';

import alertSvg from './assets/svg/alert.svg';
import checkedSvg from './assets/svg/checked.svg';
import {
  Button,
  CheckboxButton,
  Container,
  FormContainer,
  Input,
  Option,
  Select,
  Title
} from './styles';

import Cookie from 'js-cookie';
import api from 'lib/api';

const cities = ['Curitiba', 'Paranaguá', 'Matinhos', 'Ponta Grossa'];

export default function NewService() {
  const [selectedCity, setSelectedCity] = useState('');
  const [classificationL, setClassificationL] = useState(0);
  const [classificationF, setClassificationF] = useState(0);
  const [address, setAddress] = useState('');
  const [nomenclature, setNomenclature] = useState('');
  const [name, setName] = useState('');

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

  const handleServiceOriginAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAddress(e.target.value);
  };

  const handleBoxOrCableNomenclatureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNomenclature(e.target.value);
  };

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
        setModalValue(
          'O nome não pode conter números ou caracteres inválidos.'
        );
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
      let retryCount = 0;

      while (retryCount < maxRetries) {
        try {
          setFullScreenLoadingValue(
            retryCount > 0
              ? `Conectando<br>Tentativa (${retryCount + 1})`
              : 'Conectando'
          );

          const storedCookie = Cookie.get('auth_token');

          const getClassification = ({
            classificationL = 0,
            classificationF = 0
          }) => {
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

          const response = await api.post('/api/services/new', {
            clientName: name,
            city: selectedCity,
            classification: classification,
            nomenclature: nomenclature,
            address: address,
            token: storedCookie
          });

          const { success } = response.data;

          if (success) {
            setSuccessfullyCompleted(true);
            setFullScreenLoadingValue('');
            setIconSvgModal(checkedSvg);
            setModalValue('Novo serviço iniciado com êxito.');

            await new Promise((resolve) => setTimeout(resolve, 1000));
            router.push('/dashboard/running');
            return;
          } else {
            console.error('Erro:', response.data.error);
          }
        } catch (error) {
          console.error('Erro na requisição POST:', error);
        }

        retryCount++;
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }

      setModalValue(
        'Não foi possível iniciar o serviço após várias tentativas.'
      );
      setFullScreenLoadingValue('');
    }
  };

  return (
    <Container>
      <Title>Novo Serviço</Title>
      <FormContainer onSubmit={handleSubmit}>
        <label htmlFor="requester">Solicitante:</label>
        <Input
          type="text"
          id="requester"
          placeholder="Informe o nome do solicitante"
          value={name}
          onChange={handleName}
        />

        <label htmlFor="selectedCity">Cidade:</label>
        <Select
          id="selectedCity"
          value={selectedCity}
          onChange={handleCityChange}
        >
          <Option value="">Selecione uma cidade</Option>
          {cities.map((city, index) => (
            <Option key={index.toString()} value={city}>
              {city}
            </Option>
          ))}
        </Select>

        <label htmlFor="serviceOriginAddress">
          Endereço de origem do serviço:
        </label>
        <Input
          type="text"
          id="serviceOriginAddress"
          placeholder="Informe o endereço de origem do serviço"
          value={address}
          onChange={handleServiceOriginAddressChange}
        />

        <label htmlFor="boxOrCableNomenclature">
          Nomenclatura de caixa ou cabo:
        </label>
        <Input
          type="text"
          id="boxOrCableNomenclature"
          placeholder="Informe a nomenclatura de caixa ou cabo"
          value={nomenclature}
          onChange={handleBoxOrCableNomenclatureChange}
        />

        <div>
          <CheckboxButton
            type="button"
            $checked={classificationL}
            onClick={handleCheckboxClickClassL}
          >
            <div />
            <span>Classe L</span>
          </CheckboxButton>

          <CheckboxButton
            type="button"
            $checked={classificationF}
            onClick={handleCheckboxClickClassF}
          >
            <div />
            <span>Classe F</span>
          </CheckboxButton>
        </div>

        <Button type="submit">Iniciar Serviço</Button>
      </FormContainer>

      {modalValue && !fullScreenLoadingValue && (
        <Modal icon={iconSvgModal} message={modalValue} />
      )}
      {fullScreenLoadingValue && (
        <FullScreenLoading message={fullScreenLoadingValue} />
      )}
    </Container>
  );
}
