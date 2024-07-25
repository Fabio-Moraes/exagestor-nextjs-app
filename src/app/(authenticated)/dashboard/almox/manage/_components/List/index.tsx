'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { LineSkaleton } from 'components/LineSkaleton';
import Image from 'components/Vercel/Image';

import ListItem from '../ListItem';

import { useWebSocketListenerOn } from 'contexts/webSocket';
import { useWebSocket } from 'contexts/webSocket';
import { useWebsocketConnected } from 'store/websocketConnected';

import searchSvg from './_assets/svg/search.svg';

import * as S from './styles';

interface Service {
  id: number;
  name: string;
  role: string;
  status: string;
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
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  const websocketConnected = useWebsocketConnected((status) => status.websocketConnected);

  const websocket = useWebSocket();

  useWebSocketListenerOn('ALL_CONNECTED_USER', (data) => {
    setConnectedUsers(data as ConnectedUser[]);
  });

  useEffect(() => {
    if (websocket) websocket.emit('GET_CONNECTED_USER');
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

  function fetchHistoric() {
    router.push('/dashboard/almox/historic', { scroll: false });
  }

  return (
    <S.ListContainer>
      <div>
        <S.SearchWrapper>
          <Image
            priority
            src={searchSvg}
            alt="Livro"
            style={{ marginLeft: '0.5rem' }}
            width={25}
            height={25}
          />
          <S.SearchBar
            type="text"
            placeholder="Pesquisar funcionários..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </S.SearchWrapper>
      </div>
      <button onClick={fetchHistoric}>
        <p>HISTÓRICO GERAL</p>
      </button>
      {isLoading
        ? [...Array(4)].map((_, index) => (
            <S.ItemsSkeleton key={String(index)}>
              <div>
                <LineSkaleton width="14rem" />
                <LineSkaleton width="10rem" />
              </div>
              <LineSkaleton width="19rem" />
              <LineSkaleton width="25rem" />
              <LineSkaleton width="10rem" />
            </S.ItemsSkeleton>
          ))
        : filteredItems.map((item) => (
            <ListItem
              key={String(item.id)}
              {...item}
              connectedUsers={connectedUsers}
              websocketConnected={websocketConnected}
            />
          ))}
    </S.ListContainer>
  );
}
