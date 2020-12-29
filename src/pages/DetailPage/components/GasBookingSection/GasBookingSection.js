import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Button } from 'antd';
import cx from 'classnames';
import { getCurrency } from 'store/core/selectors';
import TabSelect from 'components/TabSelect/TabSelect';
import { ReactComponent as CloseIcon } from 'icons/close-fill.svg';
import styles from './GasBookingSection.module.scss';

const options = [
  {
    label: 'Fuel Now',
    value: 'fuel',
  },
  {
    label: 'Prepaid',
    value: 'prepaid',
  },
];

export default function GasBookingSection({ className }) {
  const [bookingType, setBookingType] = useState('fuel');
  const currency = useSelector(getCurrency);

  const onBookNowClick = () => {};

  return (
    <div className={cx(styles.root, className)}>
      <div className={styles.bookContent}>
        <TabSelect stretch thin className={styles.tabWrapper} options={options} onChange={setBookingType} />
        {/* TODO: update UI based on booking type */}
        {bookingType === 'prepaid' && (
          <div className={styles.yourOrder}>
            <span>
              <FormattedMessage id="yourOrder" defaultMessage="Your Order" />
            </span>
            <div>
              <FormattedMessage id="standardCarWash" defaultMessage="Standard Car Wash" />
              <span>
                {currency?.symbol}9
                <CloseIcon />
              </span>
            </div>
            <div>
              <FormattedMessage id="prepaidGasCard" defaultMessage="Prepaid Gas Card" />
              <span>
                {currency?.symbol}20
                <CloseIcon />
              </span>
            </div>
          </div>
        )}
        {bookingType === 'fuel' && (
          <div className={styles.yourOrder}>
            <span>
              <FormattedMessage id="yourOrder" defaultMessage="Your Order" />
            </span>
            <div>
              <FormattedMessage id="standardCarWash" defaultMessage="Standard Car Wash" />
              <span>
                {currency?.symbol}15
                <CloseIcon />
              </span>
            </div>
          </div>
        )}
        <div className={styles.total}>
          <span>
            <FormattedMessage id="total" defaultMessage="Total" />
          </span>
          <span className={styles.totalCost}>{currency?.symbol} 29.00</span>
        </div>
      </div>
      <Button className={styles.bookNow} onClick={onBookNowClick}>
        <FormattedMessage id="orderNow" defaultMessage="Fuel Now" />
      </Button>
      <Button className={styles.addToItinerary} onClick={onBookNowClick}>
        <FormattedMessage id="addToItinerary" defaultMessage="Add to Itinerary" />
      </Button>
    </div>
  );
}
