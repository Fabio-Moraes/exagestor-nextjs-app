'use client';

import { useRouter } from 'next/navigation';
import type React from 'react';
import { type ChangeEvent, useEffect, useRef, useState } from 'react';

import 'moment/locale/pt-br';

import { CameraCapture } from './_components/CameraCapture';
import { FullScreenLoading } from 'components/FullScreenLoading';
import { Modal } from 'components/Modal';
import Image from 'components/Vercel/Image';
import { decryptObject } from 'functions';
import { HandleLogout } from 'functions/HandleLogout';
import { TimedWait } from 'functions/TimedWait';
import useGeoLocation from 'hooks/useGeoLocation';
import { internalApi } from 'services/apiAxios';

import addImage from './_assets/svg/add-image.svg';
import alertSvg from './_assets/svg/alert.svg';
import checkedSvg from './_assets/svg/checked.svg';
import mapSvg from './_assets/svg/map.svg';

import * as S from './styles';

interface SlugType {
  params: {
    slug: string;
  };
}

type OnClickItemList = {
  dgoandbox: string;
  imageCount: string;
  selectedTab: string;
  protocol: string;
};

interface propsImageType {
  priority: boolean;
  loading: 'eager';
  width: number;
  height: number;
}

export default function NewService({ params }: SlugType) {
  const [address, setAddress] = useState<string>('');
  const [latitude, setLatitude] = useState<string>('');
  const [longitude, setLongitude] = useState<string>('');
  const [modalValue, setModalValue] = useState<string>('');
  const [iconSvgModal, setIconSvgModal] = useState<string>(alertSvg);
  const [isPopupValue, setIsPopupValue] = useState<string>('');
  const [successfullyCompleted, setSuccessfullyCompleted] = useState<boolean>(false);
  const [runningLoad, setRunningLoad] = useState(false);
  const [previews, setPreviews] = useState<(string | null)[]>([]);
  const [errorUploadImage, setErrorUploadImage] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [indexImageCapture, setIndexImageCapture] = useState(0);

  const decryptSlug = decryptObject(params.slug) as OnClickItemList;
  const { location, error: errorGeoLocation, loading } = useGeoLocation();

  const router = useRouter();

  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleOpenDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
      setIsModalOpen(true);
    }
  };

  const handleCloseDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

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

  const generateConnectingMessage = (count: number): string => {
    return count > 0 ? `Conectando<br>Tentativa (${count + 1})` : 'Conectando';
  };

  const uploadImage = async (file: File | null, index: number) => {
    if (!file) {
      setErrorUploadImage('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', `${decryptSlug.protocol}_${decryptSlug.dgoandbox}_${index}`);
    formData.append('dgoandbox_name', String(decryptSlug.dgoandbox));
    formData.append('protocol', decryptSlug.protocol);

    try {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/api/update-image-dgoandbox', true);

      // Atualizando o progresso do upload
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const progress = Math.round((e.loaded * 100) / e.total);
          setUploadProgress((prev) => {
            const newProgress = [...prev];
            newProgress[index] = progress;
            return newProgress;
          });
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          if (data.signedUrl) {
            // Sucesso no upload
          } else {
            throw new Error(data.error || 'Failed to upload image');
          }
        } else {
          throw new Error('Failed to upload image');
        }
      };

      xhr.onerror = () => {
        throw new Error('An error occurred during the file upload');
      };

      xhr.send(formData);
    } catch (err) {
      if (err instanceof Error) {
        setErrorUploadImage(err.message);
      } else {
        setErrorUploadImage('An unknown error occurred');
      }
    }
  };

  const handleCapture = async (file: File) => {
    uploadImage(file, indexImageCapture);
    handleFileChange(file, indexImageCapture);
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

      if (previews.length < Number(decryptSlug.imageCount)) {
        if (Number(decryptSlug.imageCount) - previews.filter((item) => item !== '').length === 1) {
          setModalValue(`(1) Imagem faltando`);
          return;
        }

        console.log(previews);
        setModalValue(
          `(${
            Number(decryptSlug.imageCount) - previews.filter((item) => item !== '').length
          }) Imagens faltando`
        );
        return;
      }

      const maxRetries: number = 4;

      for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
        try {
          setIsPopupValue(generateConnectingMessage(retryCount));

          const response = await internalApi.post('/api/bridge', {
            baseURL: '/api/tec/running/construction/class-f/finished-dgoandbox',
            protocol: decryptSlug.protocol,
            latitude: latitude,
            longitude: longitude,
            address: address,
            dgoandbox_name: decryptSlug.dgoandbox,
            dgoandbox_id: Number(decryptSlug.selectedTab),
            node_name: 'TESTE',
            observation: 'TESTE'
          });

          const { success } = response.data;

          if (success) {
            setSuccessfullyCompleted(true);
            setIsPopupValue('');
            setIconSvgModal(checkedSvg);
            setModalValue('Caixa finalizada com êxito.');
            await TimedWait(3000);
            router.push(`/dashboard/tec/running/construction/class-f/${params.slug}`, { scroll: false });
            break;
          }
        } catch (error) {
          if (retryCount === maxRetries - 1) {
            setModalValue('Não foi possível finalizar a caixa após várias tentativas.');
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

    if (!location.latitude || !location.latitude) {
      setRunningLoad(false);
      return;
    }

    for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
      try {
        const response = await internalApi.post('/api/bridge', {
          baseURL: '/api/tec/running/construction/class-f/address-api',
          latitude: String(location.latitude),
          longitude: String(location.longitude)
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

  const handleFileChange = (files: File, index: number) => {
    if (files) {
      const previewUrl = URL.createObjectURL(files);
      setPreviews((prevPreviews) => {
        const newPreviews = [...prevPreviews];
        newPreviews[index] = previewUrl;
        return newPreviews;
      });
    }
  };

  const propsImage = {
    priority: true,
    loading: 'eager',
    width: 50,
    height: 50
  } as propsImageType;

  type EventTypes = React.MouseEvent<HTMLDialogElement, MouseEvent>;

  const handleClickOutsideDialog = (event: EventTypes) => {
    const { clientX, clientY } = event.nativeEvent;
    if (dialogRef.current) {
      const rect = dialogRef.current.getBoundingClientRect();
      if (rect.left > clientX || rect.right < clientX || rect.top > clientY || rect.bottom < clientY) {
        dialogRef.current.close();
        setIsModalOpen(false);
      }
    }
  };

  const latDirection = Number(latitude) >= 0 ? 'N' : 'S';
  const lonDirection = Number(longitude) >= 0 ? 'E' : 'W';

  const absLat = Math.abs(Number(latitude)).toFixed(7);
  const absLon = Math.abs(Number(longitude)).toFixed(7);

  return (
    <>
      <S.Container>
        <S.Title>{decryptSlug.dgoandbox}</S.Title>
        {runningLoad && <p>Loading...</p>}
        {loading && <p>Carregando endereço...</p>}
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
            value={latitude && `${absLat}°${latDirection}`}
            disabled
          />

          <S.Input
            type="text"
            id="boxOrCableNomenclature"
            placeholder="Longitude"
            value={longitude && `${absLon}°${lonDirection}`}
            disabled
          />

          <S.MapButton
            onClick={() => {
              setLongitude(String(location.longitude ?? '00.000000'));
              setLatitude(String(location.latitude ?? '00.000000'));
              onClickButtonAddressApi();
            }}
          >
            <Image {...propsImage} src={mapSvg} alt="map" />
          </S.MapButton>

          <S.ContainerCardImages>
            {Array.from({ length: Number(decryptSlug.imageCount) }, (_, index) => (
              <button
                key={String(index)}
                onClick={() => {
                  if (address.trim() === '' || latitude.trim() === '' || longitude.trim() === '') {
                    setModalValue('Certifique-se de que todas as <br/> informações foram preenchidas.');
                    return;
                  }

                  handleOpenDialog();
                  setIndexImageCapture(index);
                }}
              >
                {previews[index] ? (
                  <>
                    <Image
                      src={previews[index] || ''}
                      priority
                      loading="eager"
                      alt="Uploaded Image"
                      style={{
                        minWidth: '5rem',
                        minHeight: '5rem',
                        borderRadius: '1rem',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        border: '0.2rem solid #6A6C6A'
                      }}
                      width={10}
                      height={100}
                    />
                    {uploadProgress[index] !== undefined && <p>{uploadProgress[index]}%</p>}
                  </>
                ) : (
                  <Image {...{ ...propsImage, width: 40, height: 40 }} src={addImage} alt="add-image" />
                )}
              </button>
            ))}
          </S.ContainerCardImages>

          <S.Button onClick={handleSubmit}>Concluir</S.Button>
        </S.FormContainer>
        {errorGeoLocation && <p>Error: {errorGeoLocation}</p>}
        {errorUploadImage && <p>{errorUploadImage}</p>}
        {modalValue && !isPopupValue && <Modal icon={iconSvgModal} message={modalValue} />}
        {isPopupValue && <FullScreenLoading message={isPopupValue} />}
      </S.Container>
      <S.DialogQr ref={dialogRef} onClick={handleClickOutsideDialog}>
        {isModalOpen && (
          <CameraCapture
            latitude={latitude && `${absLat}°${latDirection}`}
            longitude={longitude && `${absLon}°${lonDirection}`}
            address={address}
            onCapture={(file) => handleCapture(file).then(handleCloseDialog)}
          />
        )}
      </S.DialogQr>
    </>
  );
}
