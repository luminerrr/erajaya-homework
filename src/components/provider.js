import { ChakraProvider, theme } from '@chakra-ui/react';

export default function Providers({ children }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
