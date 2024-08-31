import * as S from './styles';

type SelectedCable = {
  id: number;
  description: string;
  cable_length_meters?: number;
  status: string;
};

type List = {
  list: SelectedCable[];
};

export function SelectedList({ list }: List) {
  return (
    <S.Container>
      {list.map((item, index) => {
        const description = item.description;
        const cable_length_meters = item.cable_length_meters?.toLocaleString('pt-BR');

        if (Number(item.cable_length_meters) > 0) {
          return (
            <span key={index.toString()}>{`${description} - ${cable_length_meters}M`}</span>
          );
        }
      })}
    </S.Container>
  );
}
