'use client';

import { useRouter } from 'next/navigation';
import type React from 'react';
import { type ChangeEvent, useEffect, useState } from 'react'

import 'moment/locale/pt-br';

import { FullScreenLoading } from 'components/FullScreenLoading';
import { Modal } from 'components/Modal';
import { TimedWait } from 'functions/TimedWait';
import { internalApi } from 'services/apiAxios';

import moment, { type Moment } from 'moment';

import alertSvg from './_assets/svg/alert.svg';
import checkedSvg from './_assets/svg/checked.svg';

import * as S from './styles';

const cities: string[] = ['Curitiba', 'Paranaguá', 'Matinhos', 'Ponta Grossa'];

export default function NewService() {
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [classificationL, setClassificationL] = useState<number>(0);
  const [classificationF, setClassificationF] = useState<number>(0);
  const [address, setAddress] = useState<string>('');
  const [nomenclature, setNomenclature] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [modalValue, setModalValue] = useState<string>('');
  const [iconSvgModal, setIconSvgModal] = useState<string>(alertSvg);
  const [isPopupValue, setIsPopupValue] = useState<string>('');
  const [successfullyCompleted, setSuccessfullyCompleted] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Moment>(moment());
  const [selectedTime, setSelectedTime] = useState<Moment>(moment());

  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = () => {
      if (modalValue !== '') {
        !isPopupValue && setModalValue('');
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [modalValue, isPopupValue]);

  const handleCityChange = (e: ChangeEvent<HTMLSelectElement>) => {
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

  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleServiceOriginAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handleBoxOrCableNomenclatureChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNomenclature(e.target.value);
  };

  const generateConnectingMessage = (count: number): string => {
    return count > 0 ? `Conectando<br>Tentativa (${count + 1})` : 'Conectando';
  };

  const handleDateChange = (date: Moment | string) => {
    setSelectedDate(moment(date));
  };

  const handleTimeChange = (time: Moment | string) => {
    setSelectedTime(moment(time));
  };

  const isValidDate = (current: Moment): boolean => {
    return moment(current).isSameOrAfter(moment(), 'day');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    function validateName(str: string): boolean {
      return /^[a-zA-ZÀ-ÿ ]+$/.test(str);
    }

    if (!successfullyCompleted) {
      setIconSvgModal(alertSvg);

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

      const maxRetries: number = 4;

      for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
        try {
          setIsPopupValue(generateConnectingMessage(retryCount));

          const getClassification = ({
            classificationL = 0,
            classificationF = 0
          }: {
            classificationL: number;
            classificationF: number;
          }): string => {
            const classificationArray: string[] = [];

            if (classificationL === 1) {
              classificationArray.push('L');
            }

            if (classificationF === 1) {
              classificationArray.push('F');
            }

            const classification: string = classificationArray.join('');
            return classification;
          };

          const classification: string = getClassification({
            classificationL,
            classificationF
          });

          const startServiceAt: Date = new Date(
            `${selectedDate.format('YYYY-MM-DD')} ${selectedTime.format('HH:mm:ss')}`
          );

          const response = await internalApi.post('/api/bridge', {
            baseURL: '/api/tec/new',
            clientName: name,
            city: selectedCity,
            classification,
            nomenclature,
            address,
            startServiceAt
          });

          const { success } = response.data;

          if (success) {
            setSuccessfullyCompleted(true);
            setIsPopupValue('');
            setIconSvgModal(checkedSvg);
            setModalValue('Novo serviço iniciado com êxito.');

            await TimedWait(3000);
            router.push('/dashboard/tec/running', { scroll: false });
            break;
          }
        } catch (error) {
          if (retryCount === maxRetries - 1) {
            setModalValue('Não foi possível iniciar o serviço após várias tentativas.');
            setIsPopupValue('');
          } else {
            await TimedWait(3000);
          }
        }
      }
    }
  };

  const calendarInputProps = {
    readOnly: true,
    style: { cursor: 'default' },
    onFocus: (e: React.FocusEvent<HTMLInputElement>) => e.target.blur()
  };

  return (
    <S.Container>
      <S.Title>Novo Serviço</S.Title>
      <S.FormContainer onSubmit={handleSubmit}>
        <S.Input
          type="text"
          id="requester"
          placeholder="Nome do solicitante"
          value={name}
          onChange={handleName}
        />

        <S.Select id="selectedCity" value={selectedCity} onChange={handleCityChange}>
          <S.Option value="">Selecione uma cidade</S.Option>
          {cities.map((city, index) => (
            <S.Option key={index.toString()} value={city}>
              {city}
            </S.Option>
          ))}
        </S.Select>

        <S.Input
          type="text"
          id="serviceOriginAddress"
          placeholder="Endereço de origem do serviço"
          value={address}
          onChange={handleServiceOriginAddressChange}
        />

        <S.Input
          type="text"
          id="boxOrCableNomenclature"
          placeholder="Nomenclatura de caixa ou cabo"
          value={nomenclature}
          onChange={handleBoxOrCableNomenclatureChange}
        />

        <S.StyledDateTime
          value={selectedDate}
          onChange={handleDateChange}
          locale="pt"
          dateFormat="DD/MM/YYYY"
          timeFormat={false}
          isValidDate={isValidDate}
          inputProps={calendarInputProps}
        />

        <S.StyledDateTime
          value={selectedTime}
          onChange={handleTimeChange}
          locale="pt"
          dateFormat={false}
          timeFormat="HH:mm"
          inputProps={calendarInputProps}
        />

        <S.WrapperCheckboxButton>
          <S.CheckboxButton
            type="button"
            $checked={Boolean(classificationF)}
            onClick={handleCheckboxClickClassF}
          >
            <div />
            <span>Classe F</span>
          </S.CheckboxButton>

          <S.CheckboxButton
            type="button"
            $checked={Boolean(classificationL)}
            onClick={handleCheckboxClickClassL}
          >
            <div />
            <span>Classe L</span>
          </S.CheckboxButton>
        </S.WrapperCheckboxButton>

        <S.Button type="submit">Iniciar Serviço</S.Button>
      </S.FormContainer>
      {modalValue && !isPopupValue && <Modal icon={iconSvgModal} message={modalValue} />}
      {isPopupValue && <FullScreenLoading message={isPopupValue} />}
    </S.Container>
  );
}
