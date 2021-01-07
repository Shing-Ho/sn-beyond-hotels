import React from 'react';
import { Tabs, TabPane } from 'components/Tab/Tab';
import { useSelector, useDispatch } from 'react-redux';
import { getFilteredProducts, getSelectedCategory } from 'store/shopping/selectors';
import shoppingActions from 'store/shopping/actions';
import styles from './ShoppingPage.module.scss';
import ShoppingItems from './ShoppingItems';
import ShoppingCategories from '../ProductJson/category.json';

const ShoppingPage = () => {
  const products = useSelector(getFilteredProducts);
  const selectedCategory = useSelector(getSelectedCategory);

  const dispatch = useDispatch();
  const onTabChange = (key) => {
    dispatch(shoppingActions.onCategoryFilterChange({ categoryid: key }));
  };

  return (
    <div className={styles.root}>
      <Tabs className={styles.tabPane} defaultActiveKey={selectedCategory} onChange={onTabChange}>
        {ShoppingCategories.map((item) => (
          <TabPane tab={item.title} key={item.id} />
        ))}
      </Tabs>
      <ShoppingItems products={products} />
    </div>
  );
};

export default ShoppingPage;
