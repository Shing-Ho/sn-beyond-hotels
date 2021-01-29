import React from 'react';
import ShoppingStoreItem from './ShoppingStoreItem';
import stores from '../ProductJson/store.json';

const ShoppingStoreItems = () => {
  const storeslist = stores.map((item) => <ShoppingStoreItem item={item} key={item.id} />);
  return <div>{storeslist}</div>;
};

export default ShoppingStoreItems;
