import React from 'react';
import { useSelector } from 'react-redux';
import { Tabs, TabPane } from 'components/Tab/Tab';
import Collapse from 'components/Collapse/Collapse';
import GoogleMap from 'components/GoogleMap/GoogleMap';
import { getCurrency } from 'store/core/selectors';
import ShopItem from '../DetailItem/ShopItem';
import styles from './ShoppingListSection.module.scss';
import products from '../../../ShoppingPage/ProductJson/product.json';

const location = {
  lat: 27.2046,
  lng: 77.4977,
};

export default function ShoppingListSection() {
  const currency = useSelector(getCurrency);

  return (
    <div className={styles.root}>
      <Tabs className={styles.tabPane} defaultActiveKey="1">
        <TabPane tab="PRODUCTS" key="1">
          <Collapse className={styles.title} header="Popular" type="large">
            <ShopItem currency={currency} data={products[1]} />
            <ShopItem currency={currency} data={products[2]} />
          </Collapse>
          <Collapse className={styles.title} header="Electronics" type="large">
            <ShopItem currency={currency} data={products[3]} />
          </Collapse>
          <Collapse className={styles.title} header="Groceries" type="large">
            <ShopItem currency={currency} data={products[0]} />
          </Collapse>
          <Collapse className={styles.title} header="Toys" type="large">
            <ShopItem currency={currency} data={products[1]} />
          </Collapse>
          <Collapse className={styles.title} header="Health" type="large">
            <ShopItem currency={currency} data={products[4]} />
          </Collapse>
          <Collapse className={styles.title} header="Beauty" type="large">
            <ShopItem currency={currency} data={products[6]} />
          </Collapse>
          <Collapse className={styles.title} header="Pets" type="large">
            <ShopItem currency={currency} data={products[8]} />
          </Collapse>
        </TabPane>
        <TabPane tab="DETAILS" key="3">
          <h1>This is Details tab</h1>
        </TabPane>
        <TabPane tab="Map" key="4">
          <div className={styles.googleMapContainer}>
            <GoogleMap className={styles.googleMap} center={location} coords={[location]} />
          </div>
        </TabPane>
        <TabPane tab="SAFETY" key="5">
          <div>
            <h1>This is safety tab</h1>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}
