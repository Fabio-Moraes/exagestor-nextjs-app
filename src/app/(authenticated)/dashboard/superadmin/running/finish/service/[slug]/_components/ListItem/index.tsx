import type React from 'react';
import { useState } from 'react';

import { motion, type PanInfo } from 'framer-motion';

import * as S from './styles';

interface ListItemProps {
  item: string;
  count: number;
  onSelect: ({ count }: { count: number }) => void;
  blocked: boolean;
  onReset: () => void;
}

export const ListItem: React.FC<ListItemProps> = (props) => {
  const { item, count = 0, onSelect, onReset, blocked } = props;

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
      if (!blocked) onReset();
    }
  };

  const handleIncrement = () => {
    if (!blocked) onSelect({ count: count + 1 });
  };

  const handleDecrement = () => {
    if (!blocked) onSelect({ count: Math.max(0, count - 1) });
  };

  const onUpdate = ({ x }: { x: number }) => {
    setPointer(x >= 0 ? 'auto' : 'none');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (/^\d*$/.test(inputValue) && inputValue.length <= 4) {
      if (!blocked) onSelect({ count: inputValue === '' ? 0 : Number.parseInt(inputValue, 10) });
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
      style={{ pointerEvents: pointer, listStyle: 'none' }}
    >
      <S.Container selected={count > 0}>
        <S.ItemContainer>
          <div>
            <S.IncrementButton style={{ opacity: blocked ? 0.3 : 1 }} onClick={handleIncrement}>
              +
            </S.IncrementButton>
            <S.SearchBar
              style={{ pointerEvents: blocked ? 'none' : 'auto' }}
              type="text"
              value={String(count)}
              onChange={handleInputChange}
            />
            <S.DecrementButton style={{ opacity: blocked ? 0.3 : 1 }} onClick={handleDecrement}>
              -
            </S.DecrementButton>
          </div>
          <p>{item}</p>
        </S.ItemContainer>
      </S.Container>
    </motion.li>
  );
};
