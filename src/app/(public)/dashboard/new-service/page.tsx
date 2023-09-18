'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import Cookie from 'js-cookie';

import { Spinner } from 'components/Spinner';

import alert from './assets/svg/alert.svg';
import {
  Button,
  CheckboxButton,
  ErrorSpan,
  FixedBlock,
  FormContainer,
  Input,
  Option,
  Select
} from './styles';

import api from 'lib/api';

const cities = ['Curitiba', 'Paranaguá', 'Matinhos', 'Ponta Grossa'];

export default function NewService() {
  const [selectedCity, setSelectedCity] = useState('');
  const [classificationL, setClassificationL] = useState(0);
  const [classificationF, setClassificationF] = useState(0);
  const [address, setAddress] = useState('');
  const [nomenclature, setNomenclature] = useState('');
  const [name, setName] = useState('');
  const [selectError, setSelectError] = useState('');

  const [isPopupConnected, setIsPopupConnected] = useState(false);

  const router = useRouter();
  const storedCookie = Cookie.get('auth_token');

  const handleClickOutside = () => {
    if (selectError !== '') {
      !isPopupConnected && setSelectError('');
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
    setSelectError('');
  };

  const handleCheckboxClickClassL = () => {
    setClassificationL((checkedState) => checkedState === 1 ? 0 : 1);
    setSelectError('');
  };

  const handleCheckboxClickClassF = () => {
    setClassificationF((checkedState) => checkedState === 1 ? 0 : 1);
    setSelectError('');
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

  const MAX_RETRIES = 4;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    function validateName(str: string) {
      return /^[a-zA-ZÀ-ÿ ]+$/.test(str);
    }

    if (name.trim() === '') {
      setSelectError('Informe o nome do solicitante.');
      return;
    }

    if (!validateName(name)) {
      setSelectError('O nome não pode conter números ou caracteres inválidos.');
      return;
    }

    if (selectedCity === '') {
      setSelectError('Selecione pelo menos uma cidade.');
      return;
    }

    if (address.trim() === '') {
      setSelectError('Informe o endereço de origem do serviço.');
      return;
    }

    if (nomenclature.trim() === '') {
      setSelectError('Informe a nomenclatura de caixa do cabo.');
      return;
    }

    if (classificationL === 0 && classificationF === 0) {
      setSelectError('Selecione pelo menos uma opção (Classe L ou Classe F).');
      return;
    }

    let retryCount = 0;

    while (retryCount < MAX_RETRIES) {
      try {
        setIsPopupConnected(true);
        setSelectError(retryCount > 0 ? `Conectando<br>Tentativa (${retryCount + 1})` : 'Conectando');

        const response = await api.post('/services', {
          name: name,
          cnpj: '00.000.000/0000-00',
          city: selectedCity,
          classification: `${classificationL === 1 ? 'L' : ''}${classificationF === 1 ? 'F' : ''}`,
          nomenclature: nomenclature,
          address: address,
          token: storedCookie,
        });

        const { success } = response?.data;

        if (success) {
          router.push('/dashboard/running-service');
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

    setSelectError('Não foi possível iniciar o serviço após várias tentativas.');
    setIsPopupConnected(false)
  };


  return (
    <>
      {isPopupConnected && <FixedBlock />}
      <FormContainer onSubmit={handleSubmit}>
        <label htmlFor="requester">Solicitante:</label>
        <Input
          autoFocus
          type="text"
          id="requester"
          placeholder="Informe o nome do solicitante"
          value={name}
          onChange={handleName}
        />

        <label htmlFor="selectedCity">Cidade:</label>
        <Select id="selectedCity" value={selectedCity} onChange={handleCityChange}>
          <Option value="">Selecione uma cidade</Option>
          {cities.map(city => (
            <Option key={city} value={city}>{city}</Option>
          ))}
        </Select>

        <label htmlFor="serviceOriginAddress">Endereço de origem do serviço:</label>
        <Input
          type="text"
          id="serviceOriginAddress"
          placeholder="Informe o endereço de origem do serviço"
          value={address}
          onChange={handleServiceOriginAddressChange}
        />

        <label htmlFor="boxOrCableNomenclature">Nomenclatura de caixa ou cabo:</label>
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
            onClick={handleCheckboxClickClassL}>
            <div />
            <span>Classe L</span>
          </CheckboxButton>

          <CheckboxButton
            type="button"
            $checked={classificationF}
            onClick={handleCheckboxClickClassF}>
            <div />
            <span>Classe F</span>
          </CheckboxButton>
        </div >

        {(selectError || isPopupConnected) &&
          <ErrorSpan>
            <div>
              {isPopupConnected ? <Spinner /> : <Image
                priority
                src={alert}
                alt="Book"
                width={55}
                height={55}
              />}
            </div>
            <span dangerouslySetInnerHTML={{ __html: selectError }}></span>
          </ErrorSpan>}
        <Button type="submit">Iniciar Serviço</Button>
      </FormContainer >
    </>
  );
};
