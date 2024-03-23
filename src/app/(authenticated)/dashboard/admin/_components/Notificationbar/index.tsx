'use client';

import { useEffect, useState } from 'react';

import { useGlobalStatus } from 'contexts/globalStatus';
import { AnimatePresence } from 'framer-motion';

import { Container } from './styles';

export function Notificationbar() {
  const [progress, setProgress] = useState('');
  const { websocketConnected, openNotificationbar } = useGlobalStatus();

  useEffect(() => {
    const generateProgress = () => {
      setProgress(`${Math.random() * (90 - 40) + 40}%`);
    };

    generateProgress();
  }, []);

  return (
    <AnimatePresence>
      {!openNotificationbar && (
        <Container
          $fullProgress={websocketConnected}
          style={{ '--progress': progress } as { [key: string]: string }}
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
        </Container>
      )}
    </AnimatePresence>
  );
}
