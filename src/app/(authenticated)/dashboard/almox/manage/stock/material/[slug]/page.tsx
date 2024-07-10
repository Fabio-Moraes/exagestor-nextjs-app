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
  id: string;
  product_name: string;
  unit_type: string;
  product_code: string;
  quantity_value: string;
  created_at: string;
}

export default function FinishService({ params }: SlugType) {
  const decryptSlug = decryptObject(params.slug) as {
    selectedMaterials: Materials[];
    userId: number;
  };

  return (
    <S.Container>
      <S.Title>Remover da Carga</S.Title>
      <List materials={decryptSlug.selectedMaterials} employeeId={decryptSlug.userId} />
    </S.Container>
  );
}
