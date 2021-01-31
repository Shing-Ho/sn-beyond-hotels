import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from 'components/Button/Button';
import cx from 'classnames';
import { push } from 'connected-react-router';
import { FormattedMessage } from 'react-intl';
import GoogleMap from 'components/GoogleMap/GoogleMap';
import { ReactComponent as PinIcon } from 'icons/pin.svg';
import shoppingActions from 'store/shopping/actions';
import { ReactComponent as ShoppingIcon } from '../../../icons/dashboardIcons/Icon_Category_Shopping.svg';
import IconButton from '../../../components/IconButton/IconButton';
import { ReactComponent as SnIcon } from '../../../icons/Icon_Global_Logo_SN_Icon.svg';
import { ReactComponent as DeliveryIcon } from '../../../icons/Icon_Special_Delivery.svg';
import { ReactComponent as InStoreIcon } from '../../../icons/Icon_Special_InStore.svg';
import styles from './ShoppingStoreItem.module.scss';

export default function ShoppingStoreItem({ item }) {
  const [mapOpened, openMap] = useState(false);
  const dispatch = useDispatch();
  const toggleMap = () => {
    openMap(!mapOpened);
  };

  const onViewClick = () => {
    dispatch(shoppingActions.selectStore(item));
    dispatch(push(`${window.BASE_ROUTE || ''}/shopping/store/${item.id}`));
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
                      <div className={item.delivery ? styles.targetavailable : styles.targetunavailable}>
                        <DeliveryIcon />
                      </div>
                      <div className={item.pickup ? styles.targetavailable : styles.targetunavailable}>
                        <InStoreIcon />
                      </div>
                    </span>
                  </div>
                  <div className={`${styles.taxesAndFees} flex-vertical-center`}>
                    <span>
                      <div className={styles.snIcon}>
                        <SnIcon />
                      </div>
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
                  <IconButton Icon={PinIcon} onClick={toggleMap} className={mapOpened && styles.activeLocationButton} />
                  <Button id="view" onClick={onViewClick}>
                    View
                  </Button>
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
