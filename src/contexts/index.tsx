import { LocalStorageProvider } from '../contexts/localStorage';

import { WebSocketProvider } from 'contexts/webSocket';

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <LocalStorageProvider>
      <WebSocketProvider>{children}</WebSocketProvider>
    </LocalStorageProvider>
  );
};
