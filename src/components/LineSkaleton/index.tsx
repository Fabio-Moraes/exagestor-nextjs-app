import * as S from './styles';

export function LineSkaleton({ width = '100%', height = '2rem', color = '#6ab78e' }) {
  return <S.Skeleton $width={width} $height={height} $color={color} />;
}
