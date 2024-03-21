import React from 'react';

import { AppProvider } from 'contexts';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <AppProvider>{children}</AppProvider>;
}
