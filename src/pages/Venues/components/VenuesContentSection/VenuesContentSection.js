import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { Button, Empty } from 'antd';
import cx from 'classnames';

// import venueActions from 'store/venue/actions';
import { getProductGroups } from 'store/venue/selectors';

import mentorImg from 'images/Icon_SupMan_Onboard_Arrow_Small.png';

import { Tabs, TabPane } from 'components/Tab/Tab';
import Modal from 'components/Modal/Modal';
import ProductsGroupCollapse from '../ProductsGroupCollapse/ProductsGroupCollapse';
import ProductsGroupCollapsedHeader from '../ProductsGroupCollapsedHeader/ProductsGroupCollapsedHeader';
import ProductsGroupAdd from '../ProductsGroupAdd/ProductsGroupAdd';
import VenuesDetailsSteps from '../VenuesDetailsSteps/VenuesDetailsSteps';
import VenuesHotelDetailsSteps from '../VenuesHotelDetailsSteps/VenuesHotelDetailsSteps';
import ProductItem from '../ProductItem/ProductItem';
import VenuesProductsDetails from '../VenuesProductsDetails/VenuesProductsDetails';
import VenuesProductsContacts from '../VenuesProductsContacts/VenuesProductsContacts';

import styles from './VenuesContentSection.module.scss';

export default function VenuesContentSection({ productOnboarding, tabsOnboarding, venue }) {
  const intl = useIntl();
  const [modalVisible, setModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('1');
  const [isProductGroupAdd, setIsProductGroupAdd] = useState(false);

  const productGroups = useSelector(getProductGroups);

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
          {/* // For onboarding */}
          {productOnboarding && (
            <>
              <ProductsGroupAdd onboarding={productOnboarding} trash equal />
              <ProductItem onboarding={productOnboarding} />
            </>
          )}
          {productGroups && productGroups.length > 0 && (
            <>
              {productGroups.map((item) => (
                <ProductsGroupCollapse
                  key={item.id}
                  header={<ProductsGroupCollapsedHeader title={item.name} amount={0} trash equal collapsed="close" />}
                >
                  <Button className={[styles.addBtn, styles.product]} onClick={() => setModalVisible(true)}>
                    <i className="fa fa-plus" aria-hidden="true" /> Add Product
                  </Button>
                </ProductsGroupCollapse>
              ))}
            </>
          )}
          {/* <ProductsGroupCollapse
            onboarding={productOnboarding}
            header={<ProductsGroupAdd onboarding={productOnboarding} trash equal />}
            // collapsedHeader={<ProductsGroupCollapsedHeader title="Main" amount={0} trash equal />}
          >
            
            <Button className={[styles.addBtn, styles.product]} onClick={() => setModalVisible(true)}>
              <i className="fa fa-plus" aria-hidden="true" /> Add Product
            </Button>
          </ProductsGroupCollapse> */}

          {isProductGroupAdd && (
            <div className={styles.productsGroupAdd}>
              <ProductsGroupAdd add close closeProductGroupAdd={setIsProductGroupAdd} {...{ venue }} />
            </div>
          )}
          <Button className={[styles.addBtn, styles.group]} onClick={() => setIsProductGroupAdd(true)}>
            <i className="fa fa-plus" aria-hidden="true" /> Add Product Group
          </Button>

          <div className={styles.description}>
            <p>
              <b>Default product groups.</b> Create product groups to easily bundle similar types of products. Showcase
              featured products in the Highlights group. Add available offers for customers to add on to their selected
              products in the Offers group.
            </p>
          </div>
          <ProductsGroupCollapse
            header={<ProductsGroupCollapsedHeader title="Hightlights" amount={0} />}
            collapsed="close"
          >
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          </ProductsGroupCollapse>
          <ProductsGroupCollapse header={<ProductsGroupCollapsedHeader title="Offers" amount={0} />} collapsed="close">
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
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
            {/* <VenuesDetailsSteps onCancel={() => setModalVisible(false)} /> */}
            <VenuesHotelDetailsSteps onCancel={() => setModalVisible(false)} />
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
