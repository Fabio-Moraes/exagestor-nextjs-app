import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
import { MenuBar } from 'components/MenuBar';
import { SideBar } from 'components/SideBar';

import { Form } from './components/Form';
import { Container, Main, Wrapper } from './styles';

export default function NewService() {
  return (
    <Container>
      <Wrapper>
        <MenuBar />
        <Main>
          <Header />
          <Form />
          <Footer />
        </Main>
        <SideBar />
      </Wrapper>
    </Container>
  );
}
