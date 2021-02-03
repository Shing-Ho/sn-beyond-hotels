import React from 'react';
import cx from 'classnames';
import { Row, Col } from 'antd';
import { ReactComponent as CleanIcon } from 'icons/cleaner.svg';
import { ReactComponent as ShoppingIcon } from 'icons/dashboardIcons/Icon_Category_Shopping.svg';
import { ReactComponent as UserGroupIcon } from 'icons/user-group.svg';
import { ReactComponent as HeartWhiteIcon } from 'icons/heartWhite.svg';
import { ReactComponent as ShareWhiteIcon } from 'icons/shareWhite.svg';
import Tag from 'components/Tag/Tag';
import styles from './ShoppingDetailHeader.module.scss';

const DetailHeader = ({ className, details }) => (
  <div className={cx(styles.root, className)}>
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
              <Tag text="Longer Tag" />
              <Tag text="+2" />
            </div>
            <div className={styles.right}>
              <Tag text="Very Clean" color="#00d6a3" icon={<CleanIcon />} />
              <Tag text="Crowded" color="#b94b19" icon={<UserGroupIcon />} />
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

export default DetailHeader;
