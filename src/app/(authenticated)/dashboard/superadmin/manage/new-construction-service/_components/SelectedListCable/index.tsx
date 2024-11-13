import { useRef, useState } from 'react';

import { Modal } from './_components/Modal';

import { useSelectedCableStore } from '../../store/selectedCable';

import * as S from './styles';

type SelectedCable = {
  id: number;
  description: string;
  cable_length_meters?: number;
  status: string;
};

type List = {
  list: SelectedCable[];
};

export function SelectedListCable({ list }: List) {
  const [idSelected, setIdSelected] = useState(0);
  const [textCableSelected, setTextCableSelected] = useState('');

  const dialogRef = useRef<HTMLDialogElement>(null);
  const { editSelectedCable } = useSelectedCableStore();

  const handleOpenDialog = (id: number, textCable: string) => {
    if (dialogRef.current) {
      setIdSelected(id);
      setTextCableSelected(textCable);
      dialogRef.current.showModal();
    }
  };

  return (
    <>
      <S.Container>
        {list.map((item, index) => {
          const description = item.description;
          const cable_length_meters = item.cable_length_meters?.toLocaleString('pt-BR');

          if (Number(item.cable_length_meters) > 0) {
            const textCable = `${description} - ${cable_length_meters}M`;
            return (
              <span onClick={() => handleOpenDialog(item.id, textCable)} key={index.toString()}>
                {textCable}
              </span>
            );
          }
        })}
      </S.Container>
      <Modal
        dialogRef={dialogRef}
        textCableSelected={textCableSelected}
        onCableLaying={() => {
          if (dialogRef.current) dialogRef.current.close();
          editSelectedCable(idSelected, 0);
        }}
      />
    </>
  );
}
