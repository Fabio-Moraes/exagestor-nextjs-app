'use client';
import { useEffect } from 'react';

import { Form } from './components/Form';

import { Container, Main, Wrapper } from './styles';

/* import { ws } from 'services'; */

/* 
socket.on('connect_error', (error) => {
  console.error('Erro de conexão:', error);
});

socket.on('error', (error) => {
  console.error('Erro no socket:', error);
}); */

export default function SignIn() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const ws = new WebSocket('ws://exatelecom-server.vercel.app');

      ws.onopen = () => {
        console.log('Connected to server');
        const messageObject = { message: 'Hello, server!' };
        const messageString = JSON.stringify(messageObject);
        ws.send(messageString);
      };

      ws.onmessage = (event) => {
        if (typeof event.data === 'string') {
          const data = JSON.parse(event.data);
          if (data.event === 'ON_USERS') {
            console.log(data.payload);
          }
        }
      };

      ws.onclose = () => {
        console.log('Disconnected from server');
      };

      return () => {
        ws.close();
      };
    }
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
