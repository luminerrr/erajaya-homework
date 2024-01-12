import { create } from 'zustand';

const useBucketStore = create((set, get) => ({
  bucketIds: {},
  addToBucket: (id, qty) => {
    let ids = get().bucketIds;
    const isExist = Object.keys(ids).indexOf(id) >= 0;
    if (!isExist) {
      ids[id] = Number(qty);
      return set({
        bucketIds: ids,
      });
    }
  },
  removeFromBucket: id => {
    let ids = get().bucketIds;
    delete ids[id];
    return set({
      bucketIds: ids,
    });
  },
}));

export default useBucketStore;
