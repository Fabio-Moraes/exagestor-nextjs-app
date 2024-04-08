'use client';
import React, { useEffect, useState } from 'react';

import { FullScreenLoading } from 'components/FullScreenLoading';
import { TimedWait } from 'functions/TimedWait';
import apiRoute from 'services/apiRoute';

import { Container, Table, TableHeader, TableRow, Title, ErrorContainer } from './styles';

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
  const [connectionError, setConnectionError] = useState(false);
  const [isPopupValue, setIsPopupValue] = useState<string | null>(null);

  const maxRetries = 4;

  function generateConnectingMessage(count: number): string {
    return count > 0 ? `Conectando<br>Tentativa (${count + 1})` : 'Conectando';
  }

  async function fetchServices() {
    setConnectionError(false);

    for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
      try {
        setIsPopupValue(generateConnectingMessage(retryCount));

        const responseUser = await apiRoute.post('/api/decode/auth_token');

        const responseStock = await apiRoute.post('/api/bridge', {
          baseURL: '/api/tec/stock',
          employee_id: Number(responseUser.data.id)
        });

        setMaterials(responseStock.data);
        setIsPopupValue(null);
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

  return (
    <Container>
      <Title>Carga</Title>
      {isPopupValue && <FullScreenLoading message={isPopupValue} />}
      {connectionError ? (
        <ErrorContainer>
          <span>
            Não foi possível carregar os dados da página devido a instabilidade na conexão. Por
            favor, tente novamente.
          </span>
        </ErrorContainer>
      ) : (
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
              <TableRow $isSelected={false} onClick={() => {}} key={index}>
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
      )}
    </Container>
  );
}
