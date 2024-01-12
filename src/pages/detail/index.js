import UserLayout from '../../components/layout/UserLayout';
import { useParams } from 'react-router-dom';
import { dataTest } from '../../data';
import { Flex, Image, Text, Heading } from '@chakra-ui/react';

export default function ProductDetail() {
  const { id } = useParams();
  const selectedProduct = dataTest.find(d => d.id === +id);

  return (
    <UserLayout>
      <Flex p={4} direction="row" gap={8}>
        <Image
          src={selectedProduct.imageUrl}
          alt="product"
          boxSize={80}
          maxW="40%"
          objectFit="cover"
        />
        <Flex direction="column" justifyContent='center'>
          <Flex direction="row" gap={8} alignItems="center">
            <Heading fontSize={20} minW={52}>
              Product Name:
            </Heading>
            <Text fontSize={20}>{selectedProduct.name}</Text>
          </Flex>
          <Flex direction="row" gap={8} alignItems="center">
            <Heading fontSize={20} minW={52}>
              Product Category:
            </Heading>
            <Text fontSize={20}>{selectedProduct.category}</Text>
          </Flex>
          <Flex direction="row" gap={8} alignItems="center">
            <Heading fontSize={20} minW={52}>
              Product Description:
            </Heading>
            <Text fontSize={20}>{selectedProduct.description}</Text>
          </Flex>
          <Flex direction="row" gap={8} alignItems="center">
            <Heading fontSize={20} minW={52}>
              Product Price:
            </Heading>
            <Text fontSize={20}>$ {selectedProduct.price}</Text>
          </Flex>
        </Flex>
      </Flex>
    </UserLayout>
  );
}
