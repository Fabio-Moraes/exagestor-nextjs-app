import { GlobalStatusProvider } from './globalStatus';
import { LocalStorageProvider } from './localStorage';
import { WebSocketProvider } from './webSocket';

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <LocalStorageProvider>
      <GlobalStatusProvider>
        <WebSocketProvider>{children}</WebSocketProvider>
      </GlobalStatusProvider>
    </LocalStorageProvider>
  );
};
