'use client';

import { useRouter } from 'next/navigation';
import { useRef } from 'react';

import { encryptObject } from 'functions';

import { useWebSocket } from 'contexts/webSocket';

import { Container, ItemContainer, Dialog } from './styles';

interface ConnectedUser {
  userid: number;
  username: string;
  status: string;
  role: string;
  socket_id: string;
}

interface ListItemProps {
  id: number;
  name: string;
  role: string;
  identification: string;
  created_at: string;
  connectedUsers: ConnectedUser[];
  connectedWebSocket: boolean;
}

const ListItem: React.FC<ListItemProps> = (props) => {
  const { id, name, role, identification, created_at, connectedUsers, connectedWebSocket } =
    props;

  const router = useRouter();
  const socket = useWebSocket();

  function formatDate(date: string) {
    const now = new Date(date);
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    return `${day}/${month}/${year}`;
  }

  const connected = connectedUsers.find((user) => Number(user.userid) === Number(id));

  const ProfileUser = ({ name = '...', status = 'offline' }) => {
    const statusUser = {
      online: `🟢 ${name} (Online)`,
      offline: `🔴 ${name} (Offline)`,
      hidden: `🟠 ${name} (Em segundo plano)`,
      connecting: `🔵 ${name} (Conectando-se ao servidor)`
    } as { [key: string]: string };

    return statusUser[status];
  };

  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleOpenDialog = () => {
    console.log('open dialog');
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const handleCloseDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  type EventTypes = React.MouseEvent<HTMLDialogElement, MouseEvent>;

  const handleClickOutsideDialog = (event: EventTypes) => {
    const { clientX, clientY } = event.nativeEvent;
    if (dialogRef.current) {
      const rect = dialogRef.current.getBoundingClientRect();
      if (
        rect.left > clientX ||
        rect.right < clientX ||
        rect.top > clientY ||
        rect.bottom < clientY
      ) {
        dialogRef.current.close();
      }
    }
  };

  async function fetchConcludedServices() {
    const encryptSlug = encryptObject({ userId: id });
    handleCloseDialog();
    router.push(`/dashboard/admin/manage/new/${encryptSlug}`);
  }

  return (
    <>
      <Container
        whileHover={{ scale: 0.98 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleOpenDialog}
      >
        <ItemContainer>
          <p>
            {ProfileUser({
              name,
              status: connectedWebSocket ? connected?.status : 'connecting'
            })}
          </p>
          <div>
            <p>
              {identification.length > 14 ? 'CNPJ' : 'CPF'}: {identification}
            </p>
            <p>DESDE: {formatDate(created_at)}</p>
            <p>CARGO: {role.charAt(0).toUpperCase() + role.slice(1)}</p>
          </div>
        </ItemContainer>

        <div>
          {connected && (
            <button
              onClick={() => {
                if (socket) {
                  socket.emit('LOGOUT_USER', JSON.stringify({ employee_id: id }));
                }
              }}
            >
              <p>Desconectar</p>
            </button>
          )}
        </div>
      </Container>
      <Dialog ref={dialogRef} onClick={handleClickOutsideDialog}>
        <button>
          <p>VISUALIZAR CARGA</p>
        </button>
        <button onClick={fetchConcludedServices}>
          <p>NOVO SERVIÇO</p>
        </button>
        <button>
          <p>INATIVAR FUNCIONÁRIO</p>
        </button>
        <button>
          <p>ALTERAR SENHA</p>
        </button>
      </Dialog>
    </>
  );
};

export default ListItem;
