'use client';

import { useRouter } from 'next/navigation';
import type React from 'react';
import { useEffect, useState } from 'react';

import { HorizontalListCable } from '../_components/HorizontalListCable';
import { HorizontalListDgoandbox } from '../_components/HorizontalListDgoandbox';
import { SelectedListCable } from '../_components/SelectedListCable';
import { SelectedListDgoandbox } from '../_components/SelectedListDgoandbox';
import { FullScreenLoading } from 'components/FullScreenLoading';
import { Modal } from 'components/Modal';
import { decryptObject } from 'functions';
import { HandleLogout } from 'functions/HandleLogout';
import { TimedWait } from 'functions/TimedWait';
import { internalApi } from 'services/apiAxios';

import { useNodeName } from '../store/nodeName';
import { useSelectedCableStore } from '../store/selectedCable';
import { useSelectedDgoandboxStore } from '../store/selectedDgoandbox';
import { useSelectedListDgoandbox } from '../store/selectedListDgoandbox';

import moment, { type Moment } from 'moment';

import 'moment/locale/pt-br';

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
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');

  const [modalValue, setModalValue] = useState('');
  const [iconSvgModal, setIconSvgModal] = useState(alertSvg);
  const [isPopupValue, setIsPopupValue] = useState<string | null>(null);
  const [connectionError, setConnectionError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [successfullyCompleted, setSuccessfullyCompleted] = useState(false);

  const [selectedDate, setSelectedDate] = useState<string | Moment>(moment());
  const [selectedTime, setSelectedTime] = useState<string | Moment>(moment());

  const maxRetries = 4;
  const decryptSlug = decryptObject(params.slug);

  const { nodeName, updateNodeName } = useNodeName();
  const { selectedCable, setSelectedCable } = useSelectedCableStore();
  const { selectedDgoandbox, setSelectedDgoandbox } = useSelectedDgoandboxStore();
  const { selectedListDgoandbox } = useSelectedListDgoandbox();

  function generateConnectingMessage(count: number): string {
    return count > 0 ? `Conectando<br>Tentativa (${count + 1})` : 'Conectando';
  }

  async function fetchCableCatalog() {
    setConnectionError(false);

    for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
      try {
        setIsPopupValue(generateConnectingMessage(retryCount));

        const response = await internalApi.post('/api/bridge', {
          baseURL: '/api/superadmin/manage/new-construction-service/cable-catalog',
          protocol: decryptSlug.protocol?.toString()
        });

        setIsPopupValue(null);
        setSelectedCable(response.data.cableCatalog);
        setSelectedDgoandbox(response.data.dgoandboxCatalog);
        isLoading;
        break;
      } catch (error: unknown) {
        if (error instanceof Error) {
          const customError = error as CustomError;
          if (customError.response) {
            const statusCode = customError.response.status;

            if (statusCode === 403) {
              HandleLogout();
              break;
            }

            if (statusCode === 409) {
              break;
            }

            if (retryCount === maxRetries) {
              setConnectionError(true);
              setIsPopupValue(null);
            } else {
              await TimedWait(3000);
            }
          }
        }
      }
    }
  }

  useEffect(() => {
    fetchCableCatalog();
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

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

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleNameNode = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateNodeName(e.target.value);
  };

  const handleServiceOriginAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handleDateChange = (date: string | Moment) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (date: string | Moment) => {
    setSelectedTime(date);
  };

  const isValidDate = (current: Date | string | Moment) => {
    return moment(current).isSameOrAfter(moment(), 'day');
  };

  const dateMoment = moment(selectedDate);
  const timeMoment = moment(selectedTime);

  const startServiceAt = new Date(`${dateMoment.format('YYYY-MM-DD')} ${timeMoment.format('HH:mm:ss')}`);

  const idOfFilledFieldsDgoandbox = selectedDgoandbox.map((item) => {
    if (Object.keys(selectedListDgoandbox?.[String(item.id)] || {}).length > 0) {
      if (item?.quantity === Object.keys(selectedListDgoandbox?.[String(item.id)] || {}).length) {
        return String(item.id);
      }
    }
  });

  const allFilledDgoandbox = Boolean(
    selectedDgoandbox.filter((item) => Number(item?.quantity) > 0).length ===
      idOfFilledFieldsDgoandbox.filter((i) => i).length &&
      idOfFilledFieldsDgoandbox.filter((i) => i).length > 0
  );

  function removeEmptyObjects(
    obj: Record<string, Record<string, { value: string }>>
  ): Record<string, Record<string, { value: string }>> {
    return Object.keys(obj).reduce(
      (acc, key) => {
        if (typeof obj[key] === 'object' && Object.keys(obj[key]).length > 0) {
          acc[key] = obj[key];
        }
        return acc;
      },
      {} as Record<string, Record<string, { value: string }>>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    function validateName(str: string) {
      return /^[a-zA-ZÀ-ÿ ]+$/.test(str);
    }

    if (!successfullyCompleted) {
      setIconSvgModal(iconSvgModal);

      if (selectedCable.filter((item) => item.cable_length_meters).length === 0) {
        setModalValue('Informe a quantidade de metros de cabo.');
        return;
      }

      if (selectedDgoandbox.filter((item) => item.quantity).length === 0) {
        setModalValue('Informe a quantidade das caixas.');
        return;
      }

      if (!allFilledDgoandbox) {
        setModalValue('Informe o nome em todas as caixas.');
        return;
      }

      if (nodeName.trim() === '') {
        setModalValue('Informe o nome do Node.');
        return;
      }

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

      const maxRetries = 4;

      for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
        try {
          setIsPopupValue(generateConnectingMessage(retryCount));

          const response = await internalApi.post('/api/bridge', {
            baseURL: '/api/superadmin/manage/new-construction-service/create-service',
            employeeId: decryptObject(params.slug).userId,
            selectedCable: selectedCable.filter((item) => Number(item.cable_length_meters) > 0),
            clientName: name,
            city: selectedCity,
            address: address,
            startServiceAt: startServiceAt,
            listDgoandbox: JSON.stringify(removeEmptyObjects(selectedListDgoandbox)),
            nodeName: nodeName
          });

          const { success } = response.data;

          if (success) {
            setSuccessfullyCompleted(true);
            setIsPopupValue('');
            setIconSvgModal(checkedSvg);
            setModalValue('Novo serviço iniciado com êxito.');

            await new Promise((resolve) => setTimeout(resolve, 1000));
            router.push('/dashboard/superadmin/running', { scroll: false });
            return;
          } else {
            console.error('Erro:', response.data.error);
          }
        } catch (error: unknown) {
          if (error instanceof Error) {
            const customError = error as CustomError;
            if (customError.response) {
              const statusCode = customError.response.status;

              if (statusCode === 403) {
                HandleLogout();
                break;
              }

              if (statusCode === 409) {
                await TimedWait(10000);
              } else {
                await TimedWait(3000);
              }

              if (retryCount === maxRetries) {
                setModalValue('Não foi possível iniciar o serviço após várias tentativas.');
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

  const calendarInputProps = {
    readOnly: true,
    style: { cursor: 'default' },
    onFocus: (e: React.FocusEvent<HTMLInputElement>) => e.target.blur()
  };

  return (
    <S.Container>
      <S.Title>Novo Serviço</S.Title>
      {!isLoading && (
        <>
          <S.WrapperHorizontalList>
            <HorizontalListCable />
            <SelectedListCable list={selectedCable} />
          </S.WrapperHorizontalList>
          <S.ContainerInputNode>
            <S.Input
              type="text"
              id="serviceOriginAddress"
              placeholder="Nome do node"
              value={nodeName}
              onChange={handleNameNode}
            />
          </S.ContainerInputNode>
          <S.WrapperHorizontalList>
            <HorizontalListDgoandbox />
            <SelectedListDgoandbox
              checkNodeName={() => {
                setModalValue('Informe o nome do Node.');
              }}
              list={selectedDgoandbox}
            />
          </S.WrapperHorizontalList>
        </>
      )}
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
        <S.Button type="submit">Iniciar Serviço</S.Button>
      </S.FormContainer>
      {modalValue && !isPopupValue && <Modal icon={iconSvgModal} message={modalValue} />}
      {isPopupValue && <FullScreenLoading message={isPopupValue} />}
      {connectionError ? (
        <S.ErrorContainer>
          <span>
            Não foi possível carregar os dados da página devido a instabilidade na conexão. Por favor,
            tente novamente.
          </span>
        </S.ErrorContainer>
      ) : (
        <>{/* <List serviceData={serviceData[0]} /> */}</>
      )}
    </S.Container>
  );
}
