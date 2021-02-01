import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'antd';
import cx from 'classnames';
import { FormattedMessage } from 'react-intl';
import NumberInput from 'components/NumberInput/NumberInput';
import snIcon from 'icons/Icon_Global_Logo_SN_Icon.svg';
import ShoppingProductRightGridItem from 'components/GridItem/ShoppingProductRightGridItem';
// import products from '../../../ShoppingPage/ProductJson/product.json';
import stores from '../../../ShoppingPage/ProductJson/store.json';
import { getSelectedProduct } from '../../../../store/shopping/selectors';
import styles from './ShoppingProductBookingSection.module.scss';

export default function ShoppingProductBookingSection({ className, currency }) {
  const onBookNowClick = () => {};
  const selectedProduct = useSelector(getSelectedProduct);
  return (
    <div className={cx(styles.root, className)}>
      <div className={styles.topcontent}>
        <Button className={styles.bookNow}>
          <FormattedMessage id="amount" defaultMessage="$" />
          <span>{selectedProduct.price}</span>
        </Button>
        <div className={styles.bookContent}>
          <div className={styles.yourOrder}>
            <div>
              <div className={styles.duration}>
                <span>
                  <img className={styles.targetIcon} src={snIcon} alt="" />
                </span>
                <span className={styles.textColor}> {selectedProduct.rating}/5 </span>
                <span>
                  <FormattedMessage id="userRating" defaultMessage=" User Rating" />
                </span>
              </div>
              <div>
                <NumberInput defaultValue={2} onChange={() => null} />
              </div>
            </div>
          </div>
        </div>
        <Button className={styles.bookNow} onClick={onBookNowClick}>
          <FormattedMessage id="orderNow" defaultMessage="Order Now" />
        </Button>
        <Button className={styles.addToItinerary} onClick={onBookNowClick}>
          <FormattedMessage id="addToItinerary" defaultMessage="Add to Itinerary" />
        </Button>
      </div>
      <ShoppingProductRightGridItem currency={currency} data={{ store: stores[0] }} />
    </div>
  );
}
