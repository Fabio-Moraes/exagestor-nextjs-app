'use client';
import { useEffect } from 'react';

import { Form } from './components/Form';

import { Container, Main, Wrapper } from './styles';

export default function SignIn() {
  useEffect(() => {
    const socket = new WebSocket('wss://exatelecom-server.vercel.app');

    socket.addEventListener('open', () => {
      console.log('Conectado ao servidor WebSocket.');
    });

    socket.addEventListener('message', (event) => {
      const parsedMessage = JSON.parse(event.data);

      if (parsedMessage.event === 'ON_USERS') {
        console.log('Evento ON_USERS recebido:', parsedMessage.data);
        // Faça algo com os dados recebidos, por exemplo, atualizar a interface do usuário
      }
    });

    return () => {
      socket.close();
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
