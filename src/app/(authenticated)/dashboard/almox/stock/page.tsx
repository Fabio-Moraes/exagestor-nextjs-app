'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

import { TableListMaterials } from './_components/TableListMaterials';
import { FullScreenLoading } from 'components/FullScreenLoading';
import { QRScanner } from 'components/QrScanner';
import Image from 'components/Vercel/Image';
import { encryptObject } from 'functions';
import { HandleLogout } from 'functions/HandleLogout';
import { TimedWait } from 'functions/TimedWait';
import { internalApi } from 'services/apiAxios';

import qrCodeSvg from './_assets/svg/qr-code.svg';
import refresh from './_assets/svg/refresh.svg';

import * as S from './styles';

interface Materials {
  id: number;
  product_name: string;
  unit_type: string;
  product_code: string;
  quantity_value: string;
  created_at: string;
}

export default function NewStock() {
  const [materials, setMaterials] = useState<Materials[]>([]);
  const [selectedTableRows, setSelectedTableRows] = useState<number[]>([]);
  const [connectionError, setConnectionError] = useState(false);
  const [isPopupValue, setIsPopupValue] = useState<string | null>(null);
  const [checkbox, setCheckbox] = useState('manageStock');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();
  const maxRetries = 4;

  function generateConnectingMessage(count: number): string {
    return count > 0 ? `Conectando<br>Tentativa (${count + 1})` : 'Conectando';
  }

  async function fetchServices(productCode = '') {
    setConnectionError(false);

    for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
      try {
        setIsPopupValue(generateConnectingMessage(retryCount));

        const response = await internalApi.post('/api/bridge', {
          baseURL: '/api/almox/stock',
          productAll: Boolean(productCode.length === 0),
          productCode: productCode
        });

        setIsPopupValue(null);
        setMaterials(response.data);
        break;
      } catch (error: unknown) {
        if (error instanceof Error) {
          const customError = error as CustomError;
          if (customError.response) {
            const statusCode = customError.response.status;

            if (statusCode === 403) {
              HandleLogout();
              break;
            }

            if (statusCode === 409) {
              break;
            }

            if (retryCount === maxRetries) {
              setConnectionError(true);
              setIsPopupValue(null);
            } else {
              await TimedWait(3000);
            }
          }
        }
      }
    }
  }

  useEffect(() => {
    fetchServices();
  }, []);

  const toggleRowSelection = (id: number) => {
    if (selectedTableRows.includes(id)) {
      setSelectedTableRows(selectedTableRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedTableRows([...selectedTableRows, id]);
    }
  };

  const selectedMaterials = materials.filter(function (objeto: Materials) {
    return selectedTableRows.includes(objeto.id);
  });

  const encryptSlug = encryptObject({ selectedMaterials });

  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleOpenDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
      setIsModalOpen(true);
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
        setIsModalOpen(false);
      }
    }
  };

  return (
    <>
      <S.Container>
        <S.Title>Almoxarifado</S.Title>
        {isPopupValue && <FullScreenLoading message={isPopupValue} />}
        {connectionError ? (
          <S.ErrorContainer>
            <span>
              Não foi possível carregar os dados da página devido a instabilidade na conexão.
              Por favor, tente novamente.
            </span>
          </S.ErrorContainer>
        ) : (
          <>
            <S.Wrapper>
              <S.CheckboxButton
                type="button"
                $checked={checkbox === 'selectMaterial'}
                onClick={() => {
                  setCheckbox('selectMaterial');
                }}
              >
                <div />
                <span>Montar Carga</span>
              </S.CheckboxButton>

              <S.CheckboxButton
                type="button"
                $checked={checkbox === 'manageStock'}
                onClick={() => {
                  setCheckbox('manageStock');
                }}
              >
                <div />
                <span>Gerenciar Estoque</span>
              </S.CheckboxButton>
              <div>
                <button onClick={() => fetchServices()}>
                  <Image
                    priority
                    src={refresh}
                    alt="Livro"
                    style={{ marginLeft: '0.5rem' }}
                    width={30}
                    height={30}
                  />
                </button>
                <button onClick={handleOpenDialog}>
                  <Image
                    priority
                    src={qrCodeSvg}
                    alt="Livro"
                    style={{ marginLeft: '0.5rem' }}
                    width={30}
                    height={30}
                  />
                </button>
              </div>
            </S.Wrapper>
            <S.Table>
              <S.TableHeader>
                <div>
                  <span>MATERIAIS</span>
                </div>
                <div>
                  <span>QTD</span>
                </div>
                <div>
                  <span>TIPO</span>
                </div>
                <div>
                  <span>CÓDIGO</span>
                </div>
              </S.TableHeader>
              <TableListMaterials
                checkbox={checkbox}
                materials={materials}
                selectedTableRows={selectedTableRows}
                toggleRowSelection={toggleRowSelection}
              />
            </S.Table>
            {selectedTableRows.length > 0 && checkbox === 'selectMaterial' && (
              <S.Button
                onClick={() => {
                  router.push(`/dashboard/almox/stock/material/${encryptSlug}`);
                }}
              >
                Selecionar Quantidade ({selectedTableRows.length})
              </S.Button>
            )}
          </>
        )}
      </S.Container>
      <S.DialogQr ref={dialogRef} onClick={handleClickOutsideDialog}>
        {isModalOpen && (
          <QRScanner
            handleScanned={(productCode) => {
              fetchServices(productCode).then(handleCloseDialog);
            }}
          />
        )}
      </S.DialogQr>
    </>
  );
}
