import React from 'react';
import cx from 'classnames';

import styles from './index.module.scss';

const DashboardFilter = ({ searchTypeData, searchType, onItemClick }) => (
  <div className={styles.content}>
    {searchTypeData.map((item) => (
      <div
        className={cx(styles.searchType, { [styles.selectedSearchType]: item.value === searchType })}
        onClick={() => onItemClick(item.value)}
      >
        <div className={styles.icon}>{item.value === searchType ? item.selectedIcon : item.icon}</div>
        <div>{item.name}</div>
      </div>
    ))}
  </div>
);

export default DashboardFilter;