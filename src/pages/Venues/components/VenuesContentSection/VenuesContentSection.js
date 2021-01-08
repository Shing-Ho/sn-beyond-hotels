import React from 'react';
import { useIntl } from 'react-intl';
import { Button } from 'antd';
import cx from 'classnames';

import mentorImg from 'images/Icon_SupMan_Onboard_Arrow_Small.png';

import { Tabs, TabPane } from 'components/Tab/Tab';
import ProductsGroupCollapse from '../ProductsGroupCollapse/ProductsGroupCollapse';
import ProductsGroupCollapsedHeader from '../ProductsGroupCollapsedHeader/ProductsGroupCollapsedHeader';
import ProductsGroupHeader from '../ProductsGroupHeader/ProductsGroupHeader';
import ProductItem from '../ProductItem/ProductItem';

import styles from './VenuesContentSection.module.scss';

export default function VenuesContentSection({ productOnboarding, tabsOnboarding }) {
  const intl = useIntl();

  return (
    <div className={styles.root}>
      <Tabs
        className={cx(styles.tabPane, {
          [styles.onboarding]: tabsOnboarding,
        })}
        defaultActiveKey="1"
        onboarding={tabsOnboarding}
      >
        <TabPane tab="Products" key="1">
          <div className={styles.mentoring}>
            <p>Tab through other sections to add additional details and information</p>
            <img src={mentorImg} alt="Arrow for mentoring" />
          </div>
          <ProductsGroupCollapse
            onboarding={productOnboarding}
            header={<ProductsGroupHeader onboarding={productOnboarding} trash equal />}
            collapsedHeader={<ProductsGroupCollapsedHeader title="Main" amount={0} trash equal />}
          >
            <ProductItem onboarding={productOnboarding} />
            <Button className={[styles.addBtn, styles.product]}>
              <i className="fa fa-plus" aria-hidden="true" /> Add Product
            </Button>
          </ProductsGroupCollapse>

          <div className={styles.description}>
            <p>
              <b>Default porduct groups.</b> Create product groups to easily bundle similar types of products. Showcase
              featured products in the Highlights group. Add available offers for customers to add on to their selected
              products in the Offers group.
            </p>
          </div>
          <ProductsGroupCollapse
            header={<ProductsGroupHeader propsValue="Hightlights" trash equal />}
            collapsedHeader={<ProductsGroupCollapsedHeader title="Hightlights" amount={0} equal />}
            collapsed="close"
          >
            <ProductItem />
          </ProductsGroupCollapse>
          <ProductsGroupCollapse
            header={<ProductsGroupHeader propsValue="Offers" trash equal />}
            collapsedHeader={<ProductsGroupCollapsedHeader title="Offers" amount={12} />}
            collapsed="close"
          >
            <ProductItem />
          </ProductsGroupCollapse>
          <Button className={[styles.addBtn, styles.group]}>
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
