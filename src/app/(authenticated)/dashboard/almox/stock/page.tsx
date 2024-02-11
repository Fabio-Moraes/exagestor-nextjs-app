'use client';
import React, { useEffect, useState } from 'react';

import { FullScreenLoading } from 'components/FullScreenLoading';
import apiRoute from 'services/apiRoute';

import { Container, Table, Title, ErrorContainer } from './styles';

interface Materials {
  id: number;
  product_name: string;
  unit_type: string;
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

  return (
    <Container>
      <Title>Gerenciamento de Almoxarifado</Title>
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
          <div>
            <div>
              <span>Materiais</span>
            </div>
            <div>
              <span>Qtd</span>
            </div>
            <div>
              <span>Tipo</span>
            </div>
            <div>
              <span>Código</span>
            </div>
          </div>
          {materials &&
            materials.map((item, index) => (
              <div key={index}>
                <div>
                  <span>{item.product_name.toLocaleUpperCase()}</span>
                </div>
                <div>
                  <span>{item.quantity_value}</span>
                </div>
                <div>
                  <span>{item.unit_type}</span>
                </div>
                <div>
                  <span>{item.id}</span>
                </div>
              </div>
            ))}
        </Table>
      )}
    </Container>
  );
}

/* 
<Table>
  <thead>
    <TableRow>
      <TableHeader>Nome</TableHeader>
      <TableHeader>Quantidade</TableHeader>
      <TableHeader>Tipo</TableHeader>
    </TableRow>
  </thead>
  <tbody>
    {items.map((item, index) => (
      <TableRow key={index}>
        <TableCell>{item.name}</TableCell>
        <TableCell>{item.quantity}</TableCell>
        <TableCell>{item.type}</TableCell>
      </TableRow>
    ))}
  </tbody>
</Table>
*/
