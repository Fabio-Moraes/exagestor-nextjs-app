'use client';

import { List } from './_components/List';
import { decryptObject } from 'functions';

import * as S from './styles';

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
    <S.Container>
      <S.Title>Definir Carga</S.Title>
      <List materials={decryptSlug.selectedMaterials} />
    </S.Container>
  );
}
