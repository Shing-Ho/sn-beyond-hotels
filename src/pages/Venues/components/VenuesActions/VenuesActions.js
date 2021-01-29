import React from 'react';
import { Button } from 'antd';

import { ReactComponent as TrashIcon } from 'icons/trash.svg';
import styles from './VenuesActions.module.scss';

export default function VenuesActions() {
  return (
    <div className={styles.venuesActions}>
      <Button className={[styles.btn, styles.primary]}>
        <i className="fa fa-eye" aria-hidden="true" /> Preview
      </Button>
      <Button className={[styles.btn, styles.copy]}>
        <i className="fa fa-clone" aria-hidden="true" /> Make a Copy
      </Button>
      <Button className={[styles.btn, styles.delete]} icon={<TrashIcon />}>
        Delete Venue
      </Button>
      <Button className={[styles.btn, styles.publish, styles.disabled]} disabled>
        PUBLISH
      </Button>
    </div>
  );
}
