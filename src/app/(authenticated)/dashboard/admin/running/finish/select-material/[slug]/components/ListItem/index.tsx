import React, { useState } from 'react';

import { motion, useAnimation, ResolvedValues } from 'framer-motion';

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
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [draggedDistance, setDraggedDistance] = useState(0);
  const [pointer, setPointer] = useState<'auto' | 'none'>('auto');

  const controls = useAnimation();

  const isTouchEvent = (event: MouseEvent | TouchEvent): event is TouchEvent => {
    return 'touches' in event;
  };

  const handleDragStart = (event: MouseEvent | TouchEvent) => {
    setDragStartX(isTouchEvent(event) ? event.touches[0].clientX : event.clientX);
  };

  const handleDrag = (event: MouseEvent | TouchEvent, info: { point: { x: number } }) => {
    const x = info.point.x;

    controls.start({ x: 0 });

    if (!isDragging) {
      handleDragStart(event);
      setIsDragging(true);
    }

    setDraggedDistance(x - dragStartX);
  };

  const handleDragEnd = () => {
    const minDragDistance = window.innerWidth * 0.1;

    if (draggedDistance < -minDragDistance) {
      onReset();
    }

    setIsDragging(false);
    setDragStartX(0);
    setDraggedDistance(0);
  };

  const handleIncrement = () => {
    onSelect({ count: count + 1 });
  };

  const handleDecrement = () => {
    onSelect({ count: count < 1 ? 0 : count - 1 });
  };

  function onUpdate(latest: ResolvedValues) {
    const { x } = latest as { x: number };

    if (x >= 0) {
      setPointer('auto');
    } else {
      setPointer('none');
    }
  }

  return (
    <motion.li
      initial={{ opacity: 1, scale: 1 }}
      animate={controls}
      whileHover={{ scale: 1.05 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.2, delay: 0 }}
      onDrag={(event, info) => handleDrag(event, info)}
      onDragEnd={() => handleDragEnd()}
      drag="x"
      onUpdate={onUpdate}
      dragConstraints={{ left: 0, right: 0 }}
      dragTransition={{ bounceStiffness: 600, bounceDamping: 40 }}
      dragMomentum={false}
      dragElastic={{ left: 0.5, right: 0 }}
      style={{ pointerEvents: pointer }}
    >
      <Container selected={Boolean(count > 0)}>
        <ItemContainer>
          <div>
            <IncrementButton onClick={handleIncrement}>+</IncrementButton>
            <SearchBar
              type="text"
              value={String(count)}
              onChange={(e) => {
                const inputValue = e.target.value;
                const regexOnlyDigits = /^\d+$/;

                if (
                  inputValue === '' ||
                  (regexOnlyDigits.test(inputValue) && inputValue.length <= 4)
                ) {
                  onSelect({ count: inputValue === '' ? 0 : parseInt(inputValue, 10) });
                } else {
                  console.error('Por favor, insira apenas números inteiros ou zero.');
                }
              }}
            />
            <DecrementButton onClick={handleDecrement}>-</DecrementButton>
          </div>
          <p>{item}</p>
        </ItemContainer>
      </Container>
    </motion.li>
  );
};

export default ListItem;
