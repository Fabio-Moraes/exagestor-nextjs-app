import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
import { MenuBar } from 'components/MenuBar';
import { SideBar } from 'components/SideBar';

import { List } from './components/List';

import { Container, Main, Wrapper } from './styles';

export const metadata = {
  title: 'Em Execução'
};

export default function Home() {
  return (
    <Container>
      <Wrapper>
        <MenuBar />
        <Main>
          <Header />
          {/*<Form />*/}
          {/*<Concluded />*/}
          <List />
          <Footer />
        </Main>
        <SideBar />
      </Wrapper>
    </Container>
  );
}
