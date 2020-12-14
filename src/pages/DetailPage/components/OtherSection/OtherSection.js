import React from 'react';
import cx from 'classnames';
import { Row, Col } from 'antd';
import HotelItem from 'components/HotelItem/HotelItem';
import DetailHeader from '../DetailHeader/DetailHeader';
import { ReactComponent as BedIcon } from 'icons/bed3.svg';
import { ReactComponent as BalloonIcon } from 'icons/bed3.svg';
import styles from './OtherSection.module.scss';

export default function OtherSection({ className, type = 'HOTEL', currency }) {
  return (
    <div className={cx(styles.root, className)}>
      <DetailHeader
        headerOnly
        className={styles.detailHeader}
        details={{
          name: 'Others You May Like',
          icon: type === 'HOTEL' ? <BedIcon /> : <BalloonIcon />,
        }}
      />
      <Row className={styles.content} gutter={5}>
        <Col md={8} sm={24} flex={1}>
          <HotelItem currency={currency} />
        </Col>
        <Col md={8} sm={24} flex={1}>
          <HotelItem currency={currency} />
        </Col>
        <Col md={8} sm={24} flex={1}>
          <HotelItem currency={currency} />
        </Col>
      </Row>
    </div>
  );
}
