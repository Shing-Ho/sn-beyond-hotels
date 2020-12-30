import React from 'react';
import { FormattedMessage } from 'react-intl';
import cx from 'classnames';
import NumberInput from 'components/NumberInput/NumberInput';
import Divider from 'components/Divider/Divider';
import { getRandomImageUrl } from 'helpers/utils';
import { ReactComponent as InfoIcon } from 'icons/info.svg';
import { ReactComponent as CloseFillGrayIcon } from 'icons/close-fill-gray.svg';
import { ReactComponent as CheckFillIcon } from 'icons/check-fill.svg';
import styles from './TicketsItem.module.scss';

const TicketsNightLifeItem = ({ details, setData }) => {
  const setGuests = (value) => {
    const obj = details;
    obj.guests = value;
    setData(details.key, obj);
  };
  return (
    <div className={cx(styles.root, { [styles.active]: details && details.guests > 0 })}>
      <img src={getRandomImageUrl()} alt={details && details.title && details.title.toLocaleLowerCase()} />
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

export default TicketsNightLifeItem;
