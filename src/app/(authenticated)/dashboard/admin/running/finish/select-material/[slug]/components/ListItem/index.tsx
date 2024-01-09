'use client';

import React from 'react';

import Image from 'components/Vercel/Image';

import reset from './assets/svg/reset.svg';

import { Container, ItemContainer, Reset, SearchBar } from './styles';

interface ListItemProps {
  item: string;
  count: number;
  onSelect: ({ count }: { count: number }) => void;
  onReset: () => void;
}

const ListItem: React.FC<ListItemProps> = ({ item, count, onSelect, onReset }) => {
  return (
    <Container selected={Boolean(count > 0)}>
      <ItemContainer /* onClick={onSelect} */>
        <SearchBar
          type="number"
          placeholder="0"
          value={String(count)}
          onChange={(e) => {
            onSelect({ count: Number(e.target.value) });
          }}
        />
        {/* <span>{count}</span> */}
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
