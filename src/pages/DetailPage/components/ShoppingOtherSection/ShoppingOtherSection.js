import React from 'react';
import cx from 'classnames';
import { Row, Col } from 'antd';
import { ReactComponent as ShoppingIcon } from 'icons/dashboardIcons/Icon_Category_Shopping.svg';
import ShoppingGridItem from 'components/GridItem/ShoppingGridItem';
import { ReactComponent as BalloonIcon } from 'icons/bed3.svg';
import stores from '../../../ShoppingPage/ProductJson/store.json';
import DetailHeader from '../DetailHeader/DetailHeader';
import styles from './ShoppingOtherSection.module.scss';

export default function ShoppingOtherSection({ className, type = 'HOTEL', currency, icon = <BalloonIcon /> }) {
  return (
    <div className={cx(styles.root, className)}>
      <DetailHeader
        headerOnly
        className={styles.detailHeader}
        details={{
          name: 'Others You May Like',
        }}
        icon={type === 'HOTEL' ? <ShoppingIcon /> : icon}
      />
      <Row className={styles.content} gutter={5}>
        <Col md={8} sm={24} flex={1}>
          <ShoppingGridItem currency={currency} data={{ icon, store: stores[1] }} />
        </Col>
        <Col md={8} sm={24} flex={1}>
          <ShoppingGridItem currency={currency} data={{ icon, store: stores[5] }} />
        </Col>
        <Col md={8} sm={24} flex={1}>
          <ShoppingGridItem currency={currency} data={{ icon, store: stores[0] }} />
        </Col>
      </Row>
    </div>
  );
}
