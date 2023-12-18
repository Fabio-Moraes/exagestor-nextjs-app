'use client';

import { ReactNode, createContext, useContext, useState } from 'react';

type StateContext = {
  runningLoad: boolean;
  setRunningLoad: (value: boolean) => void;
};

type ProviderProps = {
  children: ReactNode;
};

export const Context = createContext({} as StateContext);

export const ContextProvider = ({ children }: ProviderProps) => {
  const [runningLoad, setRunningLoad] = useState(false);

  return (
    <Context.Provider
      value={
        {
          runningLoad,
          setRunningLoad
        } as StateContext
      }
    >
      {children}
    </Context.Provider>
  );
};

export function useContexState(): StateContext {
  return useContext(Context);
}
