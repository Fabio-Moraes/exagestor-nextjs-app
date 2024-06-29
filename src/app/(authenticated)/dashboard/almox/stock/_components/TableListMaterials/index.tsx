import { useRef, useState } from 'react';

import Link from 'components/Vercel/Link';
import { encryptObject } from 'functions';

import { v4 as uuidv4 } from 'uuid';

import * as S from './styles';

type Materials = {
  id: number;
  product_name: string;
  unit_type: string;
  product_code: string;
  quantity_value: string;
  created_at: string;
};

type TableListMaterialsType = {
  materials: Materials[];
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

  //const handleCloseDialog = () => {
  //  if (dialogRef.current) {
  //    dialogRef.current.close();
  //  }
  //};

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

  const handleTableRow = (item: Materials) => {
    if (checkbox === 'selectMaterial' && Number(item.quantity_value) > 0) {
      toggleRowSelection(item.id);
    }

    if (checkbox === 'manageStock') {
      (async () => setManageStockRowSelection(String(item.product_code)))().then(
        handleOpenDialog
      );
    }
  };

  const encryptSlug = (product_code: string) => encryptObject({ product_code });

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
              <Link
                href={`/dashboard/almox/stock/product-label/${encryptSlug(
                  manageStockRowSelection
                )}`}
                scroll={false}
              >
                <S.WrapperLink>
                  <p>VISUALIZAR ETIQUETA</p>
                </S.WrapperLink>
              </Link>
              <button onClick={() => {}}>
                <p>EDITAR QUANTIDADE</p>
              </button>
              <button onClick={() => {}}>
                <p>DETALHES</p>
              </button>
            </S.Dialog>
          </div>
        ))}
    </div>
  );
}
