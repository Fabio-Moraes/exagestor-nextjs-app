'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { LineSkaleton } from 'components/LineSkaleton';
import Image from 'components/Vercel/Image';
import { encryptObject } from 'functions';

import { ListItem } from '../ListItem';

import { useLocalStorage } from 'contexts/localStorage';
import { motion } from 'framer-motion';

import infoSvg from './_assets/svg/info.svg';
import searchSvg from './_assets/svg/search.svg';

import * as S from './styles';

interface ServiceData {
  id: number;
  client_name: string;
  employee_id: string;
  city: string;
  address: string;
  nomenclature: string;
  classification: string;
  status: string;
  update_count: number;
  created_at: string;
  modification_at: string;
  finished_at: string;
  list_material: string;
  list_service: string;
  observation: string;
  protocol: string;
}

interface Materials {
  id: number;
  product_name: string;
  unit_type: string;
  product_code: string;
  quantity_value: string;
  created_at: string;
}

export function List(props: { serviceData: ServiceData; items: Materials[] }) {
  const { serviceData, items } = props;

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showSelected, setShowSelected] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  const { selectMaterial, setSelectMaterial } = useLocalStorage();

  const router = useRouter();

  async function fetchConcludedMaterial() {
    const encryptSlug = encryptObject({
      protocol: serviceData?.protocol,
      employeeId: serviceData?.employee_id
    });
    router.push(`/dashboard/cop/running/finish/observation-box/${encryptSlug}`, {
      scroll: false
    });
  }

  async function routerBack() {
    const encryptSlug = encryptObject({
      protocol: serviceData?.protocol,
      employeeId: serviceData?.employee_id
    });
    router.push(`/dashboard/cop/running/finish/service/${encryptSlug}`, {
      scroll: false
    });
  }

  const toggleItem = (key: string, count: number, maxCouter: number) => {
    setSelectMaterial((prevItems) => {
      const protocolKey = String(serviceData?.protocol);

      return {
        ...prevItems,
        [protocolKey]: {
          ...(prevItems[protocolKey] || {}),
          [key]: count > maxCouter ? maxCouter : count
        }
      };
    });
  };

  const toggleItemReset = (item: string) => {
    setSelectMaterial((prevItems) => {
      const updatedItems = { ...prevItems };
      const protocolKey = String(serviceData?.protocol);

      if (updatedItems[protocolKey] && updatedItems[protocolKey].hasOwnProperty(item)) {
        const selectedItemsCount = Object.keys(updatedItems[protocolKey]).length;

        if (selectedItemsCount > 1) {
          delete updatedItems[protocolKey][item];
        } else {
          delete updatedItems[protocolKey];
        }
      }

      return updatedItems;
    });
  };

  const selectServiceClean = () => {
    setSelectMaterial((prevItems) => {
      const updatedItems = { ...prevItems };
      const protocolKey = String(serviceData?.protocol);

      if (updatedItems.hasOwnProperty(protocolKey)) {
        delete updatedItems[protocolKey];
      }

      return updatedItems;
    });
  };

  const filteredItems = items?.filter(
    (item) =>
      item.product_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (showSelected ? selectMaterial[String(serviceData?.protocol)]?.[item.id] : true)
  );

  const objListMaterial = JSON.parse(serviceData?.list_material || '{}');
  const protocolKey = String(serviceData?.protocol);

  useEffect(() => {
    if (Object.keys(objListMaterial).length !== 0) {
      setSelectMaterial((prevItems) => {
        return {
          ...prevItems,
          [protocolKey]: objListMaterial
        };
      });
    }
  }, [protocolKey]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const selectedItem =
    items?.filter((item) => selectMaterial[String(serviceData?.protocol)]?.[item.id]) ?? [];

  return (
    <S.ListContainer>
      <div>
        <S.SearchWrapper>
          <Image priority src={searchSvg} alt="Book" width={25} height={25} />
          <S.SearchBar
            type="text"
            placeholder="Pesquisar serviço..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </S.SearchWrapper>
        <div>
          <div>
            <S.Button onClick={() => setShowSelected(!showSelected)}>
              {showSelected
                ? 'Mostrar Todos'
                : `Selecionado${selectedItem.length > 1 ? 's' : ''} (${selectedItem.length})`}
            </S.Button>

            {serviceData?.status !== 'analysis' && !isLoading && (
              <S.Button onClick={selectServiceClean}>Limpar</S.Button>
            )}
          </div>
          <Image priority src={infoSvg} alt="Add" width={30} height={30} />
        </div>
      </div>
      {isLoading ? (
        [...Array(8)].map((_, index) => {
          return (
            <S.ItemsSkeleton key={`itemsSkeleton-${index}`}>
              <LineSkaleton height="3rem" width="3.5rem" />
              <LineSkaleton height="3rem" />
            </S.ItemsSkeleton>
          );
        })
      ) : (
        <>
          {serviceData?.status === 'analysis' && (
            <S.AlertList>
              O serviço já foi finalizado pelo técnico e está <br /> em modo de análise para validação.
            </S.AlertList>
          )}
          {filteredItems.map((item, index) => (
            <motion.ul
              key={`motion-${index}`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <ListItem
                key={`listItem-${index}`}
                blocked={Boolean(serviceData?.status === 'analysis')}
                item={item.product_name}
                count={selectMaterial?.[String(serviceData?.protocol)]?.[item.id]}
                onSelect={({ count }) => {
                  toggleItem(String(item.id), count, Number(item.quantity_value));
                }}
                onReset={() => toggleItemReset(String(item.id))}
              />
            </motion.ul>
          ))}
        </>
      )}
      <div>
        <S.Button onClick={() => routerBack()}>Voltar</S.Button>
        <S.Button onClick={() => fetchConcludedMaterial()}>Avançar</S.Button>
      </div>
    </S.ListContainer>
  );
}
