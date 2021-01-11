import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { getCurrency } from 'store/core/selectors';

import Page from 'components/Page/Page';
import FlightSearchHeader from './components/FlightSearchHeader/FlightSearchHeader';
import FlightSearchForm from './components/FlightSearchForm/FlightSearchForm';
import FlightSearchBottom from './components/FlightSearchBottom/FlightSearchBottom';
import FlightSearchSupport from './components/FlightSearchSupport/FlightSearchSupport';
import styles from './FlightSearchPage.module.scss';

const FlightSearchPage = () => {
  const [search, setSearch] = useState([]);
  const currency = useSelector(getCurrency);
  const searchOptions = ['test'];
  return (
    <Page noHeader noFooter>
      <div className={styles.root}>
        <FlightSearchHeader search={search} searchOptions={searchOptions} onChange={setSearch} />
        <FlightSearchForm />
        <div className={styles.main}>
          <FlightSearchSupport />
          <FlightSearchBottom currency={currency} />
        </div>
      </div>
    </Page>
  );
};

export default FlightSearchPage;
