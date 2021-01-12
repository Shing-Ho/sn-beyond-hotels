import React, { useState } from 'react';
import Button from 'components/Button/Button';
import cx from 'classnames';
import { FormattedMessage } from 'react-intl';
import GoogleMap from 'components/GoogleMap/GoogleMap';
import { ReactComponent as PinIcon } from 'icons/pin.svg';
import { ReactComponent as ShoppingIcon } from '../../../icons/dashboardIcons/Icon_Category_Shopping.svg';
import IconButton from '../../../components/IconButton/IconButton';
import snIcon from '../../../icons/dashboardIcons/Icon_Global_Logo_SN_Icon.svg';
import deliveryIcon from '../../../icons/dashboardIcons/Icon_Special_Delivery.svg';
import inStoreIcon from '../../../icons/dashboardIcons/Icon_Special_InStore.svg';
import styles from './ShoppingStoreItem.module.scss';

export default function ShoppingStoreItem({ item }) {
  const [mapOpened, openMap] = useState(false);
  const toggleMap = () => {
    openMap(!mapOpened);
  };
  return (
    <div className={styles.root}>
      <div className={cx(styles.resultContainer)}>
        <div className={styles.resultItem}>
          <div className={styles.mainImage}>
            <img src={item.image} alt="Result Item" />
          </div>
          <div className={styles.right}>
            <div className={styles.circle}>
              <div className={styles.bagIconImg}>
                <ShoppingIcon />
              </div>
            </div>
            <div className={styles.content}>
              <div className={styles.line}>
                <h3 className={styles.itemName}>{item.title}</h3>
                <div className={styles.rateInfo}>
                  <div className={`${styles.taxesAndFees} flex-vertical-center`}>
                    <span className={styles.itemRate}>
                      <img className={styles.targetIcon} src={deliveryIcon} alt="" />
                      <img className={styles.targetIcon} src={inStoreIcon} alt="" />
                    </span>
                  </div>
                  <div className={`${styles.taxesAndFees} flex-vertical-center`}>
                    <span>
                      <img className={styles.targetIcon} src={snIcon} alt="" />
                    </span>
                    <span className={styles.itemRate}>{item.rating}/5</span>
                    <span>
                      <FormattedMessage id="userRating" defaultMessage="Rating" />
                    </span>
                  </div>
                </div>
                <div>
                  <br />
                </div>
              </div>
              <div className={`${styles.line} ${styles.baseline}`}>
                <span className={styles.description}>{item.detail}</span>
                <div className={styles.actions}>
                  <IconButton Icon={PinIcon} onClick={toggleMap} />
                  <Button id="view">View </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {mapOpened && <GoogleMap height={300} center={[24.2028, 10.4418]} coords={[24.2028, 10.4418]} />}
    </div>
  );
}
