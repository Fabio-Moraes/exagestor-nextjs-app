import { Inter } from 'next/font/google';
import React from 'react';

import StyledComponentsRegistry from 'lib/registry';

import { ContextProvider } from '../hooks/useGlobalContext';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: {
        default: 'Novo Serviço | Exa Telecom',
        template: '%s | Exa Telecom'
    }
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html>
            <body className={inter.className}>
                <StyledComponentsRegistry>
                    <ContextProvider>
                        {children}
                    </ContextProvider>
                </StyledComponentsRegistry>
            </body>
        </html>
    );
}
