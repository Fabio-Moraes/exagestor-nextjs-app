import { create } from 'zustand';

type SelectedListDgoandbox = {
  id: number;
  node?: string;
  value: string;
};

type SelectedDgoandbox = {
  id: number;
  description: string;
  quantity?: number;
  list?: SelectedListDgoandbox[];
  status: string;
  type: string;
  node: string;
};

type SelectedDgoandboxStore = {
  selectedDgoandbox: SelectedDgoandbox[];
  setSelectedDgoandbox: (data: SelectedDgoandbox[]) => void;
  editSelectedDgoandbox: (
    id: number,
    value: { quantity: number; list?: SelectedListDgoandbox[] }
  ) => void;
};

export const useSelectedDgoandboxStore = create<SelectedDgoandboxStore>((set) => ({
  selectedDgoandbox: [],
  setSelectedDgoandbox: (data) =>
    set(() => ({
      selectedDgoandbox: data
    })),
  editSelectedDgoandbox: (id, value) =>
    set((state) => ({
      selectedDgoandbox: state.selectedDgoandbox.map((selectedDgoandbox) =>
        selectedDgoandbox.id === id
          ? { ...selectedDgoandbox, quantity: value.quantity, list: value.list }
          : selectedDgoandbox
      )
    }))
}));
