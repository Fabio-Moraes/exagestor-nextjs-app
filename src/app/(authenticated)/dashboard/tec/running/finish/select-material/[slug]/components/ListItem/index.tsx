'use client';

import Image from 'next/image';
import React from 'react';

import reset from './assets/svg/reset.svg';
import { Container, ItemContainer, Reset } from './styles';

interface ListItemProps {
  item: string;
  count: number;
  onSelect: () => void;
  onReset: () => void;
}

const ListItem: React.FC<ListItemProps> = ({ item, count = 0, onSelect, onReset }) => {
  return (
    <Container selected={Boolean(count > 0)}>
      <ItemContainer onClick={onSelect}>
        <span>{count}</span>
        <p>{item}</p>
      </ItemContainer>
      {Boolean(count > 0) && (
        <Reset onClick={onReset}>
          <Image priority loading="eager" src={reset} alt="Reset" width={35} height={35} />
        </Reset>
      )}
    </Container>
  );
};

export default ListItem;
