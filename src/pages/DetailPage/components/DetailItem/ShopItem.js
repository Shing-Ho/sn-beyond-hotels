import React from 'react';
import { FormattedMessage } from 'react-intl';
import Button from 'components/Button/Button';
import NumberInput from 'components/NumberInput/NumberInput';
import snIcon from 'icons/Icon_Global_Logo_SN_Icon.svg';
import styles from './ShopItem.module.scss';

const ShopItem = ({ currency, data }) => (
  <div className={styles.root}>
    <img className={styles.productImage} src={data.productImage} alt="shopping" />
    <div className={styles.detail}>
      <div className={styles.title}>
        <div className={styles.header}>
          <FormattedMessage id={data.productName} defaultMessage={data.productName} />
        </div>
      </div>
      <div className={styles.priceDiv}>
        <div className={styles.price}>
          {currency?.symbol}
          {data.price}
        </div>
        <div className={styles.duration}>
          <span>
            <img className={styles.targetIcon} src={snIcon} alt="" />
          </span>
          <span>
            <FormattedMessage id="rating" defaultMessage={`${data.rating}/5`} />
          </span>
          <span>
            <FormattedMessage id="userRating" defaultMessage="User Rating" />
          </span>
        </div>
      </div>
      <div className={styles.viewDetailDiv}>
        <div className={styles.learn}>
          <Button variant="btn btn-success">View</Button>
        </div>
        <div className={styles.countDiv}>
          <span className="mr-1">
            <FormattedMessage id="buy" defaultMessage="BUY" />
          </span>
          <NumberInput defaultValue={2} onChange={() => null} />
        </div>
      </div>
      <br />
      <br />
    </div>
  </div>
);

export default ShopItem;
