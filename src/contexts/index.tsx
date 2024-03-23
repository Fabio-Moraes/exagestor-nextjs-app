import { GlobalStatusProvider } from './globalStatus';
import { Hydration } from './hydration';
import { LocalStorageProvider } from './localStorage';
import { WebSocketProvider } from './webSocket';

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Hydration>
      <LocalStorageProvider>
        <GlobalStatusProvider>
          <WebSocketProvider>{children}</WebSocketProvider>
        </GlobalStatusProvider>
      </LocalStorageProvider>
    </Hydration>
  );
};
