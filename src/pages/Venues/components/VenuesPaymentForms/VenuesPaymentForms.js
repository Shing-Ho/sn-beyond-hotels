import React from 'react';
import cx from 'classnames';

import PaypalImg from 'icons/paypal-logo.png';
import AlipayImg from 'icons/alipay-logo.png';
import VenmoImg from 'icons/venmo-logo.png';
import WechatImg from 'icons/wechat-logo.png';
import ApplepayImg from 'icons/applepay-logo.png';
import ChaseImg from 'icons/chase-logo.png';
import BitcoinImg from 'icons/bitcoin-logo.png';

import styles from './VenuesPaymentForms.module.scss';

export default function VenuesPaymentForms() {
  return (
    <div className={styles.paymentForms}>
      <div className={cx(styles.paymentItem, styles.active)}>
        <div className={[styles.name, styles.center]}>CREDIT/DEBIT</div>
      </div>
      <div className={styles.paymentItem}>
        <img src={PaypalImg} alt="paypal" />
      </div>
      <div className={styles.paymentItem}>
        <img src={VenmoImg} alt="Venmo" />
      </div>
      <div className={styles.paymentItem}>
        <img src={ApplepayImg} alt="Apple Pay" />
      </div>
      <div className={styles.paymentItem}>
        <img src={ChaseImg} alt="Chase" />
      </div>
      <div className={styles.paymentItem}>
        <img src={WechatImg} alt="WeChat Pay" />
      </div>
      <div className={styles.paymentItem}>
        <img src={AlipayImg} alt="Alipay" />
      </div>
      <div className={styles.paymentItem}>
        <img src={BitcoinImg} alt="Bitcoin" />
      </div>
    </div>
  );
}
