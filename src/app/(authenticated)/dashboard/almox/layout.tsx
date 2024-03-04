import React from 'react';

import { Header } from './_components/Header';
import { LeftSidebar } from './_components/LeftSidebar';
import { RightSidebar } from './_components/RightSidebar';
import { Toolbar } from './_components/Toolbar';
import { Footer } from 'components/Footer';

import { Container, Main, Wrapper } from '../styles';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <Wrapper>
        <LeftSidebar />
        <Main>
          <Header />
          <Toolbar />
          {children}
          <Footer />
        </Main>
        <RightSidebar />
      </Wrapper>
    </Container>
  );
}
