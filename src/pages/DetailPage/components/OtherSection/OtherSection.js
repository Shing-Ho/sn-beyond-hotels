import React from 'react';
import cx from 'classnames';
import { Row, Col } from 'antd';
import GridItem from 'components/GridItem/GridItem';
import { ReactComponent as BedIcon, ReactComponent as BalloonIcon } from 'icons/bed3.svg';

import DetailHeader from '../DetailHeader/DetailHeader';
import styles from './OtherSection.module.scss';

export default function OtherSection({ className, type = 'HOTEL', currency, icon = <BalloonIcon /> }) {
  return (
    <div className={cx(styles.root, className)}>
      <DetailHeader
        headerOnly
        className={styles.detailHeader}
        details={{
          name: 'Others You May Like',
        }}
        icon={type === 'HOTEL' ? <BedIcon /> : icon}
      />
      <Row className={styles.content} gutter={5}>
        <Col md={8} sm={24} flex={1}>
          <GridItem currency={currency} data={{ icon }} />
        </Col>
        <Col md={8} sm={24} flex={1}>
          <GridItem currency={currency} data={{ icon }} />
        </Col>
        <Col md={8} sm={24} flex={1}>
          <GridItem currency={currency} data={{ icon }} />
        </Col>
      </Row>
    </div>
  );
}
