'use client';

import { useEffect } from 'react';

import { Form } from './components/Form';

import { Container, Main, Wrapper } from './styles';

const socket = new WebSocket('wss://exatelecom-server.vercel.app');

export default function SignIn() {
  useEffect(() => {
    socket.addEventListener('open', () => {
      console.log('Conectado ao servidor WebSocket.');

      // Envie uma mensagem para o servidor quando a conexão for estabelecida
      socket.send('Olá, servidor!');
    });
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
