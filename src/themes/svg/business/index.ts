'use client';

import * as exatelecom from './exatelecom';
import * as wmax from './wmax';

import { useBusiness } from 'store/business';

const businessIcons = { wmax, exatelecom };

function getCurrentBusinessTheme() {
  const business = useBusiness((state) => state.business);
  return businessIcons[business];
}

export { getCurrentBusinessTheme };
