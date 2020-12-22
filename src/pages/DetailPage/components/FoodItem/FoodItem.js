import React from 'react';
import { FormattedMessage } from 'react-intl';
import NumberInput from 'components/NumberInput/NumberInput';
import Divider from 'components/Divider/Divider';
import { getRandomImageUrl } from 'helpers/utils';
import { ReactComponent as InfoIcon } from 'icons/info.svg';
import styles from './FoodItem.module.scss';

const FoodItem = ({ type = 'EVENT' }) => (
  <div className={styles.root}>
    <img src={getRandomImageUrl()} alt={type.toLocaleLowerCase()} />
    <div className={styles.detail}>
      <div className={styles.title}>
        <div className={styles.header}>Poutine</div>
      </div>
      <div className={styles.priceDiv}>
        <div className={styles.price}>$8.50</div>
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
          <NumberInput defaultValue={2} onChange={() => null} />
        </div>
      </div>
    </div>
  </div>
);

export default FoodItem;
