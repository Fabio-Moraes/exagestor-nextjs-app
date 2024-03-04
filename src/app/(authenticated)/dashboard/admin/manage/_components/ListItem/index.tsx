'use client';

import { useRouter } from 'next/navigation';

import { encryptObject } from 'functions';

import { Container, ItemContainer } from './styles';

interface ListItemProps {
  id: number;
  name: string;
  role: string;
  identification: string;
  created_at: string;
}

const ListItem: React.FC<ListItemProps> = (props) => {
  const { id, name, role, identification, created_at } = props;

  const router = useRouter();

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

  async function fetchConcludedServices() {
    const encryptSlug = encryptObject({ userId: id });
    router.push(`/dashboard/admin/manage/new/${encryptSlug}`);
  }

  return (
    <Container selected={false}>
      <ItemContainer onClick={fetchConcludedServices}>
        <p>Nome: {name}</p>
        <p>
          {identification.length > 14 ? 'CNPJ' : 'CPF'}: {identification}
        </p>
        <p>Registrado em: {formatDate(created_at)}</p>
        <p>Cargo: {role.charAt(0).toUpperCase() + role.slice(1)}</p>
      </ItemContainer>
    </Container>
  );
};

export default ListItem;
