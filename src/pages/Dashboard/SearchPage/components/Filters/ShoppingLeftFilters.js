import React from 'react';
import { Form, Input, InputNumber, Select, Radio } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import FormItem from 'components/FormItem/FormItem';
import shoppingActions from 'store/shopping/actions';
import { FormattedMessage, useIntl } from 'react-intl';
import { getFilters, getShopBy } from 'store/shopping/selectors';
import Collapse from 'components/Collapse/Collapse';
import Rating from 'components/Rating/Rating';
import styles from './ShoppingLeftFilters.module.scss';
import productStores from '../../../../ShoppingPage/ProductJson/store.json';

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
    dispatch(shoppingActions.onSearchFilterChange({ minPrice: value }));
  };
  const onShopByChange = (event) => {
    dispatch(shoppingActions.setShopByView(event.target.value));
  };
  const onMaxChange = (value) => {
    dispatch(shoppingActions.onSearchFilterChange({ maxPrice: value }));
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
              formatter={(value) => `${currency?.symbol} ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
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
            <Collapse header="NAME OF FILTER">
              <div>
                <input type="checkbox" name="dataHere" value="Data Here" />
                <span className={styles.spacingLeft}>Data Here</span>
              </div>
              <div>
                <input type="checkbox" name="moreDataHere" value="More Data Here" />
                <span className={styles.spacingLeft}>More Data Here</span>
              </div>
              <div>
                <input type="checkbox" name="evenMoreDataHere" value="Even More Data Here" />
                <span className={styles.spacingLeft}>Even More Data Here</span>
              </div>
              <div>
                <input type="checkbox" name="dataHere" value="Data Here" />
                <span className={styles.spacingLeft}>Data Here</span>
              </div>
            </Collapse>
          </FormItem>
          <FormItem>
            <Collapse header={intl.formatMessage({ id: 'shopping.filterbystores', defaultValue: 'FILTER BY STORES' })}>
              {productStores.map((store) => (
                <div>
                  <input type="checkbox" name="target" value={store.id} />
                  <span className={styles.spacingLeft}>{store.title}</span>
                </div>
              ))}
            </Collapse>
          </FormItem>
          <FormItem>
            <Collapse header={intl.formatMessage({ id: 'shopping.allcategories', defaultValue: 'ALL CATEGORIES' })}>
              <div>
                <input type="checkbox" name="dataHere" value="Data Here" />
                <span className={styles.spacingLeft}>Data Here</span>
              </div>
              <div>
                <input type="checkbox" name="moreDataHere" value="More Data Here" />
                <span className={styles.spacingLeft}>More Data Here</span>
              </div>
              <div>
                <input type="checkbox" name="evenMoreDataHere" value="Even More Data Here" />
                <span className={styles.spacingLeft}>Even More Data Here</span>
              </div>
              <div>
                <input type="checkbox" name="dataHere" value="Data Here" />
                <span className={styles.spacingLeft}>Data Here</span>
              </div>
            </Collapse>
          </FormItem>
          <FormItem>
            <Collapse header={intl.formatMessage({ id: 'shopping.allcategories', defaultValue: 'ALL CATEGORIES' })} />
          </FormItem>
          <FormItem>
            <Collapse header={intl.formatMessage({ id: 'shopping.allcategories', defaultValue: 'ALL CATEGORIES' })} />
          </FormItem>
        </Form>
      </div>
    </div>
  );
};

export default ShoppingLeftFilters;
