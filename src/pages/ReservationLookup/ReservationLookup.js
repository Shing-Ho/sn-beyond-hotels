import React from 'react';

import Page from 'components/Page/Page';
import ReservationLookupHeader from './components/ReservationLookupHeader/ReservationLookupHeader';
import ReservationLookupModify from './components/ReservationLookupModify/ReservationLookupModify';
import styles from './ReservationLookup.module.scss';

export default function ReservationLookup() {
  return (
    <Page noHeader>
      <div className={styles.root}>
        <ReservationLookupHeader />
        <div className={styles.main}>
          <ReservationLookupModify />
        </div>
      </div>
    </Page>
  );
}
