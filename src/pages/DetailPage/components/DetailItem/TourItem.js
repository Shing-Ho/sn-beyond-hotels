import React from 'react';
import { FormattedMessage } from 'react-intl';
import NumberInput from 'components/NumberInput/NumberInput';
import Divider from 'components/Divider/Divider';
import { ReactComponent as InfoIcon } from 'icons/info.svg';
import Tours1 from '../../../../images/tours1.jpeg';
import Tours2 from '../../../../images/tours2.jpeg';
import Tours3 from '../../../../images/tours3.jpeg';
import Tours4 from '../../../../images/tours4.jpeg';
import Tours5 from '../../../../images/tours5.jpeg';

import styles from './DetailItemNew.module.scss';

const TicketsItem = ({ currency }) => {
  const getRandomImage = () => {
    const images = [Tours1, Tours2, Tours3, Tours4, Tours5];
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
