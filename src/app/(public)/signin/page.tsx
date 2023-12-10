'use client';
import { useEffect } from 'react';

import { Form } from './components/Form';

import { Container, Main, Wrapper } from './styles';

import { io } from 'socket.io-client';

export default function SignIn() {
  useEffect(() => {
    console.log('Connecting to WebSocket server...');
    const socket = io('https://exatelecom-server.vercel.app');

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socket.on('ON_USERS', (newMessage) => {
      console.log(JSON.parse(newMessage));
    });

    // Clean up the socket connection on unmount
    return () => {
      console.log('Disconnecting from WebSocket server...');
      socket.disconnect();
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
