import React from 'react';

import styles from './SummaryFormHeader.module.scss'

export default function SummaryFormHeader({icon, title, price, penalty}) {
  return (
    <div className={styles.root}>
      <div className={styles.left}>
        <div className={styles.circle}>
          {icon}
        </div>
        <div className={styles.text}>
          {title}
        </div>
      </div>
      <div className={styles.right}>
        <div>
          {`Total Paid:       $${price}`}
        </div>
        <div>
          {`Total Refundable: $${price - penalty}`}
        </div>
      </div>
    </div>
  )
}