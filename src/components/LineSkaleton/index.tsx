import { Skeleton } from './styles';

export function LineSkaleton({ width = '100%', height = '20px' }) {
  return <Skeleton $width={width} $height={height} />;
}
