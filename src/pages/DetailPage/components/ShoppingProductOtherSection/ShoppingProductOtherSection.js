import React from 'react';
import cx from 'classnames';
import { Row, Col } from 'antd';
import { ReactComponent as ShoppingIcon } from 'icons/dashboardIcons/Icon_Category_Shopping.svg';
import ShoppingProductGridItem from 'components/GridItem/ShoppingProductGridItem';
import { ReactComponent as BalloonIcon } from 'icons/bed3.svg';
import products from '../../../ShoppingPage/ProductJson/product.json';
import DetailHeader from '../DetailHeader/DetailHeader';
import styles from './ShoppingProductOtherSection.module.scss';

export default function ShoppingProductOtherSection({ className, type = 'HOTEL', currency, icon = <BalloonIcon /> }) {
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
          <ShoppingProductGridItem currency={currency} data={{ icon, product: products[0] }} />
        </Col>
        <Col md={8} sm={24} flex={1}>
          <ShoppingProductGridItem currency={currency} data={{ icon, product: products[4] }} />
        </Col>
        <Col md={8} sm={24} flex={1}>
          <ShoppingProductGridItem currency={currency} data={{ icon, product: products[2] }} />
        </Col>
      </Row>
    </div>
  );
}
