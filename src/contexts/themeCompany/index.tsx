'use client';

import { useEffect, useState } from 'react';

import { FullScreenLoading } from 'components/FullScreenLoading';
import { internalApi } from 'services/apiAxios';

import { useBusiness } from 'store/business';

const asciiArt = `%c 
       ######   ########   ########   ######
     ######       ########  #####       ######
  ######           ########  ##            ######
######               ########                ######
######                ########               ######
  ######            ##  ########           ######
     ######       #####  ########       ######
       ######   ########   ########   ######`;

const ThemeCompany = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const updateBusiness = useBusiness((state) => state.updateBusiness);

  async function getTheme() {
    const { data } = await internalApi.post('/api/decode/auth_token');
    document.documentElement.setAttribute('data-theme', data.company);
    updateBusiness(data.company);
    setLoading(false);
  }

  useEffect(() => {
    console.log(asciiArt, 'color: #bada55');
    getTheme();
  }, []);

  return <>{loading ? <FullScreenLoading /> : children}</>;
};

export { ThemeCompany };
