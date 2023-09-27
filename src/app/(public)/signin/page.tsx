import { Form } from './components/Form';
import { Container, Main, Wrapper } from './styles';

export default function NewService() {
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
