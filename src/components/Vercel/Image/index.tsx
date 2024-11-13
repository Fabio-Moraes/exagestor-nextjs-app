import Image, { type ImageProps } from 'next/image';

function VercelImage(props: ImageProps) {
  const { alt = '', ...otherProps } = props;
  return <Image {...otherProps} alt={alt} />;
}

export default VercelImage;
