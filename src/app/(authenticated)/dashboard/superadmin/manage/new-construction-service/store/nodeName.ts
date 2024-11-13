import { create } from 'zustand';

type NodeNameTypes = {
  nodeName: string;
  updateNodeName: (value: string) => void;
};

export const useNodeName = create<NodeNameTypes>()((set) => ({
  nodeName: '',
  updateNodeName: (value: string) => set(() => ({ nodeName: value }))
}));
