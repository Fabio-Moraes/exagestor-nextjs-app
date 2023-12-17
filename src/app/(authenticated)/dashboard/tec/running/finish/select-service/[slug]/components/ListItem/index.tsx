'use client';

import Image from 'components/Vercel/Image';

import reset from './assets/svg/reset.svg';

import { Container, ItemContainer, Reset } from './styles';

interface ListItemProps {
  item: string;
  count: number;
  onSelect: () => void;
  onReset: () => void;
}

export function ListItem(props: ListItemProps) {
  const { item, count = 0, onSelect, onReset } = props;

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
}
