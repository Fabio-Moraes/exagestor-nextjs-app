'use client';

import { useEffect, useState } from 'react';

import { AnimatePresence } from 'framer-motion';
import { useWebsocketConnected } from 'store/websocketConnected';

import * as S from './styles';

export function Notificationbar() {
  const [firstPercentageRandom, setFirstPercentageRandom] = useState('0%');
  const [lastPercentageRandom, setLastPercentageRandom] = useState('0%');
  const [shouldRender, setShouldRender] = useState(false);

  const websocketConnected = useWebsocketConnected((status) => status.websocketConnected);

  const generateRandomPercentage = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };

  useEffect(() => {
    const firstPercentage = `${generateRandomPercentage(30, 50)}%`;
    const lastPercentage = `${generateRandomPercentage(70, 90)}%`;
    setFirstPercentageRandom(firstPercentage);
    setLastPercentageRandom(lastPercentage);

    const timer = setTimeout(() => {
      setShouldRender(!websocketConnected);
    }, 1000);

    return () => clearTimeout(timer);
  }, [websocketConnected]);

  return (
    <AnimatePresence>
      {shouldRender && (
        <S.Container
          $fullProgress={websocketConnected}
          style={
            {
              '--first-percentage-random': firstPercentageRandom,
              '--last-percentage-random': lastPercentageRandom
            } as { [key: string]: string }
          }
          initial={{
            marginBottom: '-3rem',
            transform: 'translateY(-100%)'
          }}
          animate={{
            transform: 'translateY(0)',
            marginBottom: '0',
            transition: {
              duration: 0.5
            }
          }}
          exit={{
            marginBottom: '-3rem',
            transform: 'translateY(-100%)',
            transition: {
              duration: 0.5
            }
          }}
        >
          <p>Conectando-se ao servidor</p>
        </S.Container>
      )}
    </AnimatePresence>
  );
}
