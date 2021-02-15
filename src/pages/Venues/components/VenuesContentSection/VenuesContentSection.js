import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { Button, Empty } from 'antd';
import cx from 'classnames';

import venueActions from 'store/venue/actions';
import { getProductGroups, getProductsByGroup } from 'store/venue/selectors';

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
import ProductList from '../ProductList/ProductList';

import styles from './VenuesContentSection.module.scss';

export default function VenuesContentSection({ productOnboarding, tabsOnboarding, venue }) {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('1');
  const [isProductGroupAdd, setIsProductGroupAdd] = useState(false);
  const productGroups = useSelector(getProductGroups);
  const [venueGroups, setVenueGroups] = useState([]);

  useEffect(() => {
    if (productGroups) {
      setVenueGroups(productGroups.sort((a, b) => a.order - b.order));
    }
  }, [productGroups]);

  useEffect(() => {
    setActiveTab(productOnboarding || tabsOnboarding ? '1' : activeTab);
  }, [productOnboarding, tabsOnboarding]);

  useEffect(() => {
    if (activeTab === '2') {
      setModalVisible(true);
    }
  }, [activeTab]);

  const getProductsByGroupID = (id) => useSelector(getProductsByGroup(id));

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const ordered = reorder(venueGroups, result.source.index, result.destination.index);

    const orders = [];
    if (ordered.length > 0) {
      ordered.map((order) => orders.push(order.id));
    }
    const isSame =
      ordered.length === venueGroups.length && ordered.every((element, index) => element === venueGroups[index]);

    if (venue && orders.length > 0 && !isSame) {
      const payload = {
        venue: venue.id,
        order: orders,
      };
      setVenueGroups(ordered);
      dispatch(venueActions.updateVenueProductGroupOrder(payload));
    }
  };

  const getListStyle = () => ({
    background: 'transparent',
    width: '100%',
  });

  const getItemStyle = (draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    margin: `0 0 20px 0`,

    // change background colour if dragging
    background: 'transparent',
    boxSizing: 'none',

    // styles we need to apply on draggables
    ...draggableStyle,
  });

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
          {venueGroups && venueGroups.length > 0 && (
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable">
                {(drop, snapshot) => (
                  <div {...drop.droppableProps} ref={drop.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
                    {venueGroups.map((item, index) => (
                      <Draggable key={item.id} draggableId={`item_${item.id}`} index={index}>
                        {(drag) => (
                          <div
                            ref={drag.innerRef}
                            {...drag.draggableProps}
                            style={getItemStyle(drag.draggableProps.style)}
                          >
                            <ProductsGroupCollapse
                              key={item.id}
                              header={
                                <ProductsGroupCollapsedHeader
                                  title={item.name}
                                  group={item}
                                  venue={venue}
                                  amount={getProductsByGroupID(item.id).length}
                                  edit
                                  trash
                                  equal
                                  {...{ drag }}
                                />
                              }
                              collapsed="close"
                            >
                              <ProductList venue={venue} group={item} products={getProductsByGroupID(item.id)} />
                            </ProductsGroupCollapse>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {drop.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          )}

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
