'use client';

import { Container, Wrapper } from './styles';

export function Footer() {
  return (
    <Container>
      <Wrapper>
        <div>
          <h1>© COPYRIGHT 2024 - EXACODE</h1>
        </div>
        <span>TODOS OS DIREITOS RESERVADOS.</span>
      </Wrapper>
    </Container>
  );
}

/* export function Footer() {
  return (
    <Container>
      <Wrapper>
        <div>
          <h1>Construído com</h1>
          <Image priority src={coffee} alt="Coffee" width={22} height={25} />
          <h1>e</h1>
          <Image priority src={code} alt="Code" width={20} height={20} />
          <h1>por Fabio Moraes</h1>
        </div>
        <span>TODOS OS DIREITOS RESERVADOS.</span>
      </Wrapper>
    </Container>
  );
} */
