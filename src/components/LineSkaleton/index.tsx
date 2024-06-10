import * as S from './styles';

export function LineSkaleton({ width = '100%', height = '2rem' }) {
  return <S.Skeleton $width={width} $height={height} />;
}
