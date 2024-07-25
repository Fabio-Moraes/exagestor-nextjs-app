'use client';

import React, { useEffect, useState } from 'react';

import { TableListMaterials } from './_components/TableListMaterials';
import { FullScreenLoading } from 'components/FullScreenLoading';
import { HandleLogout } from 'functions/HandleLogout';
import { TimedWait } from 'functions/TimedWait';
import { internalApi } from 'services/apiAxios';

import * as S from './styles';

type Material = {
  id: number;
  product_name: string;
  product_code: string;
  quantity_value: string;
  employee_id?: number;
  product_batch?: string | null;
  unit_type: string;
  created_at: string;
};

type FetchMaterial = {
  almox: Material[];
  employee: Array<Material & { name_tec: string }>;
};

export default function NewStock() {
  const [fetchMaterial, setFetchMaterial] = useState({} as FetchMaterial);
  const [selectedTableRows, setSelectedTableRows] = useState<number[]>([]);
  const [connectionError, setConnectionError] = useState(false);
  const [isPopupValue, setIsPopupValue] = useState<string | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState(true);
  const [selectedAlmox, setSelectedAlmox] = useState(true);

  const maxRetries = 4;

  function generateConnectingMessage(count: number): string {
    return count > 0 ? `Conectando<br>Tentativa (${count + 1})` : 'Conectando';
  }

  async function fetchServices() {
    setConnectionError(false);

    for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
      try {
        setIsPopupValue(generateConnectingMessage(retryCount));

        const response = await internalApi.post('/api/bridge', {
          baseURL: '/api/almox/stock-view'
        });

        setIsPopupValue(null);
        setFetchMaterial(response.data);
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

  function selectedListStock() {
    const aggregatedDataArray = [];

    if (selectedAlmox && !selectedEmployee) {
      fetchMaterial.almox && aggregatedDataArray.push(...fetchMaterial.almox);
    }

    if (!selectedAlmox && selectedEmployee) {
      fetchMaterial.employee && aggregatedDataArray.push(...fetchMaterial.employee);
    }

    if (selectedAlmox && selectedEmployee) {
      fetchMaterial.almox && aggregatedDataArray.push(...fetchMaterial.almox);
      fetchMaterial.employee && aggregatedDataArray.push(...fetchMaterial.employee);
    }

    if (!selectedAlmox && !selectedEmployee) {
      return [];
    }

    return aggregateData(aggregatedDataArray);
  }

  return (
    <>
      <S.Container>
        <S.Title>Visualizar Materiais</S.Title>
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
                $checked={selectedEmployee}
                onClick={() => {
                  setSelectedEmployee((i) => !i);
                }}
              >
                <div />
                <span>Cargas</span>
              </S.CheckboxButton>

              <S.CheckboxButton
                type="button"
                $checked={selectedAlmox}
                onClick={() => {
                  setSelectedAlmox((i) => !i);
                }}
              >
                <div />
                <span>Estoque</span>
              </S.CheckboxButton>
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
                checkbox={'manageStock'}
                materials={selectedListStock()}
                fetchEmployee={selectedEmployee ? fetchMaterial.employee : []}
                fetchAlmox={selectedAlmox ? fetchMaterial.almox : []}
                selectedTableRows={selectedTableRows}
                toggleRowSelection={toggleRowSelection}
              />
            </S.Table>
          </>
        )}
      </S.Container>
    </>
  );
}
