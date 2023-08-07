import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  isSelected: boolean;
  onClick: () => void;
  label: string;
};

/**
 * Note: not a 'true' tab, just a button to switch view type
 */
export function TabButton({ children, isSelected, onClick, label }: Props) {
  return (
    <Box
      as={isSelected ? 'div' : 'button'}
      className={'first:rounded-l-lg last:rounded-r-lg'}
      backgroundColor={isSelected ? 'messenger.700' : 'gray.200'}
      textColor={isSelected ? 'white' : 'black'}
      padding={2}
      display='inline-block'
      onClick={onClick}
      // Hidden because you can't switch to the mode you're already in
      aria-hidden={isSelected ? 'true' : 'false'}
      aria-label={label}
    >
      {children}
    </Box>
  );
}
