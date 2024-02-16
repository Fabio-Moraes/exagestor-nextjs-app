'use client';

import { List } from './components/List';
import { decryptObject } from 'functions';

import { Container, Title } from './styles';

interface SlugType {
  params: {
    slug: string;
  };
}

interface Materials {
  id: number;
  product_name: string;
  unit_type: string;
  product_code: string;
  quantity_value: string;
  created_at: string;
}

export default function FinishService({ params }: SlugType) {
  const decryptSlug = decryptObject(params.slug) as { selectedMaterials: Materials[] };

  return (
    <Container>
      <Title>Definir Carga</Title>
      <List materials={decryptSlug.selectedMaterials} />
    </Container>
  );
}
