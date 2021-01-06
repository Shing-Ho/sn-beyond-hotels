import React from 'react';
import { Button } from 'antd';

import styles from './VenuesAvailability.module.scss';

export default function VenuesAvailability() {
  return (
    <div className={styles.availability}>
      <h3 className={styles.title}>Availability</h3>
      <p className={styles.description}>Add difference times this venue is open or available by adding rules.</p>
      <Button className={styles.btn}>
        <i className="fa fa-plus" aria-hidden="true" /> Add Rule
      </Button>
    </div>
  );
}
