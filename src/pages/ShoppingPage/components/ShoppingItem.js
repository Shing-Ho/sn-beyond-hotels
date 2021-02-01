import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from 'components/Button/Button';
import cx from 'classnames';
import { push } from 'connected-react-router';
import { FormattedMessage } from 'react-intl';
import { ReactComponent as PinIcon } from 'icons/pin.svg';
import GoogleMap from 'components/GoogleMap/GoogleMap';
import shoppingActions from 'store/shopping/actions';
import styles from './ShoppingItem.module.scss';
import IconButton from '../../../components/IconButton/IconButton';
import { ReactComponent as ShoppingIcon } from '../../../icons/dashboardIcons/Icon_Category_Shopping.svg';
import { ReactComponent as SnIcon } from '../../../icons/Icon_Global_Logo_SN_Icon.svg';
import { ReactComponent as DeliveryIcon } from '../../../icons/Icon_Special_Delivery.svg';
import { ReactComponent as InStoreIcon } from '../../../icons/Icon_Special_InStore.svg';

const ShoppingItems = ({ item }) => {
  const [mapOpened, openMap] = useState(false);
  const dispatch = useDispatch();
  const toggleMap = () => {
    openMap(!mapOpened);
  };

  const onViewClick = () => {
    dispatch(shoppingActions.selectProduct(item));
    dispatch(push(`${window.BASE_ROUTE || ''}shopping/product/${item.id}`));
  };

  const shoppingItem = (
    <div className={cx(styles.resultContainer)} key={item.id}>
      <div className={[styles.resultItem, mapOpened && styles.noMarginBottom].join(' ')}>
        <div className={styles.mainimagecontainer}>
          <div className={styles.mainImage}>
            <img src={item.productImage} alt="Result Item" />
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.circle}>
            <div className={styles.bagIconImg}>
              <ShoppingIcon />
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.line}>
              <div className={styles.leftcontent}>
                <h3 className={styles.itemName}>{item.productName}</h3>
                <span className={styles.description}>{item.productDetail}</span>
              </div>
              <div className={styles.rateInfo}>
                <div className="flex-vertical-center">
                  <span>
                    <FormattedMessage id="from" defaultMessage="FROM" />
                  </span>
                  <span className={styles.itemRate}> ${item.price}</span>
                </div>
                <div className={`${styles.taxesAndFees} flex-vertical-center`}>
                  <div className={styles.snIcon}>
                    <SnIcon />
                  </div>
                  <div className={styles.itemRating}>{item.rating}/5</div>
                  <div>
                    <FormattedMessage id="userRating" defaultMessage="Rating" />
                  </div>
                </div>
                <div className={`${styles.targetInfo} flex-vertical-center`}>
                  <span className={styles.itemRating}>
                    Target
                    <div className={item.delivery ? styles.targetavailable : styles.targetunavailable}>
                      <DeliveryIcon />
                    </div>
                    <div className={item.pickup ? styles.targetavailable : styles.targetunavailable}>
                      <InStoreIcon />
                    </div>
                  </span>
                </div>
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
  return <div className={styles.root}>{shoppingItem}</div>;
};

export default ShoppingItems;
