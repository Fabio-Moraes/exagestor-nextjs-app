import { create } from 'zustand';

type SelectedCable = {
  id: number;
  description: string;
  cable_length_meters?: number;
  status: string;
};

type SelectedCableStore = {
  selectedCable: SelectedCable[];
  setSelectedCable: (data: SelectedCable[]) => void;
  editSelectedCable: (id: number, value: number) => void;
};

export const usetaskStore = create<SelectedCableStore>((set) => ({
  selectedCable: [],
  setSelectedCable: (data) =>
    set(() => ({
      selectedCable: data
    })),
  editSelectedCable: (id, value) =>
    set((state) => ({
      selectedCable: state.selectedCable.map((selectedCable) =>
        selectedCable.id === id
          ? { ...selectedCable, cable_length_meters: value }
          : selectedCable
      )
    }))
}));
