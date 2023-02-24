import type { LinkProps } from 'next/link';
import Link from 'next/link';

type LinkWrapProps = React.PropsWithChildren<LinkProps> & {
  isDisabled?: boolean;
};

const LinkWrap = ({ isDisabled, ...linkProps }: LinkWrapProps) => {
  if (isDisabled) {
    return linkProps.children as React.ReactElement;
  }

  return <Link {...linkProps} legacyBehavior />;
};

export default LinkWrap;
