import React, { useRef } from 'react';

import { convertToDirectional, formatDate } from 'functions';
import useGeoLocation from 'hooks/useGeoLocation';

import { toPng } from 'html-to-image';

import * as S from './styles';

type PropsType = {
  value: string;
  onPreview: (i: File) => void;
};

// Definindo o tipo para o ref
export function PreviewImage(props: PropsType) {
  const { value, onPreview } = props;

  const ref = useRef<HTMLDivElement | null>(null);

  const { location, error: errorGeoLocation /*, loading */ } = useGeoLocation();

  const now = new Date();
  const formattedDate = formatDate(now);

  const handleCaptureClick = async () => {
    if (ref.current === null) {
      return;
    }

    if (errorGeoLocation) {
      alert(
        'Erro ao obter localização. Por favor, verifique suas configurações de GPS e tente novamente.'
      );
      return;
    }

    if (!location) {
      alert('Localização não disponível. Por favor, certifique-se de que o GPS está ativado.');
      return;
    }

    try {
      const dataUrl = await toPng(ref.current);
      const response = await fetch(dataUrl);
      const blob = await response.blob();

      onPreview(blob as File);
    } catch (error) {
      console.error('Oops, algo deu errado!', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ width: '0px', height: '0px', overflow: 'hidden' }}>
          <S.ContainerImagePreview
            ref={ref}
            style={{
              backgroundImage: `url(${value})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <p>
              {convertToDirectional({
                latitude: location?.latitude ?? 0,
                longitude: location?.longitude ?? 0
              })}
            </p>
            <p>R. Vitório Scapin - Teodoro Sampaio</p>
            <p>{formattedDate}</p>
          </S.ContainerImagePreview>
        </div>

        <button onClick={handleCaptureClick}>Capture as Image</button>
      </header>
    </div>
  );
}
