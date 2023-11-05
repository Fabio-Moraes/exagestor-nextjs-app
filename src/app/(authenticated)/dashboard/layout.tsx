import { Footer } from 'components/Footer';
import { MenuBar } from 'components/MenuBar';
import { SideBar } from 'components/SideBar';
import React from 'react';

import { Header } from 'components/Header';
import { TopMenu } from 'components/TopMenu';

import { Container, Main, Wrapper } from './styles';

export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <Container>
            <Wrapper>
                <MenuBar />
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
