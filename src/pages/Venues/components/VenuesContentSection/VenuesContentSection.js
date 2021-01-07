import React from 'react';
import { useIntl } from 'react-intl';
import { Button } from 'antd';
import { Tabs, TabPane } from 'components/Tab/Tab';
import ProductsGroupCollapse from '../ProductsGroupCollapse/ProductsGroupCollapse';
import ProductsGroupCollapsedHeader from '../ProductsGroupCollapsedHeader/ProductsGroupCollapsedHeader';
import ProductsGroupHeader from '../ProductsGroupHeader/ProductsGroupHeader';
import styles from './VenuesContentSection.module.scss';

export default function VenuesContentSection() {
  const intl = useIntl();

  return (
    <div className={styles.root}>
      <Tabs className={styles.tabPane} defaultActiveKey="1">
        <TabPane tab="Products" key="1">
          <ProductsGroupCollapse
            header={<ProductsGroupHeader trash equal />}
            collapsedHeader={<ProductsGroupCollapsedHeader title="Main" amount={0} trash equal />}
          >
            aaa
          </ProductsGroupCollapse>

          <div className={styles.description}>
            <p>
              <b>Default porduct groups.</b> Create product groups to easily bundle similar types of products. Showcase
              featured products in the Highlights group. Add available offers for customers to add on to their selected
              products in the Offers group.
            </p>
          </div>
          <ProductsGroupCollapse
            header={<ProductsGroupHeader trash equal />}
            collapsedHeader={<ProductsGroupCollapsedHeader title="Hightlights" amount={0} equal />}
            collapsed="close"
          >
            bbb
          </ProductsGroupCollapse>
          <ProductsGroupCollapse
            header={<ProductsGroupHeader trash equal />}
            collapsedHeader={<ProductsGroupCollapsedHeader title="Offers" amount={0} />}
            collapsed="close"
          >
            bbb
          </ProductsGroupCollapse>
          <Button className={styles.groupAddBtn}>
            <i className="fa fa-plus" aria-hidden="true" /> Add Product Group
          </Button>
        </TabPane>
        <TabPane tab={intl.formatMessage({ id: 'details', defaultValue: 'Details' })} key="2">
          <h1>This is Details tab</h1>
        </TabPane>
        <TabPane tab="Contacts" key="3">
          <h1>This is Contacts tab</h1>
        </TabPane>
        <TabPane tab={intl.formatMessage({ id: 'seating', defaultValue: 'Seating' })} key="4">
          <h1>This is Seating tab</h1>
        </TabPane>
        <TabPane tab={intl.formatMessage({ id: 'menus', defaultValue: 'Menus' })} key="5">
          <h1>This is Menus tab</h1>
        </TabPane>
        <TabPane tab={intl.formatMessage({ id: 'reviews', defaultValue: 'Reviews' })} key="6">
          <div>
            <h1>This is review tab</h1>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}
