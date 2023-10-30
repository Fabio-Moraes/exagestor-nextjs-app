'use client';

import { ReactNode, createContext, useContext, useState } from 'react';

type StateContext = {
  loading: boolean;
  setLoading: (value: boolean) => void;

  perPage: number;
  setPerPage: (value: number) => void;
};

type ProviderProps = {
  children: ReactNode;
};

export const Context = createContext({} as StateContext);

const ContextProvider = ({ children }: ProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [perPage, setPerPage] = useState(0);

  return (
    <Context.Provider
      value={
        {
          loading,
          setLoading,

          perPage,
          setPerPage,
        } as StateContext
      }
    >
      {children}
    </Context.Provider>
  );
};

function useContexState() {
  const context = useContext(Context);
  return context;
}

export { ContextProvider, useContexState };
