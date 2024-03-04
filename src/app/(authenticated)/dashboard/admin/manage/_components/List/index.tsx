'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { LineSkaleton } from 'components/LineSkaleton';
import Image from 'components/Vercel/Image';

import ListItem from '../ListItem';

import searchSvg from './_assets/svg/search.svg';

import { Button, ItemsSkeleton, ListContainer, SearchBar, SearchWrapper } from './styles';

interface Service {
  id: number;
  name: string;
  role: string;
  identification: string;
  created_at: string;
}

export function List({ service }: { service: Service[] }) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const filteredItems = service?.filter((item) =>
    item.name
      .toLowerCase()
      .concat(item.identification.replace(/[.\-/]/g, ''))
      .includes(searchTerm.toLowerCase().replace(/[.\-/]/g, ''))
  );

  return (
    <ListContainer>
      <div>
        <SearchWrapper>
          <Image priority src={searchSvg} alt="Book" width={25} height={25} />
          <SearchBar
            type="text"
            placeholder="Pesquisar funcionários..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchWrapper>
        <div>
          <Button
            rel="preload"
            onClick={() => router.push(`/dashboard/admin/manage/general-historic`)}
          >
            Historico Geral
          </Button>
          <Button rel="preload" onClick={() => {}}>
            Relatorio
          </Button>
        </div>
      </div>
      {isLoading
        ? [...Array(4)].map((_, index) => {
            return (
              <ItemsSkeleton key={String(index)}>
                <LineSkaleton width="14rem" />
                <LineSkaleton width="19rem" />
                <LineSkaleton width="25rem" />
                <LineSkaleton width="10rem" />
              </ItemsSkeleton>
            );
          })
        : filteredItems.map((item) => <ListItem key={String(item.id)} {...item} />)}
    </ListContainer>
  );
}
