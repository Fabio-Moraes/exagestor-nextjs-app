'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { LineSkaleton } from 'components/LineSkaleton';

import ListItem from '../ListItem';
//import infoSvg from './assets/svg/info.svg';
import searchSvg from './assets/svg/search.svg';
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
        <div>{/* <Image priority src={infoSvg} alt="Add"  width="30" height="30" /> */}</div>
      </div>
      {isLoading
        ? [...Array(4)].map((_, index) => {
            return (
              <ItemsSkeleton key={String(index)}>
                <LineSkaleton width="140px" />
                <LineSkaleton width="190px" />
                <LineSkaleton width="250px" />
                <LineSkaleton width="100px" />
              </ItemsSkeleton>
            );
          })
        : filteredItems.map((item) => <ListItem key={String(item.id)} {...item} />)}
      <div>
        <Button onClick={() => {}}>Historico</Button>
        <Button onClick={() => {}}>Relatorio</Button>
      </div>
    </ListContainer>
  );
}
