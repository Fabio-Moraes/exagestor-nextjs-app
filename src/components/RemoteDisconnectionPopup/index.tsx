'use client';

import { useEffect, useRef } from 'react';

import * as animationData from './_assets/lottie/animation.json';

import { Player } from '@lottiefiles/react-lottie-player';
import { useRemoteDisconnectionPopup } from 'store/remoteDisconnectionPopup';

import * as S from './styles';

export function RemoteDisconnectionPopup() {
  const { open, role } = useRemoteDisconnectionPopup(
    (state) => state.remoteDisconnectionPopup
  );

  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleOpenDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const handleCloseDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
      window.location.reload();
    }
  };

  useEffect(() => {
    if (open) handleOpenDialog();
  }, [open]);

  const Content = ({ role }: { role: string }) => {
    const obj = {
      myself: (
        <>
          <h1>
            Você está sendo desconectado remotamente devido à atividade da sua conta em outro
            dispositivo.
          </h1>
          <p>Se não foi você, altere sua senha e verifique a segurança da sua conta.</p>
        </>
      ),
      admin: (
        <>
          <h1>Você foi desconectado pelo administrador do sistema.</h1>
          <p>Se houver dúvidas ou preocupações, entre em contato com o suporte técnico.</p>
        </>
      )
    } as { [key: string]: JSX.Element };
    return obj[role];
  };

  return (
    <S.Container ref={dialogRef}>
      <Content role={role} />
      <div>
        <Player
          src={animationData}
          loop
          autoplay
          speed={0.8}
          style={{ top: 0, height: '25rem', width: '25rem' }}
        />
      </div>
      <div>
        <button
          onClick={() => {
            handleCloseDialog();
          }}
        >
          <p>Entendido</p>
        </button>
      </div>
    </S.Container>
  );
}
