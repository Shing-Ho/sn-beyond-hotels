import React from 'react';

import styles from './SummaryHeader.module.scss';

export default function SummaryHeader() {
  return (
    <div className={styles.root}>
      <div className={styles.main}>
        <div className={styles.left}>
          <span className={styles.tick}>✓</span>
          <span>Order Confirmed</span>
        </div>
      </div>
    </div>
  );
}
