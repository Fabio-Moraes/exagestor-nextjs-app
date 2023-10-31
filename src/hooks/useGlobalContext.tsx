'use client';

import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react';

type ServiceItem = {
  [key: string]: number;
};

type StateContext = {
  selectMaterial: { [key: string]: ServiceItem };
  setSelectMaterial: Dispatch<SetStateAction<{ [key: string]: ServiceItem }>>;

  selectService: { [key: string]: ServiceItem };
  setSelectService: Dispatch<SetStateAction<{ [key: string]: ServiceItem }>>;
};

type ProviderProps = {
  children: ReactNode;
};

export const Context = createContext({} as StateContext);

const ContextProvider = ({ children }: ProviderProps) => {
  const [selectService, setSelectService] = useState<{ [key: string]: ServiceItem }>({});
  const [selectMaterial, setSelectMaterial] = useState<{ [key: string]: ServiceItem }>({});

  return (
    <Context.Provider
      value={{
        selectMaterial,
        setSelectMaterial,

        selectService,
        setSelectService,
      }}
    >
      {children}
    </Context.Provider>
  );
};

function useContexState(): StateContext {
  const context = useContext(Context);
  return context;
}

export { ContextProvider, useContexState };
