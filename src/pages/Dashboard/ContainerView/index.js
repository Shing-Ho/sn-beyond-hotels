import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { Menu } from 'antd';
import * as _ from 'lodash';
import { getCurrency } from 'store/core/selectors';
import GoogleMap from 'components/GoogleMap/GoogleMap';
import { useIntl } from 'react-intl';
import SearchAndView from '../SearchAndView';
import GridView from './GridView';
import ListView from './ListView';

import styles from './index.module.scss';

const menu = (click) => <Menu onClick={click}>{/* Add menu item for filter here */}</Menu>;

const sortMenu = (click) => (
  <Menu onClick={click}>
    <Menu.Item key="asc">Ascending</Menu.Item>
    <Menu.Item key="desc">Descending</Menu.Item>
  </Menu>
);

const ContainerView = ({ items: initialItems, searchType, subHeader, onItemClick }) => {
  const currency = useSelector(getCurrency);
  const [search, setSearch] = useState([]);
  const [filterBy, setFilterBy] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [itemView, setItemView] = useState('grid');
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, size: 9 });
  const dispatch = useDispatch();
  const intl = useIntl();

  const handlePageChange = (page, size) => {
    setPagination({ page, size });
  };

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  useEffect(() => {
    setPagination({ page: 1, size: 9 });
  }, []);

  useEffect(() => {
    const { page, size } = pagination;
    let data = initialItems;
    if (search.length) {
      data = data.filter((item) => search.every((v) => item.name.toLowerCase().includes(v.toLowerCase())));
    }

    setItems(data.slice((page - 1) * size, page * size));
  }, [search, pagination, initialItems]);

  useEffect(() => {}, [filterBy]);

  useEffect(() => {
    setItems(_.orderBy(items, 'name', sortBy));
  }, [sortBy]);

  const handleFilterBy = (e) => {
    setFilterBy(e.key);
  };

  const handleSortBy = (e) => {
    setSortBy(e.key);
  };

  const handleItemClick = (id) => {
    dispatch(push(`/${searchType}/${id}`));
  };

  if (items.length === 0) return <div className={styles.container}>No results found...</div>;

  return (
    <div>
      <SearchAndView
        search={search}
        filterBy={filterBy}
        sortby={sortBy}
        itemView={itemView}
        setSearch={setSearch}
        filterMenu={menu(handleFilterBy)}
        sortMenu={sortMenu(handleSortBy)}
        setItemView={setItemView}
        intl={intl}
      />
      {subHeader && <div className={styles.subHeader}>{subHeader}</div>}
      {itemView === 'grid' && (
        <GridView
          items={items}
          onPageChange={handlePageChange}
          total={initialItems.length}
          currency={currency}
          searchType={searchType}
          onItemClick={onItemClick || handleItemClick}
        />
      )}
      {itemView === 'list' && (
        <ListView
          items={items}
          total={initialItems.length}
          onPageChange={handlePageChange}
          currency={currency}
          searchType={searchType}
          onItemClick={onItemClick || handleItemClick}
        />
      )}
      {itemView === 'location' && <GoogleMap height={600} center={[24.2028, 10.4418]} coords={[]} />}
    </div>
  );
};

export default ContainerView;
