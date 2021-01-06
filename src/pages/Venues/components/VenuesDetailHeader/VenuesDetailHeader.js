import React from 'react';
import { Select, Button } from 'antd';

import Input from 'components/Input/Input';
import { ReactComponent as NightlifeWhiteIcon } from 'icons/dashboardIcons/NightlifeWhite.svg';
import styles from './VenuesDetailHeader.module.scss';

export default function VenuesDetailHeader() {
  return (
    <div className={styles.detailHeader}>
      <div className={styles.title}>
        <div className={styles.icon}>
          <NightlifeWhiteIcon />
        </div>
        <div className={styles.input}>
          <Input placeholder="Add the name of the venue here..." maxLength={40} />
        </div>
      </div>
      <div className={styles.tags}>
        <div className={styles.select}>
          <Select className={styles.tagsBox} placeholder="Add tags that describe traits of this venue..." mode="tags" />
        </div>
        <div className={styles.button}>
          <Button className={styles.btn}>Edit Safety</Button>
        </div>
      </div>
    </div>
  );
}
