import React from 'react';

import { WebSocketProvider } from 'contexts/WebSocketContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <WebSocketProvider>{children}</WebSocketProvider>;
}
