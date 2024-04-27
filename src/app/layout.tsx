import StyledComponentsRegistry from 'lib/registry';

import '../css/globals.css';
import '../css/colors.css';
import '../css/fonts.css';

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
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
