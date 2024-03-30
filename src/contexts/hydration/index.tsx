'use client';

import { useEffect } from 'react';

import { useWebsocketConnected } from 'store/websocketConnected';
//import { useWebsocketConnected2 } from 'store/websocketConnected2';

const Hydration = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    useWebsocketConnected.persist.rehydrate();
    //useWebsocketConnected2.persist.rehydrate();
  }, []);

  return <>{children}</>;
};

export { Hydration };
