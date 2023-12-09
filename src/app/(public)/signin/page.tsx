'use client';
import { useEffect } from 'react';

import { Form } from './components/Form';

import { Container, Main, Wrapper } from './styles';

import { socket } from 'services';

socket.on('ON_USERS', (update) => {
  console.log(JSON.parse(update));
});
export default function SignIn() {
  useEffect(() => {
    socket.on('connect', () => {});
    socket.on('connect_error', (error) => {
      console.error('Erro de conexão:', error);
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
