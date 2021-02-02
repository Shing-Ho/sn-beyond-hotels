import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { push } from 'connected-react-router';
import { Popover } from 'antd';
import cx from 'classnames';
import { ReactComponent as PinIcon } from 'icons/pin.svg';
import { ReactComponent as InfoIcon } from 'icons/info.svg';
import GoogleMap from 'components/GoogleMap/GoogleMap';
import hotelActions from 'store/hotel/actions';
import { commaFormat } from 'helpers/utils';
import IconButton from 'components/IconButton/IconButton';
import Button from 'components/Button/Button';
import Rating from 'components/Rating/Rating';
import TaxAndFees from '../../../../../components/TaxAndFees/TaxAndFees';
import styles from './ListItem.module.scss';

const ListItem = ({ data, className, currency, type }) => {
  const [mapOpened, openMap] = useState(false);
  const dispatch = useDispatch();

  const toggleMap = () => {
    openMap(!mapOpened);
  };

  const onViewClick = () => {
    dispatch(hotelActions.selectHotel(data));
    dispatch(push(`${window.BASE_ROUTE || ''}/hotels/${data.id}`));
  };

  const getName = (dataName, dataType) => {
    let name;
    const switchType = type === 'all' ? dataType : type;
    switch (switchType) {
      case 'tours':
        name = 'ATV Riding Tours';
        break;
      case 'events':
        name = 'Hamilton - The Musical';
        break;
      case 'nightlife':
        name = 'Encore Beach Club';
        break;
      case 'dining':
        name = 'Taix Restaurant';
        break;
      case 'transports':
        name = 'Taxi';
        break;
      default:
        name = dataName;
        break;
    }
    return name;
  };

  return (
    <div className={cx(styles.resultContainer, className)}>
      <div className={styles.resultItem}>
        <div className={styles.mainImage}>
          <img src={data.image} alt="Result Item" />
        </div>

        <div className={styles.right}>
          <div className={styles.circle}>{data.icon}</div>
          <div className={styles.content}>
            <div className={styles.line}>
              <h3 className={styles.itemName}>{getName(data?.name, data?.type)}</h3>
              <div className={styles.rateInfo}>
                {data.subIcons?.length > 0 && (
                  <div className={styles.subInfo}>
                    <div className={styles.icons}>
                      {data.subIcons.map((icon) => (
                        <span>{icon}</span>
                      ))}
                    </div>
                    <span className={styles.text}>6.6kW</span>
                  </div>
                )}
                <div className="flex-vertical-center">
                  <span>
                    <FormattedMessage id="average" defaultMessage="AVERAGE" />
                  </span>
                  <span className={styles.itemRate}>{currency?.symbol + commaFormat(data.rate)}</span>
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
              <Rating scoreonly score={data.rating} className={styles.rating} />
            </div>
            <div className={`${styles.line} ${styles.baseline}`}>
              <span className={styles.description}>{data.description}</span>
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
