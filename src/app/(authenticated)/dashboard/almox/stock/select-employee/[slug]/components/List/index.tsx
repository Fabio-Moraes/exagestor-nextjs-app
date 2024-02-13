'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { FullScreenLoading } from 'components/FullScreenLoading';
import { LineSkaleton } from 'components/LineSkaleton';
import { Modal } from 'components/Modal';
import Image from 'components/Vercel/Image';
import { decryptObject } from 'functions';
import apiRoute from 'services/apiRoute';

import ListItem from '../ListItem';

import alertSvg from './assets/svg/alert.svg';
import checkedSvg from './assets/svg/checked.svg';
import searchSvg from './assets/svg/search.svg';

import {
  Button,
  ItemsSkeleton,
  ListContainer,
  SearchBar,
  SearchWrapper,
  ContainerButton
} from './styles';

interface Employee {
  id: number;
  name: string;
  role: string;
  identification: string;
  created_at: string;
}

interface Materials {
  id: number;
  product_name: string;
  unit_type: string;
  product_code: string;
  quantity_value: string;
  created_at: string;
}

export function List({ employee, slug }: { employee: Employee[]; slug: string }) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTableRows, setSelectedTableRows] = useState<number[]>([]);

  const [modalValue, setModalValue] = useState('');
  const [iconSvgModal, setIconSvgModal] = useState('');

  const [fullScreenLoadingValue, setFullScreenLoadingValue] = useState('');
  const [successfullyCompleted, setSuccessfullyCompleted] = useState(false);

  const decryptSlug = decryptObject(slug) as { selectedMaterials: Materials[] };

  const router = useRouter();

  const handleClickOutside = () => {
    if (modalValue !== '') {
      setModalValue('');
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });

  const handleSubmit = async () => {
    if (!successfullyCompleted) {
      const sleep = async (ms: number): Promise<void> => {
        return new Promise((resolve) => setTimeout(resolve, ms));
      };

      const maxRetries = 4;
      const reconnectDelay = 3000;

      for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
        try {
          setFullScreenLoadingValue(
            retryCount > 0 ? `Conectando<br>Tentativa (${retryCount + 1})` : 'Conectando'
          );

          const response = await apiRoute.post('/api/bridge', {
            baseURL: '/api/almox/stock/select-employee/insert-material',
            insert: decryptSlug.selectedMaterials
          });

          const { status } = response.data;

          if (status === 'already registered') {
            setFullScreenLoadingValue('');
            setIconSvgModal(alertSvg);
            setModalValue(`Produto já existente.`);
          }

          if (status === 'success') {
            setSuccessfullyCompleted(true);
            setFullScreenLoadingValue('');
            setIconSvgModal(checkedSvg);
            setModalValue('Novo produto registrado com sucesso.');

            await new Promise((resolve) => setTimeout(resolve, 1000));
            router.push('/dashboard/almox/stock');
          }

          return;
        } catch (error) {
          console.error('Erro na requisição POST:', error);
        }

        await sleep(reconnectDelay);
      }

      setIconSvgModal(alertSvg);
      setModalValue('Não foi possível registrar o produto após várias tentativas.');
      setFullScreenLoadingValue('');
    }
  };

  const filteredItems = employee?.filter((item) =>
    item.name
      .toLowerCase()
      .concat(item.identification.replace(/[.\-/]/g, ''))
      .includes(searchTerm.toLowerCase().replace(/[.\-/]/g, ''))
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const toggleRowSelection = (id: number) => {
    if (selectedTableRows.includes(id)) {
      setSelectedTableRows(selectedTableRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedTableRows([...selectedTableRows, id]);
    }
  };

  return (
    <>
      <ListContainer>
        <div>
          <SearchWrapper>
            <Image priority src={searchSvg} alt="Book" width={25} height={25} />
            <SearchBar
              type="text"
              placeholder="Pesquisar funcionários..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchWrapper>
        </div>
        {isLoading
          ? [...Array(4)].map((_, index) => {
              return (
                <ItemsSkeleton key={String(index)}>
                  <LineSkaleton width="140px" />
                  <LineSkaleton width="190px" />
                  <LineSkaleton width="250px" />
                  <LineSkaleton width="100px" />
                </ItemsSkeleton>
              );
            })
          : filteredItems.map((item) => (
              <ListItem
                isSelected={selectedTableRows.includes(item.id)}
                onClick={() => toggleRowSelection(item.id)}
                key={String(item.id)}
                {...item}
              />
            ))}
        <ContainerButton $isSelected={selectedTableRows.length > 0}>
          <Button
            onClick={() => {
              router.push(`/dashboard/almox/stock`);
            }}
          >
            Voltar
          </Button>
          <Button onClick={() => selectedTableRows.length > 0 && handleSubmit()}>
            Enviar Carga
          </Button>
        </ContainerButton>
      </ListContainer>
      {modalValue && !fullScreenLoadingValue && (
        <Modal icon={iconSvgModal} message={modalValue} />
      )}
      {fullScreenLoadingValue && <FullScreenLoading message={fullScreenLoadingValue} />}
    </>
  );
}
