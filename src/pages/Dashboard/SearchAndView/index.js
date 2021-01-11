import React from 'react';
import cx from 'classnames';
import { Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';
import Select from 'components/Select/Select';
import styles from './index.module.scss';

const searchOptions = [
  {
    title: 'Tag',
    value: 'tag',
  },
  {
    title: 'LongTag',
    value: 'longtag',
  },
];

const SearchAndView = ({ setSearch, search, filterMenu, sortMenu, setItemView, itemView, intl }) => (
  <div className={styles.content}>
    <div className={styles.searchBar}>
      <Select
        placeholder={`${intl.formatMessage({ id: 'search', defaultValue: 'Search' })}...`}
        value={search}
        options={searchOptions}
        mode="tags"
        suffix={<span className="fa fa-search" />}
        onChange={setSearch}
      />
    </div>
    <div className={styles.filterBar}>
      <div className={styles.filter}>
        <Dropdown overlay={filterMenu} trigger={['click']} className={styles.dropdown}>
          <div onClick={(e) => e.preventDefault()}>
            <div>
              <FormattedMessage id="filter" defaultMessage="Filter" />
            </div>
            <DownOutlined />
          </div>
        </Dropdown>
      </div>
      <div className={styles.sort}>
        <Dropdown overlay={sortMenu} trigger={['click']} className={styles.dropdown}>
          <div onClick={(e) => e.preventDefault()}>
            <div>
              <FormattedMessage id="sort" defaultMessage="Sort" />
            </div>
            <DownOutlined />
          </div>
        </Dropdown>
      </div>
      <div className={styles.layout}>
        <span
          className={
            itemView === 'grid'
              ? cx('fa fa-th-large', styles.icon, styles.selectedIcon)
              : cx('fa fa-th-large', styles.icon)
          }
          onClick={() => setItemView('grid')}
        />
        <span
          className={
            itemView === 'list' ? cx('fa fa-bars', styles.icon, styles.selectedIcon) : cx('fa fa-bars', styles.icon)
          }
          onClick={() => setItemView('list')}
        />
        <span
          className={
            itemView === 'location'
              ? cx('fa fa-map-marker', styles.icon, styles.selectedIcon)
              : cx('fa fa-map-marker', styles.icon)
          }
          onClick={() => setItemView('location')}
        />
      </div>
    </div>
  </div>
);

export default SearchAndView;
