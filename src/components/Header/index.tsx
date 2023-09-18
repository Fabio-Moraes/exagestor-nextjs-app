'use client';

import { Container } from './styles';

import { Forehead } from './components/Forehead ';
import { Menu } from './components/Menu';

export function Header() {
  return (
    <Container>
      <Forehead />
      <Menu />
    </Container >
  );
}
