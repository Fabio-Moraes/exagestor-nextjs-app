'use client';

import { useEffect } from 'react';

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
  /*
    const sleep = async (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  */

  const decryptSlug = decryptObject(params.slug) as { selectedMaterials: Materials[] };

  useEffect(() => {
    console.log(decryptSlug);
  }, []);

  return (
    <Container>
      <Title>
        <h1>Definir Carga</h1>
      </Title>
      <List materials={decryptSlug.selectedMaterials} />
    </Container>
  );
}
