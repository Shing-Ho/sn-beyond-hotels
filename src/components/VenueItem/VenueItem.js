import React from 'react';

import styles from './VenueItem.module.scss';

export default function VenueItem({ left, right, children }) {
  return (
    <div className={styles.root}>
      <div className={styles.top}>
        {left && <span className={styles.leftText}>{left}</span>}
        {right && <span className={styles.rightText}>{right}</span>}
      </div>
      {children}
    </div>
  );
}
