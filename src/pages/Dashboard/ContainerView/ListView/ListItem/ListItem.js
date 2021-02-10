import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { push } from 'connected-react-router';
import { Popover, Empty } from 'antd';
import cx from 'classnames';
import { ReactComponent as PinIcon } from 'icons/pin.svg';
import { ReactComponent as InfoIcon } from 'icons/info.svg';
import GoogleMap from 'components/GoogleMap/GoogleMap';
import hotelActions from 'store/hotel/actions';
import { commaFormat } from 'helpers/utils';
import IconButton from 'components/IconButton/IconButton';
import Button from 'components/Button/Button';
import Rating from 'components/Rating/Rating';
import night1 from 'images/night1.jpeg';
import night2 from 'images/night2.jpeg';
import night3 from 'images/night3.jpeg';
import night4 from 'images/night4.jpeg';
import night5 from 'images/night5.jpeg';
import cover1 from 'images/coverEvent1.jpeg';
import cover2 from 'images/coverEvent2.jpeg';
import cover3 from 'images/coverEvent3.jpeg';
import cover4 from 'images/coverEvent4.jpeg';
import transport1 from 'images/transport1.jpg';
import transport2 from 'images/transport2.jpg';
import transport3 from 'images/transport3.jpeg';
import transport4 from 'images/transport4.jpeg';
import transport5 from 'images/transport5.jpeg';
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
      case 'events':
        name = 'Hamilton - The Musical';
        break;
      case 'nightlife':
        name = 'Encore Beach Club';
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

  // eslint-disable-next-line consistent-return
  const getRandomImageUrl = (dataImage, dataType) => {
    let imagesArr = [];
    let number = 0;
    let image;
    const switchType = type === 'all' ? dataType : type;
    switch (switchType) {
      case 'events':
        imagesArr = [cover1, cover2, cover3, cover4];
        number = Math.floor(Math.random() * Math.floor(4));
        image = imagesArr[number];
        break;
      case 'nightlife':
        imagesArr = [night1, night2, night3, night4, night5];
        number = Math.floor(Math.random() * Math.floor(5));
        image = imagesArr[number];
        break;
      case 'transports':
        imagesArr = [transport1, transport2, transport3, transport4, transport5];
        number = Math.floor(Math.random() * Math.floor(5));
        image = imagesArr[number];
        break;
      default:
        image = dataImage;
        break;
    }
    return image;
  };

  return (
    <div className={cx(styles.resultContainer, className)}>
      <div className={styles.resultItem}>
        <div className={styles.mainImage}>
          {data?.image && <img src={getRandomImageUrl(data?.image, data?.type)} alt="Result Item" />}
          {!data?.image && <Empty description="No Image" image={Empty.PRESENTED_IMAGE_SIMPLE} />}
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
                  {data?.type !== 'gas' && data?.type !== 'tours' && data?.type !== 'dining' && (
                    <>
                      <span>
                        <FormattedMessage id="average" defaultMessage="AVERAGE" />
                      </span>
                      <span className={styles.itemRate}>{currency?.symbol + commaFormat(data.rate)}</span>
                    </>
                  )}
                  {data?.type === 'tours' && (
                    <>
                      <span>
                        <FormattedMessage id="duration" defaultMessage="DURATION" />
                      </span>
                      <span className={styles.itemRate}>{data.duration}</span>
                    </>
                  )}
                  {data?.type === 'gas' && <span className={styles.itemRate}>{data.rate}</span>}
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

            {data?.type !== 'tours' && (
              <div>
                <Rating scoreonly score={data.rating} className={styles.rating} />
              </div>
            )}
            <div className={`${styles.line} ${styles.baseline}`}>
              {data?.type !== 'tours' && (
                <span className={styles.description}>{data.description || 'No description provided'}</span>
              )}
              {data?.type === 'tours' && (
                <div>
                  <span>{data.style}</span>
                  <div className={styles.tourDescription} dangerouslySetInnerHTML={{ __html: data.description }} />
                </div>
              )}
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
