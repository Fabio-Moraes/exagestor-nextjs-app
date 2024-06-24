import Link, { LinkProps } from 'next/link';

type LinkType = {
  children?: JSX.Element;
} & LinkProps;

function VercelLink({ children, ...props }: LinkType) {
  const { href = '/', ...otherProps } = props;
  return (
    <Link {...otherProps} href={href}>
      {children}
    </Link>
  );
}

export default VercelLink;
