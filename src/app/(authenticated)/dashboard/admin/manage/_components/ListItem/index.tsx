'use client';

import { useRouter } from 'next/navigation';

import { encryptObject } from 'functions';

import { useWebSocket } from 'contexts/WebSocketContext';

import { Container, ItemContainer } from './styles';

interface ConnectedUser {
  userid: number;
  username: string;
  status: string;
  role: string;
  socket_id: string; // Adicionar socket_id para rastrear o status de conexão
}

interface ListItemProps {
  id: number;
  name: string;
  role: string;
  identification: string;
  created_at: string;
  connectedUsers: ConnectedUser[];
}

const ListItem: React.FC<ListItemProps> = (props) => {
  const { id, name, role, identification, created_at, connectedUsers } = props;

  const router = useRouter();
  const socket = useWebSocket();

  function formatDate(date: string) {
    const now = new Date(date);
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    // const hours = now.getHours().toString().padStart(2, '0');
    // const minutes = now.getMinutes().toString().padStart(2, '0');
    // const seconds = now.getSeconds().toString().padStart(2, '0');

    return `${day}/${month}/${year}`; // ${hours}:${minutes}:${seconds}
  }

  async function fetchConcludedServices() {
    const encryptSlug = encryptObject({ userId: id });
    router.push(`/dashboard/admin/manage/new/${encryptSlug}`);
  }

  const connected = connectedUsers.find((user) => Number(user.userid) === Number(id));

  const ProfileUser = ({ name, status = 'offline' }: { name: string; status?: string }) => {
    const statusUser = {
      online: `🟢 ${name} (Online)`,
      offline: `🔴 ${name} (Offline)`,
      hidden: `🟠 ${name} (Em segundo plano)`
    } as { [key: string]: string };

    return statusUser[status];
  };

  return (
    <Container selected={false}>
      <ItemContainer onClick={fetchConcludedServices}>
        <p>{ProfileUser({ name, status: connected?.status })}</p>
        <div>
          <p>
            {identification.length > 14 ? 'CNPJ' : 'CPF'}: {identification}
          </p>
          <p>DESDE: {formatDate(created_at)}</p>
          <p>CARGO: {role.charAt(0).toUpperCase() + role.slice(1)}</p>
        </div>
      </ItemContainer>
      {connected && (
        <button
          onClick={() => {
            if (socket) {
              socket.emit('LOGOUT_USER', JSON.stringify({ employee_id: id }));
            }
          }}
        >
          <p>Sair</p>
        </button>
      )}
    </Container>
  );
};

export default ListItem;
