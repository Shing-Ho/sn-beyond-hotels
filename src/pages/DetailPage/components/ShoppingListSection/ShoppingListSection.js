import React from 'react';
import cx from 'classnames';
import { useSelector } from 'react-redux';
import { Tabs, TabPane } from 'components/Tab/Tab';
import GoogleMap from 'components/GoogleMap/GoogleMap';
import Divider from 'components/Divider/Divider';
import { getCurrency } from 'store/core/selectors';
import styles from './ShoppingListSection.module.scss';
import ShopItem from '../DetailItem/ShopItem';
import products from '../../../ShoppingPage/ProductJson/product.json';
import Collapse from '../../../../components/Collapse/Collapse';

const location = {
  lat: 27.2046,
  lng: 77.4977,
};

export default function ShoppingListSection() {
  const currency = useSelector(getCurrency);

  return (
    <div className={cx(styles.root)}>
      <Tabs className={styles.tabPane} defaultActiveKey="1">
        <TabPane tab="PRODUCTS" key="1">
          <Collapse header="Popular" type="detail" className={styles.select}>
            <ShopItem currency={currency} data={products[1]} />
            <ShopItem currency={currency} data={products[2]} />
            <Divider margin={17} />
          </Collapse>
          <Collapse className={styles.select} header="Electronics" type="detail" activeKey={null}>
            <ShopItem currency={currency} data={products[3]} />
            <Divider margin={17} />
          </Collapse>
          <Collapse className={styles.select} header="Groceries" type="detail" activeKey={null}>
            <ShopItem currency={currency} data={products[0]} />
            <Divider margin={17} />
          </Collapse>
          <Collapse className={styles.select} header="Toys" type="detail" activeKey={null}>
            <ShopItem currency={currency} data={products[1]} />
            <Divider margin={17} />
          </Collapse>
          <Collapse className={styles.select} header="Health" type="detail" activeKey={null}>
            <ShopItem currency={currency} data={products[4]} />
            <Divider margin={17} />
          </Collapse>
          <Collapse className={styles.select} header="Beauty" type="detail" activeKey={null}>
            <ShopItem currency={currency} data={products[6]} />
            <Divider margin={17} />
          </Collapse>
          <Collapse className={styles.select} header="Pets" type="detail" activeKey={null}>
            <ShopItem currency={currency} data={products[8]} />
            <Divider margin={17} />
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
