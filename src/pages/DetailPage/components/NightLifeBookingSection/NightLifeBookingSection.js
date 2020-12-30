import React from 'react';
import { Button } from 'antd';
import cx from 'classnames';
import { FormattedMessage } from 'react-intl';
import DatePicker from 'components/DatePicker/DatePicker';
import { ReactComponent as CloseIcon } from 'icons/close-fill-gray.svg';
import styles from './NightLifeBookingSection.module.scss';

export default function NightLifeBookingSection({ className }) {
  const onBookNowClick = () => {};

  return (
    <div className={cx(styles.root, className)}>
      <div className={styles.bookContent}>
        <div className={styles.datepicker}>
          <h3>
            <FormattedMessage id="pickAdate" defaultMessage="Pick a Date" />
          </h3>
          <div className="w-100">
            <DatePicker className="w-100" format="MMMM DD, YYYY" />
          </div>
        </div>
        <div className={styles.yourOrder}>
          <span>
            <FormattedMessage id="yourReservation" defaultMessage="Your Reservation" />
          </span>
          <div>
            General Admission
            <span>
              <b>2</b> <FormattedMessage id="guests" defaultMessage="Guests" />
              <CloseIcon width="12px" height="12px" />
            </span>
          </div>
          <div>
            Pool Table
            <span>
              <b>8</b> <FormattedMessage id="guests" defaultMessage="Guests" />
              <CloseIcon width="12px" height="12px" />
            </span>
          </div>
        </div>
        <div className={styles.total}>
          <span>
            <FormattedMessage id="total" defaultMessage="Total" />
          </span>
          <span className={styles.totalCost}>$ 150.00</span>
        </div>
      </div>
      <Button className={styles.bookNow} onClick={onBookNowClick}>
        <FormattedMessage id="reserveNow" defaultMessage="Reserve Now" />
      </Button>
      <Button className={styles.addToItinerary} onClick={onBookNowClick}>
        <FormattedMessage id="addToItinerary" defaultMessage="Add to Itinerary" />
      </Button>
    </div>
  );
}
