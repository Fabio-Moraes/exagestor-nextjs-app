import { ContextProvider } from '../hooks/useGlobalContext';

import { WebSocketProvider } from './_contexts/WebSocketContext';

// import { WebSocketProvider } from 'contexts/WebSocketContext';
import StyledComponentsRegistry from 'lib/registry';

import './globals.css';

export const metadata = {
  title: {
    default: 'Novo Serviço | Exa Telecom',
    template: '%s | Exa Telecom'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <StyledComponentsRegistry>
          <ContextProvider>
            <WebSocketProvider>{children}</WebSocketProvider>
          </ContextProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
