'use client';
import { useEffect } from 'react';

import { Form } from './components/Form';

import { Container, Main, Wrapper } from './styles';

import io from 'socket.io-client';

export default function SignIn() {
  useEffect(() => {
    console.log('Connecting to WebSocket server...');
    const newSocket = io('wss://exatelecom-server.vercel.app', {
      transports: ['websocket']
    });

    newSocket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    newSocket.on('ON_USERS', (newMessage) => {
      console.log(JSON.parse(newMessage));
    });

    // Clean up the socket connection on unmount
    return () => {
      console.log('Disconnecting from WebSocket server...');
      newSocket.disconnect();
    };
  }, []);
  return (
    <Container>
      <Wrapper>
        <Main>
          <div>
            <Form />
          </div>
        </Main>
      </Wrapper>
    </Container>
  );
}
