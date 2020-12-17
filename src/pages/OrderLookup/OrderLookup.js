import React from 'react';

import Page from 'components/Page/Page';
import OrderLookupHeader from './components/OrderLookupHeader/OrderLookupHeader';
import OrderLookupModify from './components/OrderLookupModify/OrderLookupModify';
import styles from './OrderLookup.module.scss';

export default function OrderLookup() {
  return (
    <Page noHeader>
      <div className={styles.root}>
        <OrderLookupHeader />
        <div className={styles.main}>
          <OrderLookupModify />
        </div>
      </div>
    </Page>
  );
}
