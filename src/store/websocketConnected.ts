import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface websocketConnectedState {
  websocketConnected: boolean;
  updateWebsocketConnected: (by: boolean) => void;
}

export const useWebsocketConnected = create<websocketConnectedState>()(
  persist(
    (set) => ({
      websocketConnected: false,
      updateWebsocketConnected: (connected: boolean) => set(() => ({ websocketConnected: connected }))
    }),
    {
      name: 'websocket-connected-store' // default to LocalStorage
    }
  )
);
