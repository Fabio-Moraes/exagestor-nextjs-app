'use client';

import { useRouter } from 'next/navigation';
import { useRef } from 'react';

import { encryptObject } from 'functions';

import { useWebSocket } from 'contexts/webSocket';
import { AnimatePresence } from 'framer-motion';

import {
  Container,
  ItemContainer,
  Dialog,
  OnlineText,
  HiddenText,
  OfflineText,
  ConnectedText
} from './styles';

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
  status: string;
  identification: string;
  created_at: string;
  connectedUsers: ConnectedUser[];
  websocketConnected: boolean;
}

const ListItem = (props: ListItemProps) => {
  const {
    id,
    name,
    role,
    status,
    identification,
    created_at,
    connectedUsers,
    websocketConnected
  } = props;

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

  const ProfileUser = ({ connectionStatus = 'offline' }) => {
    if (status === 'inactive') {
      return <OfflineText>Inativado</OfflineText>;
    }

    if (!websocketConnected) {
      return <ConnectedText>Conectando-se ao servidor</ConnectedText>;
    }

    const connectionStatusUser = {
      online: <OnlineText>Online</OnlineText>,
      offline: <OfflineText>Offline</OfflineText>,
      hidden: <HiddenText>Em segundo plano</HiddenText>
    } as { [key: string]: JSX.Element };

    return connectionStatusUser[connectionStatus];
  };

  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleOpenDialog = () => {
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

  function fetchConcludedServices() {
    const encryptSlug = encryptObject({ userId: id });
    handleCloseDialog();
    router.push(`/dashboard/admin/manage/new/${encryptSlug}`, { scroll: false });
  }

  function fetchStock() {
    const encryptSlug = encryptObject({ userId: id, userName: name });
    handleCloseDialog();
    router.push(`/dashboard/admin/manage/stock/${encryptSlug}`, { scroll: false });
  }

  function fetchHistoric() {
    const encryptSlug = encryptObject({ userId: id, userName: name });
    handleCloseDialog();
    router.push(`/dashboard/admin/manage/historic/${encryptSlug}`, { scroll: false });
  }

  function fetchChangePassword() {
    const encryptSlug = encryptObject({ userId: id, userName: name });
    handleCloseDialog();
    router.push(`/dashboard/admin/manage/change_password/${encryptSlug}`, { scroll: false });
  }

  function fetchUpdateStatusEmployee(accountStatus: 'inactive' | 'active') {
    const encryptSlug = encryptObject({
      userId: id,
      userName: name,
      accountStatus: accountStatus
    });
    handleCloseDialog();
    router.push(`/dashboard/admin/manage/update_status_employee/${encryptSlug}`, {
      scroll: false
    });
  }

  const selectedRole = {
    tec: 'TÉCNICO'
  } as { [key: string]: string };

  return (
    <>
      <AnimatePresence>
        <Container
          whileHover={{ scale: 0.98 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleOpenDialog}
          style={{
            /*  opacity: status === 'inactive' ? 0.8 : 1 */
            filter: status === 'inactive' ? 'saturate(0)' : 'contrast(2)'
          }}
        >
          <ItemContainer>
            <div>
              <p>{name.toUpperCase()}</p>
              <ProfileUser connectionStatus={connected?.status} />
            </div>
            <div>
              <p>
                {identification.length > 14 ? 'CNPJ' : 'CPF'}: {identification}
              </p>
              <p>DESDE: {formatDate(created_at)}</p>
              <p>CARGO: {selectedRole[role]}</p>
            </div>
          </ItemContainer>
        </Container>
      </AnimatePresence>
      <Dialog ref={dialogRef} onClick={handleClickOutsideDialog}>
        <>
          <button onClick={fetchStock}>
            <p>VISUALIZAR CARGA</p>
          </button>
          {status !== 'inactive' && (
            <button onClick={fetchConcludedServices}>
              <p>NOVO SERVIÇO</p>
            </button>
          )}
          <button onClick={fetchHistoric}>
            <p>HISTÓRICO</p>
          </button>
          {status === 'inactive' ? (
            <button onClick={() => fetchUpdateStatusEmployee('active')}>
              <p>REATIVAR FUNCIONÁRIO</p>
            </button>
          ) : (
            <button onClick={() => fetchUpdateStatusEmployee('inactive')}>
              <p>INATIVAR FUNCIONÁRIO</p>
            </button>
          )}
          <button onClick={fetchChangePassword}>
            <p>ALTERAR SENHA</p>
          </button>
        </>

        {connected && (
          <button
            onClick={() => {
              if (socket) {
                socket.emit('REMOTE_LOGOUT_USER', JSON.stringify({ employee_id: id }));
                handleCloseDialog();
              }
            }}
          >
            <p>DESCONECTAR</p>
          </button>
        )}
      </Dialog>
    </>
  );
};

export default ListItem;
