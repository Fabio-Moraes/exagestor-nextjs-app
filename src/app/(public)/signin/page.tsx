import { Form } from './components/Form';

import { Container, Main, Wrapper } from './styles';

const socket = new WebSocket('wss://exatelecom-server.vercel.app');

export default function SignIn() {
  socket.addEventListener('open', () => {
    console.log('Conectado ao servidor WebSocket.');

    // Envie uma mensagem para o servidor quando a conexão for estabelecida
    socket.send('Olá, servidor!');
  });

  socket.addEventListener('message', (event) => {
    console.log(`Mensagem recebida do servidor: ${event.data}`);
  });

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
