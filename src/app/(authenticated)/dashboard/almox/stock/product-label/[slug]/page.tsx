'use client';

import { useEffect, useState, useRef } from 'react';
import QrCode from 'react-qr-code';

import { FullScreenLoading } from 'components/FullScreenLoading';
import { decryptObject } from 'functions';
import { TimedWait } from 'functions/TimedWait';
import { useHandlePrint } from 'hooks/useHandlePrint';
import { internalApi } from 'services/apiAxios';

import * as animationData from './_assets/lottie/animation.json';

import { Player } from '@lottiefiles/react-lottie-player';

import * as S from './styles';

type Materials = {
  id: number;
  product_name: string;
  unit_type: string;
  product_code: string;
  quantity_value: string;
  created_at: string;
};

interface SlugType {
  params: {
    slug: string;
  };
}

export default function ProductLabel({ params }: SlugType) {
  const [connectionError, setConnectionError] = useState(false);
  const [isPopupValue, setIsPopupValue] = useState<string | null>(null);
  const [materials, setMaterials] = useState<Materials[]>([]);
  const [processPrint, setProcessPrint] = useState(false);

  const maxRetries = 4;
  const decryptSlug = decryptObject(params.slug);

  const elementRef = useRef<HTMLDivElement>(null);

  function generateConnectingMessage(count: number): string {
    return count > 0 ? `Conectando<br>Tentativa (${count + 1})` : 'Conectando';
  }

  async function fetchServices() {
    setConnectionError(false);

    for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
      try {
        setIsPopupValue(generateConnectingMessage(retryCount));

        const response = await internalApi.post('/api/bridge', {
          baseURL: '/api/almox/stock',
          productAll: false,
          productCode: decryptSlug.product_code
        });

        setIsPopupValue(null);
        setMaterials(response.data);
        break;
      } catch (error: unknown) {
        if (error instanceof Error) {
          const customError = error as CustomError;
          if (customError.response) {
            const statusCode = customError.response.status;
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
    fetchServices();
  }, []);

  const [handleToPrinter] = useHandlePrint({
    elementRef: elementRef,
    onBeforePrint: () => setProcessPrint(true),
    onAfterPrint: () => setProcessPrint(false)
  });

  const [handleToSavePdf] = useHandlePrint({
    download: true,
    elementRef: elementRef,
    onBeforePrint: () => setProcessPrint(true),
    onAfterPrint: () => setProcessPrint(false)
  });

  return (
    <S.Container>
      <S.Title>Etiqueta</S.Title>
      {isPopupValue && <FullScreenLoading message={isPopupValue} />}
      {connectionError ? (
        <S.ErrorContainer>
          <span>
            Não foi possível consultar o histórico devido a instabilidade na conexão. Por
            favor, tente novamente.
          </span>
        </S.ErrorContainer>
      ) : (
        <S.Wrapper>
          <S.Info ref={elementRef}>
            <p>{materials[0]?.product_name}</p>
            <QrCode value={materials[0]?.product_code ?? ''} />
            <p>{materials[0]?.product_code}</p>
          </S.Info>
          {!processPrint ? (
            <S.WrapperButton>
              <S.Button onClick={handleToPrinter}>Imprimir</S.Button>
              <S.Button onClick={handleToSavePdf}>Salvar como PDF</S.Button>
            </S.WrapperButton>
          ) : (
            <S.WrapperSpinner>
              <div>
                <Player
                  src={animationData}
                  loop
                  autoplay
                  speed={1.5}
                  style={{ height: '10rem', width: '10rem' }}
                />
              </div>
              <p>Aguarde um instante enquanto geramos o cupom do produto.</p>
            </S.WrapperSpinner>
          )}
        </S.Wrapper>
      )}
    </S.Container>
  );
}
