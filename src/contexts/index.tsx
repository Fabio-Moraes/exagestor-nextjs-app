import { Hydration } from './hydration';
import { LocalStorageProvider } from './localStorage';
import { WebSocketProvider } from './webSocket';

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Hydration>
      <LocalStorageProvider>
        <WebSocketProvider>{children}</WebSocketProvider>
      </LocalStorageProvider>
    </Hydration>
  );
};
