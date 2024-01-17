import React, { useState } from 'react';

import { motion, PanInfo } from 'framer-motion';

import {
  Container,
  ItemContainer,
  SearchBar,
  DecrementButton,
  IncrementButton
} from './styles';

interface ListItemProps {
  item: string;
  count: number;
  onSelect: ({ count }: { count: number }) => void;
  onReset: () => void;
}

const ListItem: React.FC<ListItemProps> = ({ item, count = 0, onSelect, onReset }) => {
  const [pointer, setPointer] = useState<'auto' | 'none'>('auto');

  const handleDragStart = () => {
    setPointer('auto');
  };

  const handleDrag = (event: MouseEvent | TouchEvent, info: PanInfo) => {
    const x = info.point.x;

    setPointer(x >= 0 ? 'auto' : 'none');
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent, info: PanInfo) => {
    const minDragDistance = window.innerWidth * 0.1;

    if (info.offset.x < -minDragDistance) {
      onReset();
    }
  };

  const handleIncrement = () => {
    onSelect({ count: count + 1 });
  };

  const handleDecrement = () => {
    onSelect({ count: Math.max(0, count - 1) });
  };

  const onUpdate = ({ x }: { x: number }) => {
    setPointer(x >= 0 ? 'auto' : 'none');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (/^\d*$/.test(inputValue) && inputValue.length <= 4) {
      onSelect({ count: inputValue === '' ? 0 : parseInt(inputValue, 10) });
    } else {
      console.error('Por favor, insira apenas números inteiros ou zero.');
    }
  };

  return (
    <motion.li
      initial={{ opacity: 1, scale: 1 }}
      onDragStart={handleDragStart}
      onDrag={(event, info) => handleDrag(event, info)}
      onDragEnd={(event, info) => {
        handleDragEnd(event, info);
        setPointer('auto');
      }}
      drag="x"
      onUpdate={onUpdate}
      dragConstraints={{ left: 0, right: 0 }}
      dragTransition={{ bounceStiffness: 600, bounceDamping: 40 }}
      dragMomentum={false}
      dragElastic={{ left: 0.5, right: 0 }}
      style={{ pointerEvents: pointer }}
    >
      <Container selected={count > 0}>
        <ItemContainer>
          <div>
            <IncrementButton onClick={handleIncrement}>+</IncrementButton>
            <SearchBar type="text" value={String(count)} onChange={handleInputChange} />
            <DecrementButton onClick={handleDecrement}>-</DecrementButton>
          </div>
          <p>{item}</p>
        </ItemContainer>
      </Container>
    </motion.li>
  );
};

export default ListItem;
