import React, { useState } from 'react';
import cx from 'classnames';
import { get } from 'lodash';
import moment from 'moment';
import { ReactComponent as BedIcon } from 'icons/bed.svg';
import { ReactComponent as InfoIcon } from 'icons/info.svg';
import { ReactComponent as CalendarIcon } from 'icons/calendar.svg';
import { ReactComponent as PlusIcon } from 'icons/plusBlue.svg';
import { ReactComponent as ShareIcon } from 'icons/share-bare.svg';
import { ReactComponent as EditIcon } from 'icons/edit.svg';
import { ReactComponent as HeartIcon } from 'icons/heart.svg';
import { ReactComponent as TrashIcon } from 'icons/trash.svg';
import { ItineraryTypes } from 'helpers/constants';
import { Popover } from 'antd';
import { FormattedMessage } from 'react-intl';
import { commaFormat } from 'helpers/utils';
import currency from '../../../../helpers/currency';
import styles from './ItineraryItem.module.scss';

export default function ItineraryItem({ data, actionEnabled, selectedHotel, currency: baseCurrency, onDelete }) {
  const { title, booking, type, ...items } = data;
  const { start_date: startDate, end_date: endDate } = selectedHotel;
  const totalRooms = get(booking, 'room_count');
  const [showActionBar, setShowActionBar] = useState(false);
  const totalNight = moment(endDate).diff(moment(startDate), 'days');
  const totalRate = items?.total?.amount;

  const toggleActionBar = () => setShowActionBar(!showActionBar && actionEnabled);

  const info = () => {
    const rate = data?.avg_nightly_rate;
    const base = data?.total_base_rate;
    const tax = data?.total_tax_rate;
    return (
      <div>
        <p>
          <FormattedMessage
            id="searchPage.filters.resultList.resultItem.rate"
            values={{
              rate: commaFormat(`${currency[rate.currency].symbol}${rate.amount?.toFixed(baseCurrency?.decimal)}`),
            }}
          />
        </p>
        <p>
          <FormattedMessage
            id="searchPage.filters.resultList.resultItem.base"
            values={{
              base: commaFormat(`${currency[base.currency].symbol}${base?.amount?.toFixed(baseCurrency?.decimal)}`),
            }}
          />
        </p>
        <p>
          <FormattedMessage
            id="searchPage.filters.resultList.resultItem.tax"
            values={{
              tax: commaFormat(`${currency[tax.currency].symbol}${tax?.amount.toFixed(baseCurrency?.decimal)}`),
            }}
          />
        </p>
      </div>
    );
  };

  return (
    <div className={styles.root}>
      <div className={cx(styles.item, styles.large)}>
        <div className={styles.title}>
          <div className={styles.headIcon}>{type === ItineraryTypes.Room && <BedIcon />}</div>
          <span>
            {title}
            {` (${totalRooms})`}
          </span>
          {actionEnabled && <span className={cx('fa fa-ellipsis-v', styles.ellipsis)} onClick={toggleActionBar} />}
          {showActionBar && (
            <div className={styles.actionBar}>
              <span className={cx('fa fa-close', styles.close)} onClick={toggleActionBar} />
              <div className={styles.icon} onClick={onDelete}>
                <TrashIcon />
              </div>
              <div className={styles.icon}>
                <HeartIcon />
              </div>
              <div className={styles.icon}>
                <ShareIcon />
              </div>
              <div className={styles.icon}>
                <EditIcon />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={styles.item}>
        <div>
          <div className={styles.icon}>
            <CalendarIcon />
          </div>
          <span>{moment(startDate, 'YYYY-MM-DD').format('MMM DD, YYYY')} Check In</span>
        </div>
      </div>
      <div className={styles.item}>
        <div>
          <div className={styles.icon}>
            <CalendarIcon />
          </div>
          <span>{moment(endDate, 'YYYY-MM-DD').format('MMM DD, YYYY')} Check Out</span>
        </div>
      </div>
      <div className={styles.item}>
        <div>
          <div className={styles.icon}>
            <PlusIcon />
          </div>
          <span>Resort Fee</span>
        </div>
        <span>{currency[data?.avg_nightly_rate?.currency]?.symbol}00.00</span>
      </div>
      <div className={styles.item}>
        <div>
          <div className={styles.icon}>
            <BedIcon />
          </div>
          <div className={styles.roomDescription}>
            <span className={styles.totalNight}>
              {totalNight} Night{totalNight > 1 && 's'} - {title}
            </span>
            <div className={styles.rateInfo}>
              <div className="flex-vertical-center">
                <span className={styles.total}>
                  <FormattedMessage id="ctotal" defaultMessage="TOTAL" />
                </span>
                <span className={styles.itemRate}>
                  {currency[data?.avg_nightly_rate?.currency]?.symbol}
                  {totalRate?.toFixed(2) || '0,000.00'}
                </span>
              </div>
              <div className={`${styles.taxesAndFees} flex-vertical-center`}>
                <Popover content={info}>
                  <InfoIcon className={styles.infoIcon} />
                </Popover>
                <span className={styles.total}>
                  <FormattedMessage id="taxesAndFees" defaultMessage="Taxes and Fees" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
