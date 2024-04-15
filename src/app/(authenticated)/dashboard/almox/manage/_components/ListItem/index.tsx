'use client';

import { useRouter } from 'next/navigation';
import { useRef } from 'react';

import { encryptObject } from 'functions';

import { AnimatePresence } from 'framer-motion';

import * as S from './styles';

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
  connectedUsers: ConnectedUser[];
  websocketConnected: boolean;
}

const ListItem = (props: ListItemProps) => {
  const { id, name, role, status, identification, connectedUsers, websocketConnected } = props;

  const router = useRouter();

  const connected = connectedUsers.find((user) => Number(user.userid) === Number(id));

  const ProfileUser = ({ connectionStatus = 'offline' }) => {
    if (status === 'inactive') {
      return <S.OfflineText>Inativado</S.OfflineText>;
    }

    if (!websocketConnected) {
      return <S.ConnectedText>Conectando-se ao servidor</S.ConnectedText>;
    }

    const connectionStatusUser = {
      online: <S.OnlineText>Online</S.OnlineText>,
      offline: <S.OfflineText>Offline</S.OfflineText>,
      hidden: <S.HiddenText>Em segundo plano</S.HiddenText>
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

  function fetchStock() {
    const encryptSlug = encryptObject({ userId: id, userName: name });
    handleCloseDialog();
    router.push(`/dashboard/almox/manage/stock/material/${encryptSlug}`, { scroll: false });
  }

  const selectedRole = {
    tec: 'TÉCNICO'
  } as { [key: string]: string };

  return (
    <>
      <AnimatePresence>
        <S.Container
          whileHover={{ scale: 0.98 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleOpenDialog}
          style={{
            /*  opacity: status === 'inactive' ? 0.8 : 1 */
            filter: status === 'inactive' ? 'saturate(0)' : 'contrast(2)'
          }}
        >
          <S.ItemContainer>
            <div>
              <p>{name.toUpperCase()}</p>
              <ProfileUser connectionStatus={connected?.status} />
            </div>
            <div>
              <p>
                {identification.length > 14 ? 'CNPJ' : 'CPF'}: {identification}
              </p>
              <p>CARGO: {selectedRole[role]}</p>
            </div>
          </S.ItemContainer>
        </S.Container>
      </AnimatePresence>
      <S.Dialog ref={dialogRef} onClick={handleClickOutsideDialog}>
        <button onClick={fetchStock}>
          <p>VISUALIZAR CARGA</p>
        </button>
      </S.Dialog>
    </>
  );
};

export default ListItem;
