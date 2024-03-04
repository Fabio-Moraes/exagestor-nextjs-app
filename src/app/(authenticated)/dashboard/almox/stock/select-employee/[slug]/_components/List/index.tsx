'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { FullScreenLoading } from 'components/FullScreenLoading';
import { LineSkaleton } from 'components/LineSkaleton';
import { Modal } from 'components/Modal';
import Image from 'components/Vercel/Image';
import { decryptObject } from 'functions';
import { TimedWait } from 'functions/TimedWait';
import apiRoute from 'services/apiRoute';

import ListItem from '../ListItem';

import alertSvg from './_assets/svg/alert.svg';
import checkedSvg from './_assets/svg/checked.svg';
import searchSvg from './_assets/svg/search.svg';

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
  const [employeeId, setEmployeeId] = useState<number | null>(null);

  const [modalValue, setModalValue] = useState('');
  const [iconSvgModal, setIconSvgModal] = useState('');

  const [isPopupValue, setIsPopupValue] = useState('');
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
      const maxRetries = 4;

      for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
        try {
          setIsPopupValue(
            retryCount > 0 ? `Conectando<br>Tentativa (${retryCount + 1})` : 'Conectando'
          );

          const response = await apiRoute.post('/api/bridge', {
            baseURL: '/api/almox/stock/select-employee/insert-material',
            employee_id: employeeId,
            insert: decryptSlug.selectedMaterials
          });

          const { status } = response.data;

          if (status === 'already registered') {
            setIsPopupValue('');
            setIconSvgModal(alertSvg);
            setModalValue(`carga já existente.`);
          }

          if (status === 'success') {
            setSuccessfullyCompleted(true);
            setIsPopupValue('');
            setIconSvgModal(checkedSvg);
            setModalValue('Carga distribuída com sucesso.');

            await new Promise((resolve) => setTimeout(resolve, 1000));
            router.push('/dashboard/almox/stock');
          }

          return;
        } catch (error: unknown) {
          if (error instanceof Error) {
            const customError = error as CustomError;
            if (customError.response) {
              const statusCode = customError.response.status;
              if (statusCode === 409) {
                await TimedWait(10000);
              } else {
                await TimedWait(3000);
              }

              if (retryCount === maxRetries) {
                setIconSvgModal(alertSvg);
                setModalValue('Não foi possível distribuir a carga após várias tentativas.');
                setIsPopupValue('');
              }
            }
          }
        }
      }
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
                  <LineSkaleton width="14rem" />
                  <LineSkaleton width="19rem" />
                  <LineSkaleton width="25rem" />
                  <LineSkaleton width="10rem" />
                </ItemsSkeleton>
              );
            })
          : filteredItems.map((item) => (
              <ListItem
                isSelected={employeeId === item.id}
                onClick={() => setEmployeeId(item.id)}
                key={String(item.id)}
                {...item}
              />
            ))}
        <ContainerButton $isSelected={Boolean(employeeId)}>
          <Button
            onClick={() => {
              router.push(`/dashboard/almox/stock`);
            }}
          >
            Voltar
          </Button>
          <Button onClick={() => employeeId && handleSubmit()}>Enviar Carga</Button>
        </ContainerButton>
      </ListContainer>
      {modalValue && !isPopupValue && <Modal icon={iconSvgModal} message={modalValue} />}
      {isPopupValue && <FullScreenLoading message={isPopupValue} />}
    </>
  );
}
