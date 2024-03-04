'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Image from 'components/Vercel/Image';
import { encryptObject } from 'functions';

import { ListItem } from '../ListItem';

import { motion, AnimatePresence } from 'framer-motion';

import infoSvg from './_assets/svg/info.svg';
import searchSvg from './_assets/svg/search.svg';

import { Button, ListContainer, SearchBar, SearchWrapper } from './styles';

interface Materials {
  id: number;
  product_name: string;
  unit_type: string;
  product_code: string;
  quantity_value: string;
  created_at: string;
}

export function List({ materials }: { materials: Materials[] }) {
  const quantityItemsDefault = {} as { [key: string]: number };
  materials?.forEach((item) => (quantityItemsDefault[String(item.id)] = 1));

  const [quantityItems, setQuantityItems] = useState(quantityItemsDefault);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showSelected, setShowSelected] = useState<boolean>(false);

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

  const resetItems = (item: number) => {
    setQuantityItems((prevItems) => {
      return {
        ...prevItems,
        [String(item)]: 0
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
      ...materials.find((obj) => obj.id === Number(item)),
      quantity_value: String(quantityItems[item])
    };
  });

  const encryptSlug = encryptObject({ selectedMaterials });

  return (
    <ListContainer>
      <AnimatePresence>
        <div>
          <SearchWrapper>
            <Image priority src={searchSvg} alt="Book" width={25} height={25} />
            <SearchBar
              type="text"
              placeholder="Pesquisar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchWrapper>
          <div>
            <div>
              <Button onClick={() => setShowSelected(!showSelected)}>
                {showSelected
                  ? 'Mostrar Todos'
                  : `Filtrar Selecionado${
                      nonZeroQuantityItemsValue > 1 ? 's' : ''
                    } (${nonZeroQuantityItemsValue})`}
              </Button>

              <Button
                onClick={() => {
                  setQuantityItems({});
                }}
              >
                Limpar
              </Button>
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
        <Button onClick={() => router.back()}>Voltar</Button>
        <Button
          onClick={() => {
            router.push(`/dashboard/almox/stock/select-employee/${encryptSlug}`);
          }}
        >
          Avançar
        </Button>
      </div>
    </ListContainer>
  );
}
