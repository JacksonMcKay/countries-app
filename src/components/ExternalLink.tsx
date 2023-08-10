import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Link, LinkProps, useColorModeValue } from '@chakra-ui/react';
import { ReactNode } from 'react';

export function ExternalLink({ children, ...linkProps }: { href: string; children: ReactNode } & LinkProps) {
  const color = useColorModeValue('cyan.800', 'cyan.400');

  return (
    <Link
      {...linkProps}
      color={color}
      isExternal
      display='inline-flex'
      alignItems='center'
      gap={1}
      fontWeight='semibold'
      className='underline'
    >
      {children} <ExternalLinkIcon />
    </Link>
  );
}
