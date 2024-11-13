'use client';
import React, { useEffect, useState } from 'react';

import { FullScreenLoading } from 'components/FullScreenLoading';
import Link from 'components/Vercel/Link';
import { decryptObject } from 'functions';
import { encryptObject } from 'functions';
import { HandleLogout } from 'functions/HandleLogout';
import { TimedWait } from 'functions/TimedWait';
import { internalApi } from 'services/apiAxios';

import * as S from './styles';

interface Materials {
  id: number;
  product_name: string;
  unit_type: string;
  product_code: string;
  quantity_value: string;
  category: string;
  created_at: string;
}

interface SlugType {
  params: {
    slug: string;
  };
}

interface DecryptObjectType {
  userId?: number;
  userName?: string;
}

export default function NewStock({ params }: SlugType) {
  const [materials, setMaterials] = useState<Materials[]>([]);
  const [connectionError, setConnectionError] = useState(false);
  const [isPopupValue, setIsPopupValue] = useState<string | null>(null);
  const [selectedTableRows, setSelectedTableRows] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('COMUM');

  const { userId, userName } = decryptObject(params.slug) as DecryptObjectType;

  const maxRetries = 4;

  function generateConnectingMessage(count: number): string {
    return count > 0 ? `Conectando<br>Tentativa (${count + 1})` : 'Conectando';
  }

  async function fetchServices() {
    setConnectionError(false);

    for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
      try {
        setIsPopupValue(generateConnectingMessage(retryCount));

        const responseStock = await internalApi.post('/api/bridge', {
          baseURL: '/api/tec/stock',
          employee_id: Number(userId)
        });

        setMaterials(responseStock.data);
        setIsPopupValue(null);
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

  const selectedMaterials = materials.filter((objeto: Materials) => selectedTableRows.includes(objeto.id));

  const encryptSlug = encryptObject({ selectedMaterials, userId });

  /* 
 materials={
                  selectedCategory === 'TODOS'
                    ? materials
                    : materials.filter((i) => i.category === selectedCategory)
                }
*/

  return (
    <S.Container>
      <S.Title>Carga - {userName}</S.Title>
      {isPopupValue && <FullScreenLoading message={isPopupValue} />}
      {connectionError ? (
        <S.ErrorContainer>
          <span>
            Não foi possível carregar os dados da página devido a instabilidade na conexão. Por favor,
            tente novamente.
          </span>
        </S.ErrorContainer>
      ) : (
        <>
          <S.Tabs>
            <S.TabButton
              $checked={Boolean(selectedCategory === 'COMUM')}
              onClick={() => {
                setSelectedCategory('COMUM');
              }}
            >
              Comum
            </S.TabButton>
            <S.TabButton
              $checked={Boolean(selectedCategory === 'CONSTRUÇÃO')}
              onClick={() => {
                setSelectedCategory('CONSTRUÇÃO');
              }}
            >
              Contrução
            </S.TabButton>
            <S.TabButton
              $checked={Boolean(selectedCategory === 'TODOS')}
              onClick={() => {
                setSelectedCategory('TODOS');
              }}
            >
              Todos
            </S.TabButton>
          </S.Tabs>
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
            {materials &&
              materials
                .filter((i) => {
                  if (selectedCategory === 'TODOS') return true;
                  return Boolean(i.category === selectedCategory);
                })
                ?.map((item, index) => (
                  <S.TableRow
                    $isSelected={selectedTableRows.includes(item.id)}
                    onClick={() => {
                      if (Number(item.quantity_value) > 0) {
                        toggleRowSelection(item.id);
                      }
                    }}
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
                  </S.TableRow>
                ))}
          </S.Table>
          {selectedTableRows.length > 0 && (
            <Link href={`/dashboard/almox/manage/stock/material/${encryptSlug}`}>
              <S.Button>Selecionar Quantidade ({selectedTableRows.length})</S.Button>
            </Link>
          )}
        </>
      )}
    </S.Container>
  );
}
