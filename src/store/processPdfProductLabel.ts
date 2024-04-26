import { create } from 'zustand';

interface processPdfProductLabelState {
  processPdfProductLabel: { process: boolean };
  updateProcessPdfProductLabel: (by: { process: boolean }) => void;
}

export const useProcessPdfProductLabel = create<processPdfProductLabelState>()((set) => ({
  processPdfProductLabel: { process: false },
  updateProcessPdfProductLabel: (status: { process: boolean }) =>
    set(() => ({ processPdfProductLabel: { ...status } }))
}));
