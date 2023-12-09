'use client';

import { useEffect, useRef } from 'react';

import { Form } from './components/Form';

import { Container, Main, Wrapper } from './styles';

export default function SignIn() {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const setupWebSocket = () => {
      try {
        const newSocket = new WebSocket('wss://exatelecom-server.vercel.app');

        newSocket.addEventListener('open', () => {
          console.log('Conectado ao servidor WebSocket.');
          socketRef.current = newSocket;
        });

        newSocket.addEventListener('message', (event) => {
          const parsedMessage = JSON.parse(event.data);

          if (parsedMessage.event === 'ON_USERS') {
            console.log('Evento ON_USERS recebido:', parsedMessage.data);
            // Faça algo com os dados recebidos, por exemplo, atualizar a interface do usuário
          }
        });

        newSocket.addEventListener('close', (event) => {
          console.log('Conexão fechada:', event);

          // Lógica para lidar com a reconexão se necessário
          // Por exemplo, você pode tentar reconectar após um curto período de tempo
          setTimeout(() => {
            console.log('Tentando reconectar...');
            setupWebSocket();
          }, 5000); // Tente reconectar após 5 segundos
        });

        newSocket.addEventListener('error', (error) => {
          console.error('Erro na conexão WebSocket:', error);
        });

        return () => {
          newSocket.close();
        };
      } catch (error) {
        console.error('Erro ao configurar a conexão WebSocket:', error);
      }
    };

    setupWebSocket();
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
