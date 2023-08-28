import { Form } from './components/Form';
import { Container, Main, Wrapper } from './styles';


export default function NewService() {
  return (
    <Container>
      <Wrapper>
        {/* <MenuBar /> */}
        <Main>
          {/* <Header /> */}
          {/* <Image
          priority
          src={exa}
          alt="Axa"
          width={100}
          height={100}
        /> */}
          <div>
            <Form />
          </div>
        </Main>
        {/* <SideBar /> */}
      </Wrapper>
    </Container>
  );
}
