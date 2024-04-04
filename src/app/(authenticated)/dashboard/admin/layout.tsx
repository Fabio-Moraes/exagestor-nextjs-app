import React from 'react';

import { Header } from './_components/Header';
//import { HeaderFirst } from './_components/HeaderFirst';
import { LeftSidebar } from './_components/LeftSidebar';
import { Notificationbar } from './_components/Notificationbar';
import { RightSidebar } from './_components/RightSidebar';
import { Toolbar } from './_components/Toolbar';
import { Footer } from 'components/Footer';

import { Container, Main, Wrapper, Stickybar } from '../styles';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <Wrapper>
        <LeftSidebar />
        <Main>
          <Header />
          {/* <HeaderFirst /> */}
          <Stickybar>
            <Toolbar />
            <Notificationbar />
          </Stickybar>
          {children}
          <Footer />
        </Main>
        <RightSidebar />
      </Wrapper>
    </Container>
  );
}
