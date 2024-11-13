'use client';

import * as S from './styles';

type PropsTypes = { description: string; percentage: number };

export function ProgressBar(props: PropsTypes) {
  const { description, percentage } = props;

  return (
    <S.Container $percentage={percentage}>
      <p>
        {description} {!isNaN(percentage) && `${Math.floor(percentage)}%`}
      </p>
    </S.Container>
  );
}
