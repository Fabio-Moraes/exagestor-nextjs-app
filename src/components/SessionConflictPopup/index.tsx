'use client';

import { useEffect, useRef /* , useEffect */, useState } from 'react';

import apiRoute from 'services/apiRoute';

import * as animationData from './_assets/lottie/animation.json';

import { Player } from '@lottiefiles/react-lottie-player';
import { useWebSocketListenerOn, useWebSocket } from 'contexts/webSocket';

import { Container } from './styles';

//type EventTypes = React.MouseEvent<HTMLDialogElement, MouseEvent>;

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
    const { data } = await apiRoute.post('/api/user');
    setDataUser(data);
  };

  const disconnected = async () => {
    //handleCloseDialog();
    await apiRoute.post('/api/logout');
    if (socket) socket.emit('DISCONNECTED_USER');
    window.location.reload();
  };

  useEffect(() => {
    user();
  }, []);

  // const handleClickOutsideDialog = (event: EventTypes) => {
  //   const { clientX, clientY } = event.nativeEvent;
  //   if (dialogRef.current) {
  //     const rect = dialogRef.current.getBoundingClientRect();
  //     if (
  //       rect.left > clientX ||
  //       rect.right < clientX ||
  //       rect.top > clientY ||
  //       rect.bottom < clientY
  //     ) {
  //       dialogRef.current.close();
  //     }
  //   }
  // };

  return (
    <Container ref={dialogRef}>
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
            if (socket) socket.emit('SESSION_CONFLICT_REMOVE', dataUser);
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
    </Container>
  );
}
