'use client';

import { useEffect } from 'react';

import { useWebsocketConnected } from 'store/websocketConnected';

const Hydration = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    useWebsocketConnected.persist.rehydrate();
  }, []);

  return <>{children}</>;
};

export { Hydration };
