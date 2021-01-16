import React from 'react';
import { FormattedMessage } from 'react-intl';
import Divider from 'components/Divider/Divider';
import Select from 'components/Select/Select';
import { getRandomImageUrl } from 'helpers/utils';
import { ReactComponent as InfoIcon } from 'icons/info.svg';
import styles from './DetailItemNew.module.scss';

const options = [
  {
    title: '$20',
    value: 20,
  },
  {
    title: 'Standard',
    value: 'standard',
  },
];

const ShopDetailItem = ({ currency }) => (
  <div className={styles.root}>
    <img src={getRandomImageUrl()} alt="Gas" />
    <div className={styles.detail}>
      <div className={styles.title}>
        <div className={styles.header}>Prepaid Gas Card</div>
      </div>
      <div className={styles.priceDiv}>
        <div className={styles.price}>
          {currency?.symbol}190.00 <span> ~ {currency?.symbol}210</span>
        </div>
      </div>
      <Divider />
      <div className={styles.learnDiv}>
        <div className={styles.learn}>
          <InfoIcon />
          <FormattedMessage id="learnMore" defaultMessage="Learn More" />
        </div>
        <div className={styles.countDiv}>
          <span className="mr-1">
            <FormattedMessage id="amount" defaultMessage="Amount" />
          </span>
          <Select options={options} />
        </div>
      </div>
    </div>
  </div>
);

export default ShopDetailItem;
