'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { FullScreenLoading } from 'components/FullScreenLoading';
import { Modal } from 'components/Modal';
import Image from 'components/Vercel/Image';
import { TimedWait } from 'functions/TimedWait';
import { internalApi } from 'services/apiAxios';

import { ListItem } from '../ListItem';

import { motion, AnimatePresence } from 'framer-motion';

import alertSvg from './_assets/svg/alert.svg';
import checkedSvg from './_assets/svg/checked.svg';
import infoSvg from './_assets/svg/info.svg';
import searchSvg from './_assets/svg/search.svg';

import * as S from './styles';

interface Materials {
  id: string;
  product_name: string;
  unit_type: string;
  product_code: string;
  quantity_value: string;
  created_at: string;
}

export function List({
  materials,
  employeeId
}: {
  materials: Materials[];
  employeeId: number;
}) {
  const quantityItemsDefault = {} as { [key: string]: number };
  materials?.forEach((item) => (quantityItemsDefault[String(item.id)] = 1));

  const [quantityItems, setQuantityItems] = useState(quantityItemsDefault);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showSelected, setShowSelected] = useState<boolean>(false);

  const [isPopupValue, setIsPopupValue] = useState('');
  const [iconSvgModal, setIconSvgModal] = useState('');
  const [modalValue, setModalValue] = useState('');
  const [successfullyCompleted, setSuccessfullyCompleted] = useState(false);

  const router = useRouter();

  function counterItems(item: Materials, count: number) {
    const maxCouter = Number(materials.find((obj) => obj.id === item.id)?.quantity_value);

    setQuantityItems((prevItems) => {
      return {
        ...prevItems,
        [String(item.id)]: count > maxCouter ? maxCouter : count
      };
    });
  }

  const resetItems = (item: string) => {
    setQuantityItems((prevItems) => {
      return {
        ...prevItems,
        [item]: 0
      };
    });
  };

  const filteredItems = materials?.filter(
    (item) =>
      item.product_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (showSelected ? quantityItems[item.id] > 0 : true)
  );

  function nonZeroQuantityItems(obj: { [key: string]: number }) {
    let count = 0;

    for (const value of Object.values(obj)) {
      if (value !== 0) {
        count++;
      }
    }

    return count;
  }

  const nonZeroQuantityItemsValue = nonZeroQuantityItems(quantityItems);

  const selectedItemKeys = Object.keys(quantityItems);
  const selectedMaterials = selectedItemKeys.map((item) => {
    return {
      ...materials.find((obj) => obj.id === item),
      quantity_value: String(quantityItems[item])
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

          const response = await internalApi.post('/api/bridge', {
            baseURL: '/api/almox/manage/pick-material',
            employee_id: Number(employeeId),
            insert: selectedMaterials
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

  return (
    <>
      <S.ListContainer>
        <AnimatePresence>
          <div>
            <S.SearchWrapper>
              <Image priority src={searchSvg} alt="Book" width={25} height={25} />
              <S.SearchBar
                type="text"
                placeholder="Pesquisar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </S.SearchWrapper>
            <div>
              <div>
                <S.Button onClick={() => setShowSelected(!showSelected)}>
                  {showSelected
                    ? 'Mostrar Todos'
                    : `Selecionado${
                        nonZeroQuantityItemsValue > 1 ? 's' : ''
                      } (${nonZeroQuantityItemsValue})`}
                </S.Button>

                <S.Button
                  onClick={() => {
                    setQuantityItems({});
                  }}
                >
                  Limpar
                </S.Button>
              </div>
              <Image priority src={infoSvg} alt="Add" width={30} height={30} />
            </div>
          </div>
          {materials &&
            filteredItems.map((item) => (
              <motion.ul
                key={item.id}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
              >
                <ListItem
                  key={item.id}
                  item={item}
                  count={quantityItems[item.id]}
                  onSelect={({ count }) => {
                    counterItems(item, count);
                  }}
                  onReset={() => {
                    resetItems(item.id);
                  }}
                />
              </motion.ul>
            ))}
        </AnimatePresence>
        <div>
          <S.Button onClick={() => router.back()}>Voltar</S.Button>
          <S.Button onClick={() => employeeId && handleSubmit()}>Atualizar Carga</S.Button>
        </div>
      </S.ListContainer>
      {modalValue && !isPopupValue && <Modal icon={iconSvgModal} message={modalValue} />}
      {isPopupValue && <FullScreenLoading message={isPopupValue} />}
    </>
  );
}
