import { Flex, Link } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';

export default function Navbar({ children }) {
  return (
    <Flex direction="column" w="full" h="100vh" gap={0} bg="gray.200">
      <Flex
        direction="row"
        w="full"
        h="64px"
        bg="white"
        alignItems="center"
        px={10}
        justifyContent="space-between"
      >
        <Link as={ReactRouterLink} to="/home">
          Erajaya
        </Link>
        <Flex direction="row-reverse" alignItems="center" gap={8}>
          <Link as={ReactRouterLink} to="/keranjang">
            Keranjang
          </Link>
          <Link as={ReactRouterLink} to="/home">
            Product
          </Link>
        </Flex>
      </Flex>
      <Flex direction="column" w="full" h="full" p={4}>
        <Flex
          direction="column"
          bg="white"
          w="full"
          h="full"
          borderRadius="4px"
        >
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
}
