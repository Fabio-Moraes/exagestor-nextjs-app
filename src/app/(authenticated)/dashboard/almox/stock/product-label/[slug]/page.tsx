'use client';

import { useEffect, useState, useRef } from 'react';
import QrCode from 'react-qr-code';

import { FullScreenLoading } from 'components/FullScreenLoading';
import { decryptObject } from 'functions';
import { TimedWait } from 'functions/TimedWait';
import { internalApi } from 'services/apiAxios';

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

  const maxRetries = 4;
  const decryptSlug = decryptObject(params.slug);

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

  const elementRef = useRef<HTMLDivElement>(null);

  const captureImageAndSaveAsPdf = (product_code: string) => {
    const element = elementRef.current;

    if (element) {
      import('html2pdf.js').then(({ default: html2pdf }) => {
        html2pdf(element, {
          margin: 10,
          filename: `ETIQUETA_${product_code}.pdf`,
          image: { type: 'png', quality: 1 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'mm', format: 'a5', orientation: 'p' }
        });
      });

      element.style.textAlign = 'center';
      element.style.margin = '0 auto';
    }
  };

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
          {materials && (
            <S.Button onClick={() => captureImageAndSaveAsPdf(materials[0]?.product_code)}>
              Salvar etiqueta
            </S.Button>
          )}
        </S.Wrapper>
      )}
    </S.Container>
  );
}
