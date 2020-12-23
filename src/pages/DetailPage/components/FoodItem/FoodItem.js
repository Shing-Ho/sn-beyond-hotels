import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import NumberInput from 'components/NumberInput/NumberInput';
import Divider from 'components/Divider/Divider';
import { ReactComponent as InfoIcon } from 'icons/info.svg';
import styles from './FoodItem.module.scss';

const FoodItem = ({ type = 'EVENT', data, setData }) => {
  const [quantity, setQuantity] = useState({});

  const handleQuantityChange = (name) => (value) => {
    setQuantity({
      ...quantity,
      [name]: value,
    });

    setData({ ...data, items: value });
  };
  return (
    <div className={styles.root}>
      <img src={data.src} alt={type.toLocaleLowerCase()} />
      <div className={styles.detail}>
        <div className={styles.titleWrapper}>
          <div className={styles.title}>
            <div className={styles.header}>{data.title}</div>
          </div>
          <div className={styles.priceDiv}>
            <div className={styles.price}>${data.price}</div>
          </div>
        </div>
        <Divider margin={17} />
        <div className={styles.learnDiv}>
          <div className={styles.learn}>
            <InfoIcon />
            <FormattedMessage id="learnMore" />
          </div>
          <div className={styles.countDiv}>
            <span className="mr-1">
              <FormattedMessage id="items" />
            </span>
            <NumberInput value={data.items} onChange={handleQuantityChange} name="quantity" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
