import { create } from 'zustand';

interface remoteDisconnectionPopupState {
  remoteDisconnectionPopup: { open: boolean; role: string };
  updateRemoteDisconnectionPopup: (by: { open: boolean; role: string }) => void;
}

export const useRemoteDisconnectionPopup = create<remoteDisconnectionPopupState>()((set) => ({
  remoteDisconnectionPopup: { open: false, role: 'myself' },
  updateRemoteDisconnectionPopup: (popup: { open: boolean; role: string }) =>
    set(() => ({ remoteDisconnectionPopup: { ...popup } }))
}));
