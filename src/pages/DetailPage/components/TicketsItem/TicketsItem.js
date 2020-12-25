import React from 'react';
import { FormattedMessage } from 'react-intl';
import NumberInput from 'components/NumberInput/NumberInput';
import Divider from 'components/Divider/Divider';
import { getRandomImageUrl } from 'helpers/utils';
import Ticket from 'icons/tickets.png';
import { ReactComponent as InfoIcon } from 'icons/info.svg';
import styles from './TicketsItem.module.scss';

const TicketsItem = ({ type = 'EVENT' }) => (
  <div className={styles.root}>
    <img src={type === 'EVENT' ? Ticket : getRandomImageUrl()} alt={type.toLocaleLowerCase()} />
    <div className={styles.detail}>
      <div className={styles.title}>
        <div className={styles.header}>
          <FormattedMessage id="right" defaultMessage="Right" />
        </div>
        <div className={styles.time}>
          12:00 PM, 3:00 PM, <span> + 2</span>
        </div>
      </div>
      <div className={styles.priceDiv}>
        <div className={styles.price}>$190.00</div>
        <div className={styles.duration}>
          {type === 'EVENT' && (
            <>
              160 <FormattedMessage id="min" defaultMessage="Min" />
              <span>
                <FormattedMessage id="duration" defaultMessage="Duration" />
              </span>
            </>
          )}
          {type === 'TOUR' && (
            <>
              2 <FormattedMessage id="hours" defaultMessage="Hours" />
              <span>
                <FormattedMessage id="long" defaultMessage="Long" />
              </span>
            </>
          )}
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

export default TicketsItem;
