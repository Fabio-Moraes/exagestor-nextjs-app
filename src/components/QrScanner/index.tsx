'use client';

import React, { useState } from 'react';
import { useEffect, useRef } from 'react';

import { Spinner } from 'components/Spinner';

import * as animationData from './_assets/lottie/animation.json';

import { Player } from '@lottiefiles/react-lottie-player';
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
        highlightScanRegion: false,
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
      {isVideoPlaying && (
        <Player
          src={animationData}
          loop
          autoplay
          speed={1.5}
          style={{
            position: 'absolute',
            transform: 'translate(-50%, -40%)',
            width: '35rem',
            height: '35rem'
          }}
        />
      )}
    </S.VideoWrapper>
  );
}

export default QRScanner;
