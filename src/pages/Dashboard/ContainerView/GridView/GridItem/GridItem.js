import React from 'react';
import { Empty } from 'antd';
import cx from 'classnames';
import { FormattedMessage } from 'react-intl';
import Rating from 'components/Rating/Rating';
import styles from './GridItem.module.scss';

export default function GridItem({ className, data, type }) {
  const getName = (dataName) => {
    let name;
    switch (type) {
      case 'tours':
        name = 'ATV Riding Tours';
        break;
      default:
        name = dataName;
        break;
    }
    return name;
  };
  return (
    <div className={cx(styles.root, className)}>
      <div className={styles.banner}>
        {data?.image && <img src={data?.image} alt="other hotel item" />}
        {!data?.image && <Empty description="No Image" image={Empty.PRESENTED_IMAGE_SIMPLE} />}
      </div>
      <div className={styles.content}>
        {data?.icon && <span className={styles.icon}>{data?.icon}</span>}
        <span className={styles.name}>{getName(data?.name)}</span>
        <Rating scoreonly outlined score={data.rating || 0} className={styles.row} />
        <span className={styles.description}>{data?.description || 'No description provided'}</span>
        <div className={styles.row}>
          {data?.rate && <FormattedMessage id="from" defaultMessage="FROM" />}
          <span>
            {/* {currency?.symbol} */}
            {data?.rate}
          </span>
        </div>
      </div>
    </div>
  );
}
