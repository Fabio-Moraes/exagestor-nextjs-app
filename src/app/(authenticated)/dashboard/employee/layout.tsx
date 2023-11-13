import React from 'react';

import { Footer } from 'components/Footer';
import { Header } from 'components/Header/employee';
import { RightMenu } from 'components/RightMenu/employee';
import { SideBar } from 'components/SideBar';
import { TopMenu } from 'components/TopMenu/employee';

import { Container, Main, Wrapper } from '../employee/styles';

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
