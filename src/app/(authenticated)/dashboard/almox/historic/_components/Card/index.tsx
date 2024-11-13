import * as S from './styles';

interface Material {
  id: number;
  name_tec: string;
  name_role: string;
  product_name: string;
  unit_type: string;
  product_code: string;
  quantity_value: string;
  category: string;
  created_at: string;
}

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

const categoriesMap = {
  CONSTRUCAO: 'CONSTRUÇÃO',
  INSTALACAO: 'INSTALAÇÃO',
  COMUM: 'COMUM'
} as { [key: string]: string };

export function Card({ material }: { material: Material }) {
  const createdAt = formatDate(material.created_at);

  return (
    <S.Container rel="preload" onClick={() => {}}>
      <p></p>
      <div>
        <p>FUNCIONÁRIO: {material?.name_tec?.concat(` (${material?.name_role.toUpperCase()})`)}</p>
        <p>MATERIAIS: {material?.product_name}</p>
        <p>QUANTIDADE: {material?.quantity_value}</p>
        <p>TIPO: {material?.unit_type}</p>
        <p>CÓDIGO: {material?.product_code}</p>
        <p>CATEGORIA: {categoriesMap[material.category]}</p>
        <p>ENVIADO EM: {createdAt}</p>
      </div>
    </S.Container>
  );
}
