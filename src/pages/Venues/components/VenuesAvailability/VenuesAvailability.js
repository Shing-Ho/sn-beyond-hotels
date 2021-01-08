import React, { useState } from 'react';
import { Button } from 'antd';

import styles from './VenuesAvailability.module.scss';

export default function VenuesAvailability() {
  const [mode, setMode] = useState(false);
  return (
    <div className={styles.availability}>
      <h3 className={styles.title}>Availability</h3>

      {mode && <div>aaa</div>}
      {!mode && (
        <div className={styles.contentContainer}>
          <p className={styles.description}>Add difference times this venue is open or available by adding rules.</p>
        </div>
      )}
      <Button className={styles.btn} onClick={() => setMode(!mode)}>
        <i className="fa fa-plus" aria-hidden="true" /> Add Rule
      </Button>
    </div>
  );
}
