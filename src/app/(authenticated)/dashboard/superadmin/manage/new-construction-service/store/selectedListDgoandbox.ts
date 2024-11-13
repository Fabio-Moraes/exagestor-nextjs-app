import { create } from 'zustand';

interface ListState {
  selectedListDgoandbox: Record<string, Record<string, { value: string }>>;
  editSelectedListDgoandbox: (idSelected: string, index: string, newValue: string) => void;
  cleanSelectedListDgoandbox: (idSelected: string) => void;
}

const filterEmptyValues = (obj: Record<string, { value: string }>) => {
  return Object.fromEntries(Object.entries(obj).filter(([, item]) => item.value.trim() !== ''));
};

export const useSelectedListDgoandbox = create<ListState>()((set) => ({
  selectedListDgoandbox: {},
  cleanSelectedListDgoandbox: (idSelected) => {
    set((state) => ({
      selectedListDgoandbox: {
        ...state.selectedListDgoandbox,
        [idSelected]: {}
      }
    }));
  },

  editSelectedListDgoandbox: (idSelected, index, newValue) =>
    set((state) => {
      const updatedEntry = {
        ...state.selectedListDgoandbox[idSelected],
        [index]: { value: newValue }
      };

      const filteredList = filterEmptyValues(updatedEntry);

      return {
        selectedListDgoandbox: {
          ...state.selectedListDgoandbox,
          [idSelected]: filteredList
        }
      };
    })
}));
