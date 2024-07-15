'use client';

import { useEffect, useState } from 'react';

import { FullScreenLoading } from 'components/FullScreenLoading';
import { internalApi } from 'services/apiAxios';

const ThemeCompany = ({ children }: { children: React.ReactNode }) => {
  const [test, setTest] = useState(false);

  async function getTheme() {
    const { data } = await internalApi.post('/api/decode/auth_token');
    document.documentElement.setAttribute('data-theme', data.company);
    setTest(true);
  }

  useEffect(() => {
    getTheme();
  }, []);

  return <>{test ? children : <FullScreenLoading />}</>;
};

export { ThemeCompany };
