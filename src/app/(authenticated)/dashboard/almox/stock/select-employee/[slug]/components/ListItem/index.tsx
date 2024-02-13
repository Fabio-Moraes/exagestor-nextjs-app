'use client';

import { MouseEventHandler } from 'react';

import { Container, ItemContainer } from './styles';

interface ListItemProps {
  id: number;
  name: string;
  role: string;
  identification: string;
  created_at: string;
  onClick: MouseEventHandler | undefined;
  isSelected: boolean;
}

const ListItem: React.FC<ListItemProps> = (props) => {
  const { name, role, identification, onClick, isSelected } = props;

  return (
    <Container $isSelected={isSelected}>
      <ItemContainer onClick={onClick}>
        <p>Nome: {name}</p>
        <p>
          {identification.length > 14 ? 'CNPJ' : 'CPF'}: {identification}
        </p>
        <p>Cargo: {role.charAt(0).toUpperCase() + role.slice(1)}</p>
      </ItemContainer>
    </Container>
  );
};

export default ListItem;
