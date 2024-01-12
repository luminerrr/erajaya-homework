import UserLayout from '../../components/layout/UserLayout';
import {
  SimpleGrid,
  Flex,
  InputGroup,
  Input,
  InputLeftElement,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import { dataTest } from '../../data';
import ProductCard from '../../components/card';
import { useState } from 'react';
import { FaArrowRight, FaSearch } from 'react-icons/fa';
import { useForm } from 'react-hook-form';

export default function Homepage() {
  const [search, setSearch] = useState('');
  const { register, handleSubmit } = useForm();
  const searchProduct = data => {
    setSearch(data.productQuery);
  };
  const productList = dataTest.filter(
    entry =>
      entry.name.toLowerCase().includes(search) ||
      entry.description.toLowerCase().includes(search)
  );

  return (
    <UserLayout>
      <Flex direction="column" p={4} gap={8}>
        <InputGroup>
          <InputLeftElement>
            <FaSearch />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Ketikkan Kata Kunci"
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handleSubmit(searchProduct)();
              }
            }}
            {...register('productQuery', {
              onChange: e => {
                if (e.target.value.length === 0) setSearch('');
              },
            })}
          />
          <InputRightElement
            cursor="pointer"
            onClick={handleSubmit(searchProduct)}
          >
            <FaArrowRight />
          </InputRightElement>
        </InputGroup>

        {productList.length === 0 ? (
          <Flex direction="row" justifyContent="center">
            <Text>Tidak ada barang dengan kata kunci "{search}"</Text>
          </Flex>
        ) : (
          <SimpleGrid
            spacing={4}
            templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
          >
            {productList.map(entry => (
              <ProductCard {...entry}  />
            ))}
          </SimpleGrid>
        )}
      </Flex>
    </UserLayout>
  );
}
