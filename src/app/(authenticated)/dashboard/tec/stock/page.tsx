'use client';
import React, { useEffect, useState } from 'react';

import { FullScreenLoading } from 'components/FullScreenLoading';
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

  const sleep = async (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const reconnectDelay = 5000;
  const maxRetries = 4;

  async function fetchServices(id: string) {
    setConnectionError(false);

    for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
      try {
        setIsPopupValue(
          retryCount > 0 ? `Conectando<br>Tentativa (${retryCount + 1})` : 'Conectando'
        );

        const response = await apiRoute.post('/api/bridge', {
          baseURL: '/api/tec/stock',
          employee_id: Number(id)
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

  async function fetchUser() {
    for (let count = 0; count < maxRetries; count++) {
      try {
        const response = await apiRoute.post('/api/user');

        count = maxRetries;

        fetchServices(response.data.id);
      } catch (error) {
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    }
  }

  useEffect(() => {
    fetchUser();
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
