import React from 'react';
import { FormattedMessage } from 'react-intl';
import cx from 'classnames';
import NumberInput from 'components/NumberInput/NumberInput';
import Divider from 'components/Divider/Divider';
import { ReactComponent as InfoIcon } from 'icons/info.svg';
import { ReactComponent as CloseFillGrayIcon } from 'icons/close-fill-gray.svg';
import { ReactComponent as CheckFillIcon } from 'icons/check-fill.svg';
import night1 from '../../../../images/night1.jpeg';
import night2 from '../../../../images/night2.jpeg';
import night3 from '../../../../images/night3.jpeg';
import night4 from '../../../../images/night4.jpeg';
import night5 from '../../../../images/night5.jpeg';
import styles from './DetailItemNew.module.scss';

const NightLifeItem = ({ details, setData }) => {
  const setGuests = (value) => {
    const obj = details;
    obj.guests = value;
    setData(details.key, obj);
  };

  const getRandomImage = () => {
    const images = [night1, night2, night3, night4, night5];
    const number = Math.floor(Math.random() * Math.floor(5));
    return images[number];
  };
  return (
    <div className={cx(styles.root, { [styles.active]: details && details.guests > 0 })}>
      <img src={getRandomImage()} alt={details && details.title && details.title.toLocaleLowerCase()} />
      <div className={styles.detail}>
        <div className={styles.title}>
          <div className={styles.header}>{details.title || <FormattedMessage id="right" defaultMessage="Right" />}</div>
          {details && details.guests > 0 && (
            <div className={styles.icons}>
              <CloseFillGrayIcon width="20px" height="20px" />
              <CheckFillIcon width="30px" height="30px" />
            </div>
          )}
        </div>
        <div className={styles.priceDiv}>
          <div className={styles.price}>$190.00</div>
          {details && details.person > 0 && (
            <div className={styles.personCapacity}>
              <b>
                {details.person} <FormattedMessage id="person" defaultMessage="Person" />
              </b>{' '}
              <FormattedMessage id="capacity" defaultMessage="Capacity" />
            </div>
          )}
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
            <NumberInput
              defaultValue={details && details.guests}
              propsValue={details && details.guests}
              maxValue={details && details.person}
              onChange={setGuests}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NightLifeItem;
