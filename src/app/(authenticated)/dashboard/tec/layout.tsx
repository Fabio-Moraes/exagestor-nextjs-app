import React from 'react';

import { Footer } from 'components/Footer';
import { Header } from 'components/Header/tec';
import { RightMenu } from 'components/RightMenu/tec';
import { SideBar } from 'components/SideBar';
import { TopMenu } from 'components/TopMenu/tec';

import { Container, Main, Wrapper } from '../styles';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <Wrapper>
        <RightMenu />
        <Main>
          <Header />
          <TopMenu />
          {children}
          <Footer />
        </Main>
        <SideBar />
      </Wrapper>
    </Container>
  );
}
