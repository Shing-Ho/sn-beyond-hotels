import React from 'react';
import Select from 'components/Select/Select';
import styles from './FlightSearchHeader.module.scss';

const FlightSearchHeader = ({ search, searchOptions, onChange }) => (
  <div className={styles.content}>
    <div className={styles.searchBar}>
      <Select
        placeholder="Search..."
        value={search}
        options={searchOptions}
        suffix={<span className="fa fa-search" />}
        onChange={onChange}
      />
    </div>
  </div>
);

export default FlightSearchHeader;
