import { useRef, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

import * as S from './styles';

type Material = {
  id: number;
  product_name: string;
  unit_type: string;
  product_code: string;
  quantity_value: string;
  created_at: string;
};

type TableListMaterialsType = {
  materials: Material[];
  checkbox: string;
  selectedTableRows: number[];
  toggleRowSelection: (id: number) => void;
};

export function TableListMaterials(props: TableListMaterialsType) {
  const { materials, checkbox, selectedTableRows, toggleRowSelection } = props;

  const [manageStockRowSelection, setManageStockRowSelection] = useState('');

  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleOpenDialog = async () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
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
        setManageStockRowSelection('');
      }
    }
  };

  const handleTableRow = (item: Material) => {
    if (checkbox === 'selectMaterial' && Number(item.quantity_value) > 0) {
      toggleRowSelection(item.id);
    }

    if (checkbox === 'manageStock') {
      (async () => setManageStockRowSelection(String(item.product_code)))().then(
        handleOpenDialog
      );
    }
  };

  return (
    <div>
      {materials &&
        materials.map((item) => (
          <div key={uuidv4()}>
            <S.TableRow
              $isSelected={
                (checkbox === 'selectMaterial' && selectedTableRows.includes(item.id)) ||
                manageStockRowSelection === String(item.product_code)
              }
              onClick={() => handleTableRow(item)}
              key={uuidv4()}
            >
              <div>
                <span>{item.product_name.toUpperCase()}</span>
              </div>
              <div>
                <span>{item.quantity_value}</span>
              </div>
              <div>
                <span>{item.unit_type}</span>
              </div>
              <div>
                <span>{item.product_code}</span>
              </div>
            </S.TableRow>
            <S.Dialog ref={dialogRef} onClick={handleClickOutsideDialog}>
              <button onClick={() => {}}>
                <p>DETALHES</p>
              </button>
            </S.Dialog>
          </div>
        ))}
    </div>
  );
}
