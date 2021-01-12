import React, { useState } from 'react';
import { Tabs, TabPane } from 'components/Tab/Tab';
import { Radio } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { getFilteredProducts, getSelectedCategory, getShopBy } from 'store/shopping/selectors';
import shoppingActions from 'store/shopping/actions';
import GoogleMap from 'components/GoogleMap/GoogleMap';
import styles from './ShoppingPage.module.scss';
import ShoppingItems from './ShoppingItems';
import ShoppingStoreItems from './ShoppingStoreItems';
import ShoppingCategories from '../ProductJson/category.json';

const ShoppingPage = ({ toggleDrawer }) => {
  const [view, setView] = useState('list');
  const products = useSelector(getFilteredProducts);
  const selectedCategory = useSelector(getSelectedCategory);
  const shopyBy = useSelector(getShopBy);
  const dispatch = useDispatch();
  const onTabChange = (key) => {
    dispatch(shoppingActions.onCategoryFilterChange({ categoryid: key }));
  };
  const onViewChange = (e) => {
    setView(e.target.value);
  };

  return (
    <div className={styles.root}>
      <div className={styles.viewSwitch}>
        <Radio.Group defaultValue="list" buttonStyle="solid" className={styles.radio} onChange={onViewChange}>
          <Radio.Button value="list" onClick={() => toggleDrawer(true)}>
            <i className="fa fa-bars" aria-hidden="true" />
            &nbsp; Filters
          </Radio.Button>
          <Radio.Button value="map">
            <i className="fa fa-map-marker" aria-hidden="true" />
            &nbsp; View Map
          </Radio.Button>
        </Radio.Group>
      </div>

      <Tabs className={styles.tabPane} defaultActiveKey={selectedCategory} onChange={onTabChange}>
        {ShoppingCategories.map((item) => (
          <TabPane tab={item.title} key={item.id} />
        ))}
      </Tabs>

      <div className={styles.container}>
        {view === 'list' && (shopyBy === 'PRODUCTS' ? <ShoppingItems products={products} /> : <ShoppingStoreItems />)}
        {view !== 'list' && <GoogleMap height={600} center={[24.2028, 10.4418]} coords={[24.2028, 10.4418]} />}
      </div>
    </div>
  );
};

export default ShoppingPage;
