import React, { useRef, useState } from 'react';

import Image from 'components/Vercel/Image';
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
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);

  //const { location, error: errorGeoLocation, loading } = useGeoLocation();
  const { location } = useGeoLocation();

  const now = new Date();
  const formattedDate = formatDate(now);

  const handleCaptureClick = async () => {
    if (ref.current === null) {
      return;
    }

    try {
      const dataUrl = await toPng(ref.current);
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      setImageBlob(blob);

      onPreview(blob as File);
    } catch (error) {
      console.error('Oops, algo deu errado!', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
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
              latitude: location.latitude ?? 0,
              longitude: location.longitude ?? 0
            })}
          </p>
          <p>R. Vitório Scapin - Teodoro Sampaio</p>
          <p>{formattedDate}</p>
        </S.ContainerImagePreview>
        <button onClick={handleCaptureClick}>Capture as Image</button>
        {imageBlob && (
          <div>
            <p>Image captured and stored in state!</p>
            <Image
              src={URL.createObjectURL(imageBlob)}
              priority
              loading="eager"
              alt="Uploaded Image"
              style={{ width: '10rem', height: '10rem', borderRadius: '5rem' }}
              width={100}
              height={100}
            />
          </div>
        )}
      </header>
    </div>
  );
}

/* 
const latitude = -22.2298112;
const longitude = -50.8985344;
 */
