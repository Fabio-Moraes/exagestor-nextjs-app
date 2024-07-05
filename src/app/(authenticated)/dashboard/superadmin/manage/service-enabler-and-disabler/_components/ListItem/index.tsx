import { motion } from 'framer-motion';

import * as S from './styles';

type ListProps = {
  id: number;
  description: string;
  status: 'ativo' | 'inativo';
  created_at: string;
  observation: string;
};

type FetchService = {
  modificationId?: string;
  status?: 'ativo' | 'inativo';
};

type ListItemProps = {
  item: ListProps;
  onClickButton: (i: FetchService) => void;
};

export const ListItem: React.FC<ListItemProps> = (props) => {
  const { item, onClickButton } = props;
  return (
    <motion.li initial={{ opacity: 1, scale: 1 }}>
      <S.Container selected={Boolean(item.status === 'ativo')}>
        <S.ItemContainer selected={Boolean(item.status === 'ativo')}>
          <p>{item.description}</p>
          <button
            onClick={() =>
              onClickButton({
                status: item.status === 'ativo' ? 'inativo' : 'ativo',
                modificationId: String(item.id)
              })
            }
          />
        </S.ItemContainer>
      </S.Container>
    </motion.li>
  );
};
