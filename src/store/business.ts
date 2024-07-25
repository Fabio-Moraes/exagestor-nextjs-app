import { create } from 'zustand';

type BusinessTypes = {
  business: 'wmax' | 'exatelecom';
  updateBusiness: (value: 'wmax' | 'exatelecom') => void;
};

export const useBusiness = create<BusinessTypes>()((set) => ({
  business: 'exatelecom',
  updateBusiness: (value: 'wmax' | 'exatelecom') => set(() => ({ business: value }))
}));
