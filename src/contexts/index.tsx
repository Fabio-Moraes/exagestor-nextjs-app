import { Hydration } from './hydration';
import { LocalStorageProvider } from './localStorage';
import { ThemeCompany } from './themeCompany';
import { WebSocketProvider } from './webSocket';

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Hydration>
      <ThemeCompany>
        <LocalStorageProvider>
          <WebSocketProvider>{children}</WebSocketProvider>
        </LocalStorageProvider>
      </ThemeCompany>
    </Hydration>
  );
};
