import StyledComponentsRegistry from 'lib/registry';

import 'themes/css';

export const metadata = {
  title: {
    default: 'Novo Serviço | EXATELECOM',
    template: '%s | EXATELECOM'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html data-theme="wmax">
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
