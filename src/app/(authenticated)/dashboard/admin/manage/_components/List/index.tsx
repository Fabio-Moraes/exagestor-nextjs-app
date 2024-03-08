'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { LineSkaleton } from 'components/LineSkaleton';
import Image from 'components/Vercel/Image';

import ListItem from '../ListItem';

import { useWebSocket } from 'contexts/WebSocketContext';

import searchSvg from './_assets/svg/search.svg';

import { Button, ItemsSkeleton, ListContainer, SearchBar, SearchWrapper } from './styles';

interface Service {
  id: number;
  name: string;
  role: string;
  identification: string;
  created_at: string;
}

interface ConnectedUser {
  id: number;
  name: string;
  role: string;
}

export function List({ service }: { service: Service[] }) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [connectedUsers, setConnectedUsers] = useState<ConnectedUser[]>([]);

  const router = useRouter();
  const socket = useWebSocket();

  const updateConnectedUsers = (data: string) => {
    const usersList = [];
    const usersObject = JSON.parse(data);
    const keys = Object.keys(usersObject);

    for (const key of keys) {
      const user = usersObject[key];
      usersList.push(user);
    }

    setConnectedUsers(usersList);
  };

  useEffect(() => {
    if (socket) {
      socket.on(`SEND_CONNECTED_USER`, updateConnectedUsers);
    }

    return () => {
      if (socket) {
        socket.off(`SEND_CONNECTED_USER`, updateConnectedUsers);
      }
    };
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.emit('FETCH_CONNECTED_USER');
    }

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
        : filteredItems.map((item) => (
            <ListItem
              key={String(item.id)}
              {...item}
              online={Boolean(
                connectedUsers.find((user) => String(user.id) === String(item.id))
              )}
            />
          ))}
    </ListContainer>
  );
}
