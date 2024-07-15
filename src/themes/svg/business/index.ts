'use client';

import { internalApi } from 'services/apiAxios';

import * as exatelecom from './exatelecom';
import * as wmax from './wmax';

const businessIcons = { wmax, exatelecom };

async function fetchCompanyTheme(): Promise<'wmax' | 'exatelecom'> {
  try {
    const { data } = await internalApi.post('/api/decode/auth_token');
    return data.company;
  } catch (error) {
    console.error('Failed to fetch company theme:', error);
    throw new Error('Failed to fetch company theme');
  }
}

async function fetchBusiness() {
  const theme = await fetchCompanyTheme();
  return businessIcons[theme];
}

let currentBusiness: typeof exatelecom | typeof wmax = exatelecom;

function initializeBusiness() {
  fetchBusiness()
    .then((business) => {
      currentBusiness = business;
    })
    .catch((error) => {
      console.error('Failed to initialize business:', error);
    });
}

initializeBusiness();

function getCurrentBusinessTheme() {
  return currentBusiness;
}

export { getCurrentBusinessTheme };
