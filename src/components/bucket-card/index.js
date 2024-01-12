import {
  Flex,
  Card,
  CardBody,
  Image,
  Heading,
  Text,
  Button,
  Input,
  useNumberInput,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import useBucketStore from '../../hooks/useBucketStore';

export default function BucketCard({
  id,
  name,
  quantity,
  imageUrl,
  bucketQty,
  remove,
}) {
  const { watch, setValue } = useForm({
    defaultValues: {
      quantity: +bucketQty,
    },
  });
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      min: 1,
      defaultValue: Number(bucketQty),
      value: Number(watch('quantity')),
      max: Number(quantity),
      onChange: val => {
        setValue('quantity', Number(val));
      },
    });
  const [addToBucket] = useBucketStore(s => [s.addToBucket]);
  const toast = useToast();
  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  return (
    <Card maxW="lg">
      <CardBody>
        <Flex direction="column" gap={4}>
          <Image
            src={imageUrl}
            borderRadius="lg"
            boxSize={32}
            objectFit="cover"
          />
          <Heading fontSize={20} minH={16}>
            {name}
          </Heading>
          <Text>Jumlah dalam keranjang: {bucketQty}</Text>
          <Flex direction="column" gap={4}>
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
              variant="outline"
              colorScheme="green"
              isDisabled={watch('quantity') === bucketQty}
              onClick={() => {
                addToBucket(id, +watch('quantity'));
                toast({
                  title: 'Item berhasil diubah!',
                  duration: 1500,
                  status: 'success',
                  position: 'top',
                });
              }}
            >
              Edit Jumlah
            </Button>
            <Button
              variant="outline"
              colorScheme="red"
              onClick={() => {
                remove();
                toast({
                  title: 'Item berhasil dihapus!',
                  duration: 1500,
                  status: 'success',
                  position: 'top',
                });
              }}
            >
              Hapus Barang
            </Button>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
}
