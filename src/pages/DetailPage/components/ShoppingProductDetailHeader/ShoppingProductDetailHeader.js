import React from 'react';
import cx from 'classnames';
import { Row, Col } from 'antd';
import { ReactComponent as ShoppingIcon } from 'icons/dashboardIcons/Icon_Category_Shopping.svg';
import { ReactComponent as HeartWhiteIcon } from 'icons/heartWhite.svg';
import { ReactComponent as ShareWhiteIcon } from 'icons/shareWhite.svg';
import { ReactComponent as SpecialDietVeganIcon } from 'icons/Icon_Special_Diet_Vegan.svg';
import Tag from 'components/Tag/Tag';
import styles from './ShoppingProductDetailHeader.module.scss';

const ShoppingProductDetailHeader = ({ details }) => (
  <div className={cx(styles.root)}>
    <div className={styles.content}>
      <Row justify="center">
        <Col md={16} sm={24} flex={1}>
          <div className={styles.title}>
            <div className={styles.bedIcon}>
              <ShoppingIcon />
            </div>
            {details?.name}
          </div>
          <div className={styles.tags}>
            <div className={styles.left}>
              <Tag text="Tag" />
              <Tag text="Longer Tag" />
              <Tag text="Tag" />
              <Tag text="Longer Tag" />
            </div>
            <div className={styles.right}>
              <span className={styles.veganicon}>
                <Tag text="Vegan" color="#528800" icon={<SpecialDietVeganIcon color="#ffffffff" />} />
              </span>
              <Tag color="#7b7c7e" icon={<HeartWhiteIcon />} />
              <Tag color="#7b7c7e" icon={<ShareWhiteIcon />} />
            </div>
          </div>
        </Col>
        <Col md={8} sm={24} flex={1} />
      </Row>
    </div>
  </div>
);

export default ShoppingProductDetailHeader;
