'use client';

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState
} from 'react';

// type ServiceItem = {
// [key: string]: number;
// };

type StateContext = {
  websocketConnected: boolean;
  setWebsocketConnected: Dispatch<SetStateAction<boolean>>;

  openNotificationbar: boolean;
  setOpenNotificationbar: Dispatch<SetStateAction<boolean>>;

  // selectService: { [key: string]: ServiceItem };
  // setSelectService: Dispatch<SetStateAction<{ [key: string]: ServiceItem }>>;
};

type ProviderProps = {
  children: ReactNode;
};

const GlobalStatusContext = createContext({} as StateContext);

const GlobalStatusProvider = ({ children }: ProviderProps) => {
  const [websocketConnected, setWebsocketConnected] = useState(false);
  const [openNotificationbar, setOpenNotificationbar] = useState(false);
  // const [selectMaterial, setSelectMaterial] = useState<{ [key: string]: ServiceItem }>({});

  return (
    <GlobalStatusContext.Provider
      value={{
        // selectMaterial,
        // setSelectMaterial,
        websocketConnected,
        setWebsocketConnected,

        openNotificationbar,
        setOpenNotificationbar
      }}
    >
      {children}
    </GlobalStatusContext.Provider>
  );
};

function useGlobalStatus(): StateContext {
  const context = useContext(GlobalStatusContext);
  return context;
}

export { GlobalStatusProvider, useGlobalStatus, GlobalStatusContext };
