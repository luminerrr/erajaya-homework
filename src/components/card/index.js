import {
  Card,
  CardBody,
  Image,
  Flex,
  Text,
  Heading,
  Link,
  Button,
  useNumberInput,
  Input,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { Link as ReactRouterLink } from 'react-router-dom';
import useBucketStore from '../../hooks/useBucketStore';

export default function ProductCard({
  id,
  name,
  category,
  description,
  price,
  quantity,
  imageUrl,
}) {
  const { watch, setValue } = useForm({
    defaultValues: {
      quantity: 0,
    },
  });
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      min: 0,
      defaultValue: 0,
      value: Number(watch('quantity')),
      max: Number(quantity),
      onChange: val => {
        setValue('quantity', Number(val));
      },
    });
  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();
  const [bucketList, addToBucket] = useBucketStore(
    s => [s.bucketIds, s.addToBucket]
  );
  const toast = useToast();

  return (
    <Card maxW="lg">
      <CardBody>
        <Flex direction="column" w="full" alignItems="center" mb={4}>
          <Image
            src={imageUrl}
            borderRadius="lg"
            boxSize={36}
            objectFit="cover"
          />
        </Flex>
        <Flex direction="column">
          <Heading fontSize={18} minH={16}>
            <Link as={ReactRouterLink} to={`/${id}`}>
              {name}
            </Link>
          </Heading>
          <Text fontSize={16} fontWeight={600} color="gray.700">
            {category}
          </Text>
          <Text fontSize={12} minH={14}>
            {description}
          </Text>
          <Text fontSize={12}>{`$ ${price}`}</Text>
          <Text fontSize={12}>Quantity Left: {quantity} pcs</Text>
        </Flex>
        {!!bucketList[id] ? (
          <Text mt={12} color="green.600">
            Sudah ada dalam keranjang
          </Text>
        ) : (
          <>
            <Flex direction="row" gap={4} mt={4}>
              <Button variant="outline" {...dec}>
                -
              </Button>
              <Input
                {...input}
                type="number"
                value={Number(watch('quantity'))}
              />
              <Button variant="outline" {...inc}>
                +
              </Button>
            </Flex>
            <Button
              w="full"
              mt={4}
              variant="outline"
              colorScheme="green"
              isDisabled={Number(watch('quantity')) === 0}
              onClick={() => {
                addToBucket(id, watch('quantity'));
                toast({
                  title: 'Item berhasil ditambahkan!',
                  duration: 1500,
                  status: 'success',
                  position: 'top',
                });
              }}
            >
              Tambahkan ke Keranjang
            </Button>
          </>
        )}
      </CardBody>
    </Card>
  );
}
