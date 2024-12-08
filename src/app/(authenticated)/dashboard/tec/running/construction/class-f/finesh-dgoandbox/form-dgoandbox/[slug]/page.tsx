'use client';

import { useRouter } from 'next/navigation';
import type React from 'react';
import { type ChangeEvent, useEffect, useState } from 'react';

import 'moment/locale/pt-br';

import { FullScreenLoading } from 'components/FullScreenLoading';
import { Modal } from 'components/Modal';
import { decryptObject } from 'functions';
import { HandleLogout } from 'functions/HandleLogout';
import { TimedWait } from 'functions/TimedWait';
import useGeoLocation from 'hooks/useGeoLocation';
import { internalApi } from 'services/apiAxios';

import alertSvg from './_assets/svg/alert.svg';
import checkedSvg from './_assets/svg/checked.svg';

import * as S from './styles';

interface SlugType {
  params: {
    slug: string;
  };
}

type OnClickItemList = {
  dgoandbox: string;
  imageCount: string;
  protocol: string;
};

export default function NewService({ params }: SlugType) {
  const [address, setAddress] = useState<string>('');
  const [latitude, setLatitude] = useState<string>('');
  const [longitude, setLongitude] = useState<string>('');
  const [modalValue, setModalValue] = useState<string>('');
  const [iconSvgModal, setIconSvgModal] = useState<string>(alertSvg);
  const [isPopupValue, setIsPopupValue] = useState<string>('');
  const [successfullyCompleted, setSuccessfullyCompleted] = useState<boolean>(false);
  const [runningLoad, setRunningLoad] = useState(false);

  const decryptSlug = decryptObject(params.slug) as OnClickItemList;

  const { location, error: errorGeoLocation, loading } = useGeoLocation();

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

  const handleServiceOriginAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handleLatitudeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLatitude(e.target.value);
  };

  const handleLongitudeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLongitude(e.target.value);
  };

  const generateConnectingMessage = (count: number): string => {
    return count > 0 ? `Conectando<br>Tentativa (${count + 1})` : 'Conectando';
  };

  const handleSubmit = async () => {
    if (!successfullyCompleted) {
      setIconSvgModal(alertSvg);

      if (address.trim() === '') {
        setModalValue('Informe o local.');
        return;
      }

      if (latitude.trim() === '') {
        setModalValue('Informe a latitude.');
        return;
      }

      if (longitude.trim() === '') {
        setModalValue('Informe a longitude.');
        return;
      }

      const maxRetries: number = 4;

      for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
        try {
          setIsPopupValue(generateConnectingMessage(retryCount));

          const response = await internalApi.post('/api/bridge', {
            baseURL: '/api/tec/running/construction/class-f/finished-dgoandbox',
            latitude: latitude,
            longitude: longitude,
            address: address,
            dgoandbox: decryptSlug.dgoandbox
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

  const maxRetries = 4;

  async function onClickButtonAddressApi() {
    setRunningLoad(true);
    for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
      try {
        const response = await internalApi.post('/api/bridge', {
          baseURL: '/api/tec/running/construction/class-f/address-api',
          latitude: String(location.latitude ?? '-22.105293'),
          longitude: String(location.longitude ?? '-51.409715')
        });

        const { address } = response.data;
        console.log(address);

        setAddress(address);
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
            } else {
              await TimedWait(3000);
            }
          }
        }
      } finally {
        setRunningLoad(false);
      }
    }
  }

  return (
    <S.Container>
      <span>{String(location.latitude ?? '00-000000')}</span>
      <br />
      <span>{String(location.longitude ?? '00-000000')}</span>
      <S.Title>{decryptSlug.dgoandbox}</S.Title>
      {runningLoad && <p>Loading...</p>}
      {loading && <p>Loading...</p>}
      <S.FormContainer>
        <S.Input
          type="text"
          id="serviceOriginAddress"
          placeholder="Endereço"
          value={address}
          onChange={handleServiceOriginAddressChange}
        />

        <S.Input
          type="text"
          id="boxOrCableNomenclature"
          placeholder="Latitude"
          value={latitude}
          onChange={handleLatitudeChange}
        />

        <S.Input
          type="text"
          id="boxOrCableNomenclature"
          placeholder="Longitude"
          value={longitude}
          onChange={handleLongitudeChange}
        />

        <S.MapButton
          onClick={() => {
            setLongitude(String(location.longitude ?? '-51.409715'));
            setLatitude(String(location.latitude ?? '-22.105293'));
            onClickButtonAddressApi();
          }}
        />

        <S.ContainerCardImages>
          {Array.from({ length: Number(decryptSlug.imageCount) }, (_, index) => (
            <button onClick={() => console.log('Clicou')} key={index}>
              Imagem ({index + 1})
            </button>
          ))}
        </S.ContainerCardImages>

        <S.Button onClick={handleSubmit}>Concluir</S.Button>
      </S.FormContainer>
      {errorGeoLocation && <p>Error: {errorGeoLocation}</p>}
      {modalValue && !isPopupValue && <Modal icon={iconSvgModal} message={modalValue} />}
      {isPopupValue && <FullScreenLoading message={isPopupValue} />}
    </S.Container>
  );
}
