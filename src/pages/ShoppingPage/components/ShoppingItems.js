import React from 'react';
import ShoppingItem from './ShoppingItem';

const ShoppingItems = ({ products }) => {
  const productList = products.map((item) => <ShoppingItem item={item} key={item.id} />);
  return <div>{productList}</div>;
};

export default ShoppingItems;
