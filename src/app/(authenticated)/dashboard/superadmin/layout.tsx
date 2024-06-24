import React from 'react';

import { Header } from './_components/Header';
import { LeftSidebar } from './_components/LeftSidebar';
import { Notificationbar } from './_components/Notificationbar';
import { RightSidebar } from './_components/RightSidebar';
import { Toolbar } from './_components/Toolbar';
import { Footer } from 'components/Footer';

import * as S from '../styles';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <S.Container>
      <S.Wrapper>
        <LeftSidebar />
        <S.Main>
          <Header />
          <S.Stickybar>
            <Toolbar />
            <Notificationbar />
          </S.Stickybar>
          {children}
          <Footer />
        </S.Main>
        <RightSidebar />
      </S.Wrapper>
    </S.Container>
  );
}
