import { useRouter } from 'next/navigation';
import { useRef } from 'react';

import { ModalConnected } from './_components/ModalConnected';
import { encryptObject } from 'functions';

import * as S from './styles';

type PropsType = {
  protocol?: string;
};

export function MenuOptions({ protocol }: PropsType) {
  const modalConnectedRef = useRef<HTMLDialogElement>(null);
  const encryptSlug = encryptObject({ protocol: protocol });

  const router = useRouter();

  const handleOpenDialog = () => {
    if (modalConnectedRef.current) {
      modalConnectedRef.current.showModal();
    }
  };

  return (
    <>
      <S.Container>
        <S.Button>Reserva</S.Button>
        <S.Button onClick={handleOpenDialog}>Conectados</S.Button>
        <S.Button
          onClick={() => {
            router.push(`/dashboard/tec/running/construction/class-l/historic/${encryptSlug}`, {
              scroll: false
            });
          }}
        >
          Histórico
        </S.Button>
      </S.Container>
      <ModalConnected protocol={protocol} dialogRef={modalConnectedRef} />
    </>
  );
}
