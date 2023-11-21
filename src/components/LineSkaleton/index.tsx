import { Skeleton } from './styles';

export function LineSkaleton({ width = '100%', height = '20px', color = '#6ab78e' }) {
  return <Skeleton $width={width} $height={height} $color={color} />;
}
