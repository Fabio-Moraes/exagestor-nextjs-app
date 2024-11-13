import type React from 'react';

import { RemoteDisconnectionPopup } from 'components/RemoteDisconnectionPopup';
import { SessionConflictPopup } from 'components/SessionConflictPopup';

import { AppProvider } from 'contexts';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      {children}
      <RemoteDisconnectionPopup />
      <SessionConflictPopup />
    </AppProvider>
  );
}
