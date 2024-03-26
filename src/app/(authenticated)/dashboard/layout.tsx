import React from 'react';

import { SessionConflictPopup } from 'components/SessionConflictPopup';

import { AppProvider } from 'contexts';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      {children}
      <SessionConflictPopup />
    </AppProvider>
  );
}
