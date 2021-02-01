import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Select, Radio, Checkbox } from 'antd';
import { chunk } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import FormItem from 'components/FormItem/FormItem';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import { FormattedMessage, useIntl } from 'react-intl';
import { getFilters, getShopBy } from 'store/shopping/selectors';
import Collapse from 'components/Collapse/Collapse';
import Button from 'components/Button/Button';
import Rating from 'components/Rating/Rating';
import shoppingActions from 'store/shopping/actions';
import productStores from '../../../../ShoppingPage/ProductJson/store.json';
import styles from './ShoppingLeftFilters.module.scss';

const CustomFormInputs = ({ items, title, id }) => {
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [showLessButton, setShowLessButton] = useState(false);
  const [allItems, setAllItems] = useState();
  useEffect(() => {
    if (items) setAllItems(items);
    if (items && items.length > 10) {
      setShowLessButton(true);
    }
  }, [items]);
  // Show less button & hide more button
  const onShowMoreToggleHandler = () => {
    const updatedItems = items;
    setAllItems(updatedItems);
    setShowLessButton(true);
    setShowMoreButton(false);
  };
  // Show more button & hide less button
  const onShowLessToggleHandler = () => {
    const updatedItems = items;
    const newItems = chunk(updatedItems, 10);
    setAllItems(newItems[0]);
    setShowLessButton(false);
    setShowMoreButton(true);
  };
  return (
    <>
      {allItems &&
        allItems.map((item) => (
          <div key={item[id]}>
            <Checkbox className={styles.filterCustomCheckbox}>
              <div className={styles.filterCheckboxLabel}>
                <span>{item[title]}</span>
              </div>
            </Checkbox>
          </div>
        ))}
      {showLessButton && (
        <Button onClick={onShowLessToggleHandler} className={styles.showLessButton}>
          <UpOutlined />
          Show less
          <UpOutlined />
        </Button>
      )}
      {showMoreButton && (
        <Button onClick={onShowMoreToggleHandler} className={styles.showLessButton}>
          <DownOutlined />
          Show more
          <DownOutlined />
        </Button>
      )}
    </>
  );
};

const ShoppingLeftFilters = ({ currency }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const filters = useSelector(getFilters);
  const shopyBy = useSelector(getShopBy);
  const shopByOptions = [
    { label: 'PRODUCTS', value: 'PRODUCTS' },
    { label: 'STORE', value: 'STORE' },
  ];
  const availabilityOptions = [
    { label: 'ANY', value: 'ANY' },
    { label: 'PICKUP', value: 'PICKUP' },
    { label: 'DELIVER', value: 'DELIVERY' },
  ];
  const onMinChange = (value) => {
    const timer = setTimeout(() => {
      dispatch(shoppingActions.onSearchFilterChange({ minPrice: value }));
      clearTimeout(timer);
    }, 1000);
  };
  const onMaxChange = (value) => {
    dispatch(shoppingActions.onSearchFilterChange({ maxPrice: value }));
  };
  const onShopByChange = (event) => {
    dispatch(shoppingActions.setShopByView(event.target.value));
  };
  const onRateChange = (value) => {
    dispatch(shoppingActions.onSearchFilterChange({ starRating: value }));
  };

  return (
    <div className={styles.root}>
      <div className={styles.summary}>
        <div className={styles.header}>
          <h3 className={styles.header}>
            <FormattedMessage id="hotel.filters" defaultMessage="Filters" />
          </h3>
          <div className={styles.valueNumber}>
            <span>264</span>
            <h6>Items</h6>
          </div>
        </div>
      </div>
      <div>
        <Form className={styles.summary} layout="vertical">
          <FormItem label="KEYWORD SEARCH">
            <Input placeholder="Mens Wear..." suffix={<span className="fa fa-search" />} />
          </FormItem>
          <FormItem
            className="item-content"
            label={intl.formatMessage({ id: 'priceRange', defaultValue: 'Price Range' })}
          >
            <InputNumber
              defaultValue={0}
              formatter={(value) => `${currency && currency.symbol} ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              style={{ width: '44%' }}
              onChange={onMinChange}
            />
            <div className={styles.inputDivider}>
              <span />
            </div>
            <InputNumber
              defaultValue={1000}
              style={{ width: '44%' }}
              parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              onChange={onMaxChange}
              formatter={(value) => `${currency?.symbol} ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            />
          </FormItem>
          <FormItem label="POPULAR FILTERS">
            <div className={styles.summary}>
              <Select placeholder="Select..." value="Select" className={styles.searchSelect}>
                <Select.Option key="Test" value="Test">
                  Option
                </Select.Option>
              </Select>
            </div>
          </FormItem>
          <FormItem label="SHOP BY">
            <Radio.Group
              options={shopByOptions}
              value={shopyBy}
              optionType="button"
              buttonStyle="solid"
              className={styles.radio}
              onChange={onShopByChange}
            />
          </FormItem>
          <FormItem label="AVAILABILITY">
            <Radio.Group
              options={availabilityOptions}
              value="ANY"
              optionType="button"
              buttonStyle="solid"
              className={styles.radio}
            />
          </FormItem>
          <FormItem label={intl.formatMessage({ id: 'userRating', defaultValue: 'User Rating' })}>
            <Rating
              scoreonly
              className={styles.starRating}
              score={filters.starRating || 5}
              size={36}
              onChange={onRateChange}
            />
          </FormItem>
          <FormItem>
            <Collapse header="NAME OF FILTER" className={styles.shoppigLeftCollaper}>
              <div>
                <Checkbox className={styles.filterCustomCheckbox}>
                  <div className={styles.filterCheckboxLabel}>
                    <span>Data Here</span>
                  </div>
                </Checkbox>
              </div>
              <div>
                <Checkbox className={styles.filterCustomCheckbox}>
                  <div className={styles.filterCheckboxLabel}>
                    <span>More Data Here</span>
                  </div>
                </Checkbox>
              </div>
              <div>
                <Checkbox className={styles.filterCustomCheckbox}>
                  <div className={styles.filterCheckboxLabel}>
                    <span>Even More Data Here</span>
                  </div>
                </Checkbox>
              </div>
              <div>
                <Checkbox className={styles.filterCustomCheckbox}>
                  <div className={styles.filterCheckboxLabel}>
                    <span>Data Here</span>
                  </div>
                </Checkbox>
              </div>
              <div className={styles.divider} />
            </Collapse>
          </FormItem>
          <FormItem>
            <Collapse header={intl.formatMessage({ id: 'shopping.filterbystores', defaultValue: 'FILTER BY STORES' })}>
              {/* {productStores.map((store) => (
                <div>
                  <input type="checkbox" name="target" value={store.id} />
                  <span className={styles.spacingLeft}>{store.title}</span>
                </div>
              ))} */}
              <CustomFormInputs items={productStores && productStores} title="title" id="id" />
              <div className={styles.divider} />
            </Collapse>
          </FormItem>
          <FormItem>
            <Collapse
              header={intl.formatMessage({ id: 'shopping.allcategories', defaultValue: 'ALL CATEGORIES' })}
              activeKey={null}
            >
              <div>
                <Checkbox className={styles.filterCustomCheckbox}>
                  <div className={styles.filterCheckboxLabel}>
                    <span>Data Here</span>
                  </div>
                </Checkbox>
              </div>
              <div>
                <Checkbox className={styles.filterCustomCheckbox}>
                  <div className={styles.filterCheckboxLabel}>
                    <span>More Data Here</span>
                  </div>
                </Checkbox>
              </div>
              <div>
                <Checkbox className={styles.filterCustomCheckbox}>
                  <div className={styles.filterCheckboxLabel}>
                    <span>Even More Data Here</span>
                  </div>
                </Checkbox>
              </div>
              <div>
                <Checkbox className={styles.filterCustomCheckbox}>
                  <div className={styles.filterCheckboxLabel}>
                    <span>Data Here</span>
                  </div>
                </Checkbox>
              </div>
              <div className={styles.divider} />
            </Collapse>
          </FormItem>
          <FormItem>
            <Collapse
              header={intl.formatMessage({ id: 'shopping.allcategories', defaultValue: 'ALL CATEGORIES' })}
              activeKey={null}
            />
          </FormItem>
          <FormItem>
            <Collapse
              header={intl.formatMessage({ id: 'shopping.allcategories', defaultValue: 'ALL CATEGORIES' })}
              activeKey={null}
            />
          </FormItem>
        </Form>
      </div>
    </div>
  );
};

export default ShoppingLeftFilters;
