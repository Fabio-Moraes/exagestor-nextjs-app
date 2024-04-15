'use client';

import { useEffect, useRef, useState } from 'react';

import { internalApi } from 'services/apiAxios';

import * as animationData from './_assets/lottie/animation.json';

import { Player } from '@lottiefiles/react-lottie-player';
import { useWebSocketListenerOn, useWebSocket } from 'contexts/webSocket';

import * as S from './styles';

export function SessionConflictPopup() {
  const [dataUser, setDataUser] = useState();
  const socket = useWebSocket();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleOpenDialog = () => {
    console.log('open dialog');
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const handleCloseDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  useWebSocketListenerOn('SESSION_CONFLICT_DETECTED', handleOpenDialog);

  const user = async () => {
    const { data } = await internalApi.post('/api/decode/auth_token');
    setDataUser(data);
  };

  const disconnected = async () => {
    await internalApi.post('/api/logout');
    if (socket) socket.disconnect();
    window.location.reload();
  };

  useEffect(() => {
    user();
  }, []);

  return (
    <S.Container ref={dialogRef}>
      <h1>Detectamos que sua conta está atualmente ativa em outro dispositivo.</h1>
      <p>Deseja encerrar a sessão no outro dispositivo e continuar nesta?</p>
      <div>
        <Player
          src={animationData}
          loop
          autoplay
          speed={1.5}
          style={{ top: 0, height: '20rem', width: '20rem' }}
        />
      </div>
      <div>
        <button
          onClick={() => {
            if (socket) socket.emit('SESSION_CONFLICT_DISCONNECT', dataUser);
            handleCloseDialog();
          }}
        >
          <p>Sim</p>
        </button>
        <button
          onClick={() => {
            disconnected();
          }}
        >
          <p>Não</p>
        </button>
      </div>
    </S.Container>
  );
}
