'use client';

import React from 'react';
import { useEffect, useRef } from 'react';

import QrScanner from 'qr-scanner';

import * as S from './styles';

interface ScannedProps {
  handleScanned: (data: string) => void;
}

export function QRScanner({ handleScanned }: ScannedProps) {
  const videoElementRef = useRef<HTMLVideoElement>(null);

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
    qrScanner.start();

    return () => {
      qrScanner.stop();
      qrScanner.destroy();
    };
  }, []);

  return (
    <S.VideoWrapper>
      <S.QrVideo ref={videoElementRef} />
    </S.VideoWrapper>
  );
}

export default QRScanner;
