'use client';

import React, { useState } from 'react';
import { useEffect, useRef } from 'react';

import { Spinner } from 'components/Spinner';

import QrScanner from 'qr-scanner';

import * as S from './styles';

type ScannedProps = {
  handleScanned: (data: string) => void;
};

export function QRScanner({ handleScanned }: ScannedProps) {
  const videoElementRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    const video = videoElementRef.current;

    if (!video) {
      return;
    }

    const qrScanner = new QrScanner(
      video,
      (result: QrScanner.ScanResult) => {
        handleScanned(result.data);
      },
      {
        preferredCamera: 'environment',
        returnDetailedScanResult: true,
        highlightScanRegion: true,
        highlightCodeOutline: true,
        maxScansPerSecond: 1
      }
    );
    qrScanner.$canvas.getContext('2d', { willReadFrequently: true });

    video.onloadedmetadata = () => {
      console.log('player video...');
      setIsVideoPlaying(true);
    };

    qrScanner.start();

    return () => {
      qrScanner.stop();
      qrScanner.destroy();
    };
  }, []);

  return (
    <S.VideoWrapper>
      {!isVideoPlaying && (
        <>
          <div>
            <Spinner />
          </div>
          <p>Aguardando permissão para acessar a câmera.</p>
        </>
      )}
      <S.QrVideo ref={videoElementRef} />
    </S.VideoWrapper>
  );
}

export default QRScanner;
