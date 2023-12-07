import { ContextProvider } from '../hooks/useGlobalContext';

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
          <ContextProvider>{children}</ContextProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
