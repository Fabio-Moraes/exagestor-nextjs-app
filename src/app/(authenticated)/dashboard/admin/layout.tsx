import React from 'react';

import { ContextProvider } from './hooks/useGlobalContext';
import { Footer } from 'components/Footer';
import { Header } from 'components/Header/admin';
import { RightMenu } from 'components/RightMenu/admin';
import { SideBar } from 'components/SideBar';
import { TopMenu } from 'components/TopMenu/admin';

import { Container, Main, Wrapper } from '../tec/styles';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ContextProvider>
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
    </ContextProvider>
  );
}
