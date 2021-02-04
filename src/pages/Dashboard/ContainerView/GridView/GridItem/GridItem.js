import React from 'react';
import { Empty } from 'antd';
import cx from 'classnames';
import { FormattedMessage } from 'react-intl';
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
import dining1 from 'images/dining1.jpg';
import dining2 from 'images/dining2.jpeg';
import dining3 from 'images/dining3.jpeg';
import dining4 from 'images/dining4.jpeg';
import dining5 from 'images/dining5.jpeg';
import transport1 from 'images/transport1.jpg';
import transport2 from 'images/transport2.jpg';
import transport3 from 'images/transport3.jpeg';
import transport4 from 'images/transport4.jpeg';
import transport5 from 'images/transport5.jpeg';
import { commaFormat } from 'helpers/utils';
import styles from './GridItem.module.scss';

export default function GridItem({ className, data, type, currency }) {
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
      case 'dining':
        imagesArr = [dining1, dining2, dining3, dining4, dining5];
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
    <div className={cx(styles.root, className)}>
      <div className={styles.banner}>
        {data?.image && <img src={getRandomImageUrl(data?.image, data?.type)} alt="other hotel item" />}
        {!data?.image && <Empty description="No Image" image={Empty.PRESENTED_IMAGE_SIMPLE} />}
      </div>
      <div className={styles.content}>
        {data?.icon && <span className={styles.icon}>{data?.icon}</span>}
        <span className={styles.name}>{getName(data?.name, data?.type)}</span>
        {data?.type !== 'tours' && <Rating scoreonly outlined score={data.rating || 0} className={styles.row} />}
        {data?.type !== 'tours' && (
          <span className={styles.description}>{data.description || 'No description provided'}</span>
        )}
        {data?.type === 'tours' && (
          <>
            <span className={styles.tourStyle}>{data.style}</span>
            <div className={styles.description} dangerouslySetInnerHTML={{ __html: data.description }} />
          </>
        )}
        <div className={styles.row}>
          {data?.rate && data?.type !== 'gas' && data?.type !== 'tours' && (
            <FormattedMessage id="from" defaultMessage="FROM" />
          )}
          {data?.type === 'tours' && <FormattedMessage id="duration" defaultMessage="DURATION" />}
          {data?.type === 'gas' && <span>{data.rate}</span>}
          {data?.type !== 'gas' && data?.type !== 'tours' && (
            <span>{data?.rate ? currency?.symbol + commaFormat(data.rate) : ''}</span>
          )}
          {data?.type === 'tours' && <span>{data.duration}</span>}
        </div>
      </div>
    </div>
  );
}
