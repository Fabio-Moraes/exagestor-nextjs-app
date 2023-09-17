'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import alert from './assets/svg/alert.svg';
import {
  Button,
  CheckboxButton,
  ErrorSpan,
  FormContainer,
  Input,
  Option,
  Select
} from './styles';

import api from 'lib/api';

const cities = ['Curitiba', 'Paranaguá', 'Matinhos', 'Ponta Grossa'];

export const Form = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [classificationL, setClassificationL] = useState(0);
  const [classificationF, setClassificationF] = useState(0);
  const [address, setAddress] = useState('');
  const [nomenclature, setNomenclature] = useState('');
  const [name, setName] = useState('');
  const [selectError, setSelectError] = useState('');

  const router = useRouter();

  const handleClickOutside = () => {
    if (selectError !== '') {
      setSelectError('');
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
      setSelectError('O nome não pode conter números<br>ou caracteres inválidos.');
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
      setSelectError('Selecione pelo menos uma opção<br>(Classe L ou Classe F).');
      return;
    }

    try {
      const response = await api.post('/services', {
        name: name,
        cnpj: '00.000.000/0000-00',
        city: selectedCity,
        classification: `${classificationL === 1 ? 'L' : ''}${classificationF === 1 ? 'F' : ''}`,
        nomenclature: nomenclature,
        address: address,
      });

      const { success } = response?.data;

      if (success) {
        router.push('/dashboard/running-service');
      } else {
        console.error('Erro:', response.data.error);
      }
    } catch (error) {
      console.error('Erro na requisição POST:', error);
    }
  };

  return (
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

      {selectError &&
        <ErrorSpan>
          <div>
            <Image
              priority
              src={alert}
              alt="Book"
              width={55}
              height={55}
            />
          </div>
          <span dangerouslySetInnerHTML={{ __html: selectError }}></span>
        </ErrorSpan>}
      <Button type="submit">Iniciar Serviço</Button>
    </FormContainer >
  );
};
