import React from 'react';
import { FormattedMessage } from 'react-intl';
import NumberInput from 'components/NumberInput/NumberInput';
import Divider from 'components/Divider/Divider';
import { ReactComponent as InfoIcon } from 'icons/info.svg';
import Ride1 from '../../../../images/ride1.png';
import Ride2 from '../../../../images/ride2.png';
import Ride3 from '../../../../images/ride3.png';

import styles from './DetailItemNew.module.scss';

const TicketsItem = ({ currency }) => {
  const getRandomImage = () => {
    const images = [Ride1, Ride2, Ride3];
    const number = Math.floor(Math.random() * Math.floor(3));
    return images[number];
  };
  return (
    <div className={styles.root}>
      <img src={getRandomImage()} alt="Tour" />
      <div className={styles.detail}>
        <div className={styles.title}>
          <div className={styles.header}>
            <FormattedMessage id="oceanTour" defaultMessage="Ocean Tour" />
          </div>
          <div className={styles.time}>
            12:00 PM, 3:00 PM, <span> + 2</span>
          </div>
        </div>
        <div className={styles.priceDiv}>
          <div className={styles.price}>{currency?.symbol}190.00</div>
          <div className={styles.duration}>
            2 <FormattedMessage id="hours" defaultMessage="Hours" />
            <span>
              <FormattedMessage id="long" defaultMessage="Long" />
            </span>
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
              <FormattedMessage id="guests" defaultMessage="Guests" />
            </span>
            <NumberInput defaultValue={2} onChange={() => null} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketsItem;
