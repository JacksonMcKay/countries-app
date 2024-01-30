// chakra theme

import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme = extendTheme({ config, fonts: {
  // Copied from the Chakra defaults but with Noto Color Emoji added
  body: '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Noto Color Emoji","Segoe UI Emoji","Segoe UI Symbol"'
} });

export default theme;
