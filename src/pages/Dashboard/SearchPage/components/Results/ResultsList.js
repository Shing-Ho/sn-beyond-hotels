import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';
import Pagination from 'components/Pagination/Pagination';
import ListItem from 'components/ListItem/ListItem';

import hotelActions from 'store/hotel/actions';
import { getTotalCount, getHotels, getFormattedVisibleHotels } from 'store/hotel/selectors';

import styles from './Results.module.scss';

const MenuList = (click) => (
  <Menu onClick={click}>
    <Menu.Item key="lowToHigh">Low to high price</Menu.Item>
    <Menu.Item key="highToLow">High to low price</Menu.Item>
    <Menu.Item key="stars">Stars</Menu.Item>
  </Menu>
);

const ResultsList = ({ filteredHotels, currency }) => {
  const [sortBy, setSortBy] = useState('');
  let hotels = useSelector(getHotels);
  const visibleHotels = useSelector(getFormattedVisibleHotels);
  const count = useSelector(getTotalCount);
  const dispatch = useDispatch();

  if (filteredHotels) {
    hotels = filteredHotels;
  }

  if (!hotels || !hotels.length === 0) return null;

  useEffect(() => {
    dispatch(hotelActions.onSortChange(sortBy));
  }, [sortBy]);

  const onPageChange = (page, pageSize) => {
    dispatch(hotelActions.onPageChange(page, pageSize));
  };

  const onclick = (e) => {
    setSortBy(e.key);
  };

  return (
    <>
      <div className={styles.items}>
        {!!hotels.length && (
          <div className={styles.totalWrapper}>
            <h3 className={styles.total}>
              {hotels.length} <FormattedMessage id="totalResultsFound" defaultMessage="Total results found" />{' '}
            </h3>
            <Dropdown
              overlay={MenuList(onclick)}
              trigger={['click']}
              placement="bottomCenter"
              className={styles.filter}
            >
              <div className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                Sort by <DownOutlined />
              </div>
            </Dropdown>
          </div>
        )}
        {visibleHotels.length ? (
          visibleHotels.map((hotel) => <ListItem data={hotel} currency={currency} key={hotel.hotel_id} />)
        ) : (
          <div className={styles.noRecordsFound}>
            <FormattedMessage id="noResultsFound" defaultMessage="No Results Found" />
          </div>
        )}
      </div>
      {!!visibleHotels.length && count > 0 && (
        <div className={styles.pagination}>
          {!!visibleHotels.length && (
            <h3 className={styles.total}>
              {visibleHotels.length} <FormattedMessage id="totalResultsFound" defaultMessage="Total results found" />{' '}
            </h3>
          )}
          <Pagination
            total={count}
            showSizeChanger
            showQuickJumper
            onChange={onPageChange}
            onShowSizeChange={(current, size) => onPageChange(0, size)}
            className={styles.content}
          />
        </div>
      )}
    </>
  );
};

export default ResultsList;
