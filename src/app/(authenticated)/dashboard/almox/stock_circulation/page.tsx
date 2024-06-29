'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { TableListMaterials } from './_components/TableListMaterials';
import { FullScreenLoading } from 'components/FullScreenLoading';
import { encryptObject } from 'functions';
import { TimedWait } from 'functions/TimedWait';
import { internalApi } from 'services/apiAxios';

import * as S from './styles';

type Material = {
  id: number;
  employee_id: number;
  product_name: string;
  product_code: string;
  product_batch: string | null;
  quantity_value: string;
  unit_type: string;
  created_at: string;
};

export default function NewStock() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [selectedTableRows, setSelectedTableRows] = useState<number[]>([]);
  const [connectionError, setConnectionError] = useState(false);
  const [isPopupValue, setIsPopupValue] = useState<string | null>(null);

  const router = useRouter();

  const maxRetries = 4;

  function generateConnectingMessage(count: number): string {
    return count > 0 ? `Conectando<br>Tentativa (${count + 1})` : 'Conectando';
  }

  function aggregateData(data: Material[]): Material[] {
    const aggregatedData: { [product_code: string]: Material } = {};

    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      const productCode: string = item.product_code;
      const quantity: number = parseFloat(item.quantity_value);

      if (!aggregatedData[productCode]) {
        aggregatedData[productCode] = { ...item };
        aggregatedData[productCode].quantity_value = quantity.toString();
      } else {
        const currentQuantity = parseFloat(aggregatedData[productCode].quantity_value);
        aggregatedData[productCode].quantity_value = (currentQuantity + quantity).toString();
      }
    }

    return Object.keys(aggregatedData).map((key) => aggregatedData[key]);
  }

  async function fetchServices() {
    setConnectionError(false);

    for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
      try {
        setIsPopupValue(generateConnectingMessage(retryCount));

        const response = await internalApi.post('/api/bridge', {
          baseURL: '/api/almox/stock-circulation'
        });

        setIsPopupValue(null);

        const aggregatedData = aggregateData(response.data);

        setMaterials(aggregatedData);
        break;
      } catch (error: unknown) {
        if (error instanceof Error) {
          const customError = error as CustomError;
          if (customError.response) {
            const statusCode = customError.response.status;
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

  const selectedMaterials = materials.filter(function (objeto: Material) {
    return selectedTableRows.includes(objeto.id);
  });

  const encryptSlug = encryptObject({ selectedMaterials });

  return (
    <>
      <S.Container>
        <S.Title>Em Circulação</S.Title>
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
            <S.Wrapper></S.Wrapper>
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
                checkbox={'manageStock'}
                materials={materials}
                selectedTableRows={selectedTableRows}
                toggleRowSelection={toggleRowSelection}
              />
            </S.Table>
            {selectedTableRows.length > 0 && (
              <S.Button
                onClick={() => {
                  router.push(`/dashboard/almox/stock/select-material/${encryptSlug}`);
                }}
              >
                Selecionar Quantidade ({selectedTableRows.length})
              </S.Button>
            )}
          </>
        )}
      </S.Container>
    </>
  );
}
