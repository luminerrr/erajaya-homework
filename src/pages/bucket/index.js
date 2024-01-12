import BucketCard from '../../components/bucket-card';
import UserLayout from '../../components/layout/UserLayout';
import { dataTest } from '../../data';
import useBucketStore from '../../hooks/useBucketStore';
import { Text, Flex, SimpleGrid } from '@chakra-ui/react';

export default function Bucket() {
  const [bucketList, removeFromBucket] = useBucketStore(s => [
    s.bucketIds,
    s.removeFromBucket,
  ]);
  const itemOnBucket = dataTest.filter(data => {
    return Object.keys(bucketList).includes(data.id.toString());
  });

  return (
    <UserLayout>
      {itemOnBucket.length === 0 ? (
        <Flex direction="row" justifyContent="center" pt={4}>
          <Text>Tidak ada item dalam keranjang</Text>
        </Flex>
      ) : (
        <SimpleGrid
          p={4}
          spacing={4}
          templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
        >
          {itemOnBucket.map(item => (
            <BucketCard
              {...item}
              bucketQty={bucketList[item.id]}
              remove={() => removeFromBucket(item.id)}
            />
          ))}
        </SimpleGrid>
      )}
    </UserLayout>
  );
}
