'use client';

import { useEffect, useState } from 'react';

import { LineSkaleton } from 'components/LineSkaleton';
import Image from 'components/Vercel/Image';

import ListItem from '../ListItem';

import { useWebSocket } from 'contexts/webSocket';

import searchSvg from './_assets/svg/search.svg';

import { ItemsSkeleton, ListContainer, SearchBar, SearchWrapper } from './styles';

interface Service {
  id: number;
  name: string;
  role: string;
  identification: string;
  created_at: string;
}

interface ConnectedUser {
  userid: number;
  username: string;
  status: string;
  role: string;
  socket_id: string;
}

export function List({ service }: { service: Service[] }) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [connectedUsers, setConnectedUsers] = useState<ConnectedUser[]>([]);
  const [connectedWebSocket, setConnectedWebSocket] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  const socket = useWebSocket();

  useEffect(() => {
    if (socket) {
      const handleConnectedUser = (data: ConnectedUser[]) => {
        setConnectedUsers(data);
      };

      const handleConnectedWebSocket = () => {
        socket.on(`SEND_CONNECTED_USER`, handleConnectedUser);
        setConnectedWebSocket(socket.connected);
      };

      setConnectedWebSocket(socket.connected);

      socket.on(`SEND_CONNECTED_USER`, handleConnectedUser);
      socket.on('connect', handleConnectedWebSocket);
      socket.on('disconnect', handleConnectedWebSocket);

      return () => {
        socket.off(`SEND_CONNECTED_USER`);
        socket.off(`connect`);
        socket.off(`disconnect`);
      };
    } else {
      setConnectedUsers([]);
      setConnectedWebSocket(false);
    }
  }, [socket]);

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
          <Image
            priority
            src={searchSvg}
            alt="Livro"
            style={{ marginLeft: '0.5rem' }}
            width={25}
            height={25}
          />
          <SearchBar
            type="text"
            placeholder="Pesquisar funcionários..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchWrapper>
      </div>
      {isLoading
        ? [...Array(4)].map((_, index) => (
            <ItemsSkeleton key={String(index)}>
              <div>
                <LineSkaleton width="14rem" />
                <LineSkaleton width="10rem" />
              </div>
              <LineSkaleton width="19rem" />
              <LineSkaleton width="25rem" />
              <LineSkaleton width="10rem" />
            </ItemsSkeleton>
          ))
        : filteredItems.map((item) => (
            <ListItem
              key={String(item.id)}
              {...item}
              connectedUsers={connectedUsers}
              connectedWebSocket={connectedWebSocket}
            />
          ))}
    </ListContainer>
  );
}
