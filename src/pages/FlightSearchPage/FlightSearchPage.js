import React from 'react';
import { useSelector } from 'react-redux';

import { getCurrency } from 'store/core/selectors';

import Page from 'components/Page/Page';
import FlightSearchForm from './components/FlightSearchForm/FlightSearchForm';
import FlightSearchBottom from './components/FlightSearchBottom/FlightSearchBottom';
import FlightSearchSupport from './components/FlightSearchSupport/FlightSearchSupport';
import styles from './FlightSearchPage.module.scss';

const FlightSearchPage = () => {
  const currency = useSelector(getCurrency);
  return (
    <Page noHeader noFooter>
      <div className={styles.root}>
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
