import React from 'react';
import { Button } from 'antd';

import { ReactComponent as CloseIcon } from 'icons/Icon_Global_Action_Close.svg';
import styles from './VenuesAssistant.module.scss';

export default function VenuesAssistant({ handleOnboarding, onCloseClick }) {
  return (
    <div className={styles.venuesAssistant}>
      <div className={styles.header}>
        <h3>Supply Manager Assistant</h3>
        <CloseIcon className={styles.closeIcon} onClick={onCloseClick} />
      </div>
      <div className={styles.list}>
        <div className={styles.index}>1</div>
        <div className={styles.content}>Add venue details, photos, videos, and availability.</div>
      </div>
      <div className={styles.list}>
        <div className={styles.index}>2</div>
        <div className={styles.content}>Add Products your venue offers and place them in named Product Groups.</div>
      </div>
      <div className={styles.list}>
        <div className={styles.index}>3</div>
        <div className={styles.content}>Finish adding enough to your venue and Publish to then make Active.</div>
      </div>
      <Button className={styles.btn} onClick={() => handleOnboarding(true)}>
        Show Me How
      </Button>
    </div>
  );
}
