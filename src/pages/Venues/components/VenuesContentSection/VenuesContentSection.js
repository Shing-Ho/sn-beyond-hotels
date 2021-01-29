import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { Button } from 'antd';
import cx from 'classnames';

import mentorImg from 'images/Icon_SupMan_Onboard_Arrow_Small.png';

import { Tabs, TabPane } from 'components/Tab/Tab';
import Modal from 'components/Modal/Modal';
import ProductsGroupCollapse from '../ProductsGroupCollapse/ProductsGroupCollapse';
import ProductsGroupCollapsedHeader from '../ProductsGroupCollapsedHeader/ProductsGroupCollapsedHeader';
import ProductsGroupHeader from '../ProductsGroupHeader/ProductsGroupHeader';
import VenuesDetailsSteps from '../VenuesDetailsSteps/VenuesDetailsSteps';
import ProductItem from '../ProductItem/ProductItem';
import VenuesProductsDetails from '../VenuesProductsDetails/VenuesProductsDetails';
import VenuesProductsContacts from '../VenuesProductsContacts/VenuesProductsContacts';

import styles from './VenuesContentSection.module.scss';

export default function VenuesContentSection({ productOnboarding, tabsOnboarding }) {
  const intl = useIntl();
  const [modalVisible, setModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('1');

  useEffect(() => {
    setActiveTab(productOnboarding || tabsOnboarding ? '1' : activeTab);
  }, [productOnboarding, tabsOnboarding]);

  useEffect(() => {
    if (activeTab === '2') {
      setModalVisible(true);
    }
  }, [activeTab]);

  return (
    <div className={styles.root}>
      <div
        className={cx(styles.tabPane, {
          [styles.onboarding]: tabsOnboarding,
        })}
      >
        <div className={styles.mentoring}>
          <p>Tab through other sections to add additional details and information</p>
          <img src={mentorImg} alt="Arrow for mentoring" />
        </div>
      </div>
      <Tabs
        className={cx(styles.tabPane, {
          [styles.onboarding]: tabsOnboarding,
        })}
        defaultActiveKey="1"
        activeKey={activeTab}
        onboarding={tabsOnboarding}
        onChange={(key) => setActiveTab(key)}
      >
        <TabPane tab="Products" key="1">
          <ProductsGroupCollapse
            onboarding={productOnboarding}
            header={<ProductsGroupHeader onboarding={productOnboarding} trash equal />}
            collapsedHeader={<ProductsGroupCollapsedHeader title="Main" amount={0} trash equal />}
          >
            <ProductItem onboarding={productOnboarding} />
            <Button className={[styles.addBtn, styles.product]} onClick={() => setModalVisible(true)}>
              <i className="fa fa-plus" aria-hidden="true" /> Add Product
            </Button>
          </ProductsGroupCollapse>
          <Modal
            title="Venue Details"
            visible={modalVisible}
            footer={null}
            centered
            width={1000}
            onCancel={() => setModalVisible(false)}
          >
            <VenuesDetailsSteps onCancel={() => setModalVisible(false)} />
          </Modal>

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
          <Button className={[styles.addBtn, styles.group]} onClick={() => setModalVisible(true)}>
            <i className="fa fa-plus" aria-hidden="true" /> Add Deails
          </Button>
          <VenuesProductsDetails />
          <Modal
            title="Venue Details"
            visible={modalVisible}
            footer={null}
            centered
            width={1000}
            onCancel={() => setModalVisible(false)}
          >
            <VenuesDetailsSteps onCancel={() => setModalVisible(false)} />
          </Modal>
        </TabPane>
        <TabPane tab="Contacts" key="3">
          <VenuesProductsContacts />
          <Button className={[styles.addBtn, styles.product]}>
            <i className="fa fa-plus" aria-hidden="true" /> Add Another Contact
          </Button>
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