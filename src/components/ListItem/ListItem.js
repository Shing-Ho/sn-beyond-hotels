/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Popover } from 'antd';
import { get } from 'lodash';
import cx from 'classnames';
import { ReactComponent as PinIcon } from 'icons/pin.svg';
import { ReactComponent as BedIcon } from 'icons/bed3.svg';
import { ReactComponent as InfoIcon } from 'icons/info.svg';
import GoogleMap from 'components/GoogleMap/GoogleMap';
import hotelActions from 'store/hotel/actions';
import { commaFormat } from 'helpers/utils';
import { push } from 'connected-react-router';
import IconButton from '../IconButton/IconButton';
import Button from '../Button/Button';
import Rating from '../Rating/Rating';
import TaxAndFees from '../TaxAndFees/TaxAndFees';
import styles from './ListItem.module.scss';

const ListItem = ({ data, className, currency }) => {
  const [mapOpened, openMap] = useState(false);
  const dispatch = useDispatch();

  const toggleMap = () => {
    openMap(!mapOpened);
  };

  const onViewClick = () => {
    dispatch(hotelActions.selectHotel(data));
    dispatch(push(`${window.BASE_ROUTE || ''}/hotels/${data.id}`));
  };

  return (
    <div className={cx(styles.resultContainer, className)}>
      <div className={styles.resultItem}>
        <div className={styles.mainImage} onClick={onViewClick}>
          <img src={data.image} alt="Result Item" />
        </div>

        <div className={styles.right}>
          <div className={styles.circle}>{data.icon || <BedIcon />}</div>
          <div className={styles.content}>
            <div className={styles.line}>
              <h3 className={styles.itemName} onClick={onViewClick}>
                {data.name}
              </h3>
              <div className={styles.rateInfo}>
                <div className="flex-vertical-center">
                  <span>
                    <FormattedMessage id="average" defaultMessage="AVERAGE" />
                  </span>
                  <span className={styles.itemRate} onClick={onViewClick}>
                    {currency?.symbol + commaFormat(data.rate.toFixed(currency?.decimal))}
                  </span>
                </div>
                {(data.base || data.tax) && (
                  <div className={`${styles.taxesAndFees} flex-vertical-center`}>
                    <Popover content={<TaxAndFees data={data} currency={currency} />}>
                      <InfoIcon className={styles.infoIcon} />
                    </Popover>
                    <span>
                      <FormattedMessage id="taxesAndFees" defaultMessage="Taxes and Fees" />
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <Rating scoreonly score={data.hotel_details.star_rating} className={styles.rating} />
            </div>
            <div className={`${styles.line} ${styles.baseline}`}>
              <span className={styles.description}>
                {get(data.detail, 'address.address1')}
                <div>
                  {get(data.detail, 'address.city')}
                  {data.detail.address.province ? `, ${data.detail.address.province}` : ''},{' '}
                  {get(data.detail, 'address.country')}
                  {get(data.detail, 'address.postal_code')}
                </div>
              </span>
              <div className={styles.actions}>
                {data.geolocation && <IconButton Icon={PinIcon} onClick={toggleMap} />}
                <Button onClick={onViewClick}>
                  <FormattedMessage id="view" defaultMessage="View" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {mapOpened && (
        <GoogleMap
          height={300}
          center={[data.geolocation.latitude, data.geolocation.longitude]}
          coords={[data.geolocation]}
        />
      )}
    </div>
  );
};

export default ListItem;
