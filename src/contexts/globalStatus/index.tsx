'use client';

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState
} from 'react';

type ServiceItem = {
  [key: string]: number;
};

type StateContext = {
  web: ServiceItem;
  setWeb: Dispatch<SetStateAction<ServiceItem>>;

  open: ServiceItem;
  setOpen: Dispatch<SetStateAction<ServiceItem>>;
};

type ProviderProps = {
  children: ReactNode;
};

const GlobalStatusContext = createContext({} as StateContext);

const GlobalStatusProvider = ({ children }: ProviderProps) => {
  const [web, setWeb] = useState<ServiceItem>({});
  const [open, setOpen] = useState<ServiceItem>({});

  return (
    <GlobalStatusContext.Provider
      value={{
        web,
        setWeb,

        open: open,
        setOpen
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
