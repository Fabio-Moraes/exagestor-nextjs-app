'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { FullScreenLoading } from 'components/FullScreenLoading';
import { encryptObject } from 'functions';
import apiRoute from 'services/apiRoute';

import {
  Container,
  Table,
  TableHeader,
  TableRow,
  Button,
  Title,
  CheckboxButton,
  ErrorContainer
} from './styles';

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

  const router = useRouter();

  const sleep = async (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const reconnectDelay = 5000;
  const maxRetries = 4;

  async function fetchServices() {
    setConnectionError(false);

    for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
      try {
        setIsPopupValue(
          retryCount > 0 ? `Conectando<br>Tentativa (${retryCount + 1})` : 'Conectando'
        );

        const response = await apiRoute.post('/api/bridge', {
          baseURL: '/api/almox/stock'
        });

        setMaterials(response.data);
        break;
      } catch (error) {
        await sleep(reconnectDelay);
        setConnectionError(true);
      }
    }
    setIsPopupValue(null);
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

  return (
    <Container>
      <Title>Almoxarifado</Title>
      {isPopupValue && <FullScreenLoading message={isPopupValue} />}
      {connectionError ? (
        <ErrorContainer>
          <span>
            Não foi possível carregar os dados da página devido a instabilidade na conexão. Por
            favor, tente novamente.
          </span>
        </ErrorContainer>
      ) : (
        <>
          <CheckboxButton
            type="button"
            $checked={checkbox === 'selectMaterial'}
            onClick={() => {
              setCheckbox('selectMaterial');
            }}
          >
            <div />
            <span>Montar Carga</span>
          </CheckboxButton>

          <CheckboxButton
            type="button"
            $checked={checkbox === 'manageStock'}
            onClick={() => {
              setCheckbox('manageStock');
            }}
          >
            <div />
            <span>Gerenciar Estoque</span>
          </CheckboxButton>
          <Table>
            <TableHeader>
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
            </TableHeader>
            {materials &&
              materials.map((item, index) => (
                <TableRow
                  $isSelected={
                    checkbox === 'selectMaterial' && selectedTableRows.includes(item.id)
                  } // Assuming each item has a unique id
                  onClick={() => checkbox === 'selectMaterial' && toggleRowSelection(item.id)}
                  key={index}
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
                </TableRow>
              ))}
          </Table>
          {selectedTableRows.length > 0 && checkbox === 'selectMaterial' && (
            <Button
              onClick={() => {
                router.push(`/dashboard/almox/stock/select-material/${encryptSlug}`);
              }}
            >
              Selecionar Quantidade ({selectedTableRows.length})
            </Button>
          )}
        </>
      )}
    </Container>
  );
}
