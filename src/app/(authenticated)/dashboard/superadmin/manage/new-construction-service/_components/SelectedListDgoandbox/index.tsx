import { useRef, useState } from 'react';

import { Modal } from './_components/Modal';

import { useNodeName } from '../../store/nodeName';
import { useSelectedDgoandboxStore } from '../../store/selectedDgoandbox';
import { useSelectedListDgoandbox } from '../../store/selectedListDgoandbox';

import * as S from './styles';

type SelectedCable = {
  id: number;
  description: string;
  quantity?: number;
  status: string;
  type: string;
};

type Props = {
  list: SelectedCable[];
  checkNodeName: () => void;
};

export function SelectedListDgoandbox({ list, checkNodeName }: Props) {
  const [idSelected, setIdSelected] = useState(0);
  const [typeDgoandboxSelected, setTypeDgoandboxSelected] = useState('');
  const [valueDgoandboxSelected, setValueDgoandboxSelected] = useState('');

  const { nodeName } = useNodeName();
  const { editSelectedDgoandbox } = useSelectedDgoandboxStore();
  const { selectedListDgoandbox, cleanSelectedListDgoandbox } = useSelectedListDgoandbox();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleOpenDialog = (id: number, typeDgoandbox: string, valueDgoandbox = '') => {
    if (dialogRef.current) {
      setIdSelected(id);
      setTypeDgoandboxSelected(typeDgoandbox);
      setValueDgoandboxSelected(valueDgoandbox);
      dialogRef.current.showModal();
    }
  };

  return (
    <>
      <S.Container>
        {list.map((item, index) => {
          const type = item.type;
          const quantity = item.quantity?.toLocaleString('pt-BR');

          if (Number(item.quantity) > 0) {
            const textDgoandbox = `${type} - ${quantity}`;
            return (
              <span
                onClick={() => {
                  nodeName.length === 0 ? checkNodeName() : handleOpenDialog(item.id, type, quantity);
                }}
                key={index.toString()}
              >
                {Number(item.quantity) !==
                Object.keys(selectedListDgoandbox?.[String(item.id)] || {}).length
                  ? '🔴 '
                  : '🟢 '}
                {textDgoandbox}
              </span>
            );
          }
        })}
      </S.Container>
      <Modal
        idSelected={idSelected}
        dialogRef={dialogRef}
        typeDgoandboxSelected={typeDgoandboxSelected}
        valueDgoandboxSelected={valueDgoandboxSelected}
        onCableLaying={() => {
          if (dialogRef.current) dialogRef.current.close();
          editSelectedDgoandbox(idSelected, { quantity: 0, list: [] });
          cleanSelectedListDgoandbox(String(idSelected));
        }}
      />
    </>
  );
}
