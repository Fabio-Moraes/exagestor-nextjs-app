'use client';

import { Container, ItemContainer } from './styles';

interface ListItemProps {
  name: string;
  role: string;
  identification: string;
  created_at: string;
}

const ListItem: React.FC<ListItemProps> = (props) => {
  const { name, role, identification, created_at } = props;

  function formatDate(date: string) {
    const now = new Date(date);
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }

  return (
    <Container selected={false}>
      <ItemContainer>
        <p>Nome: {name}</p>
        <p>
          {identification.length > 14 ? 'CNPJ' : 'CPF'}: {identification}
        </p>
        <p>Registrado em: {formatDate(created_at)}</p>
        <p>Cargo: {role === 'employee' ? 'FL' : role}</p>
      </ItemContainer>
    </Container>
  );
};

export default ListItem;
