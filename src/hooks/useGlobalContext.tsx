'use client';

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';

type ServiceItem = {
  [key: string]: number;
};

type StateContext = {
  selectMaterial: { [key: string]: ServiceItem };
  setSelectMaterial: React.Dispatch<
    React.SetStateAction<{ [key: string]: ServiceItem }>
  >;

  selectService: { [key: string]: ServiceItem };
  setSelectService: React.Dispatch<
    React.SetStateAction<{ [key: string]: ServiceItem }>
  >;

  observationBox: { [key: string]: string };
  setObservationBox: React.Dispatch<
    React.SetStateAction<{ [key: string]: string }>
  >;
};

type ProviderProps = {
  children: ReactNode;
};

const initialState: StateContext = {
  selectMaterial: {},
  setSelectMaterial: () => {},
  selectService: {},
  setSelectService: () => {},
  observationBox: {},
  setObservationBox: () => {}
};

export const Context = createContext<StateContext>(initialState);

export const ContextProvider = ({ children }: ProviderProps) => {
  const isClient = typeof window !== 'undefined';

  const [selectService, setSelectService] = useState<{
    [key: string]: ServiceItem;
  }>(isClient ? JSON.parse(localStorage.getItem('selectService') || '{}') : {});

  const [selectMaterial, setSelectMaterial] = useState<{
    [key: string]: ServiceItem;
  }>(
    isClient ? JSON.parse(localStorage.getItem('selectMaterial') || '{}') : {}
  );

  const [observationBox, setObservationBox] = useState<{
    [key: string]: string;
  }>(
    isClient ? JSON.parse(localStorage.getItem('observationBox') || '{}') : {}
  );

  useEffect(() => {
    if (isClient) {
      Object.keys(selectService).length > 0
        ? localStorage.setItem('selectService', JSON.stringify(selectService))
        : localStorage.removeItem('selectService');

      Object.keys(selectMaterial).length > 0
        ? localStorage.setItem('selectMaterial', JSON.stringify(selectMaterial))
        : localStorage.removeItem('selectMaterial');

      Object.keys(observationBox).length > 0
        ? localStorage.setItem('observationBox', JSON.stringify(observationBox))
        : localStorage.removeItem('observationBox');
    }
  }, [selectService, selectMaterial, observationBox, isClient]);

  return (
    <Context.Provider
      value={{
        selectMaterial,
        setSelectMaterial,
        selectService,
        setSelectService,
        observationBox,
        setObservationBox
      }}
    >
      {children}
    </Context.Provider>
  );
};

export function useContexState(): StateContext {
  return useContext(Context);
}
