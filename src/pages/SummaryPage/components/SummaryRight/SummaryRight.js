import React from 'react';
import _ from 'lodash';

// import FormWithHeader from 'components/FormWithHeader/FormWithHeader';
import styles from './SummaryRight.module.scss';

export default function SummaryRight({ bookingHotelPayload }) {
  const getTotalPrice = () => _.get(bookingHotelPayload, 'reservation.room_rate.total.amount');

  const getSubTotalPrice = () => _.get(bookingHotelPayload, 'reservation.room_rate.total_base_rate.amount');

  const getTaxPrice = () => _.get(bookingHotelPayload, 'reservation.room_rate.total_tax_rate.amount');
  return (
    <div>
      {/* <FormWithHeader left="Payments Methods" right={''}>
        <div className={styles.item}>
          <div className={styles.topText}>Credit Card</div>
          <div className={styles.bottomRow}>
            <div className={styles.bottomLeft}>{_.get(paymentPayload, 'token.card.brand')} ...${_.get(paymentPayload, 'token.card.last4')}</div>
            <div className={styles.bottomRight}>${getTotalPrice()}</div>
          </div>
        </div>
      </FormWithHeader> */}
      <div className={styles.priceSummary}>
        <div className={styles.row}>
          <div className={styles.leftText}>Items Subtotal</div>
          <div className={styles.rightText}>${getSubTotalPrice()}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.leftText}>Taxes</div>
          <div className={styles.rightText}>${getTaxPrice()}</div>
        </div>
      </div>
      <div className={styles.orderTotal}>
        <div className={styles.row}>
          <div className={styles.leftText}>OrderTotal</div>
          <div className={styles.rightText}>${getTotalPrice()}</div>
        </div>
      </div>
    </div>
  );
}
