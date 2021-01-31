import React from 'react';
import cx from 'classnames';
import { FormattedMessage } from 'react-intl';
import { getRandomImageUrl } from 'helpers/utils';
import { ReactComponent as ShoppingIcon } from 'icons/dashboardIcons/Icon_Category_Shopping.svg';
import { ReactComponent as SNIcon } from 'icons/Icon_Global_Logo_SN_Icon.svg';
import styles from './ShoppingGridItems.module.scss';

export default function ShoppingProductGridItem({ className, data = {} }) {
  return (
    <div className={cx(styles.root, className)}>
      <div className={styles.banner}>
        <img src={data.product.productImage || getRandomImageUrl()} alt="other shpping item" />
      </div>
      <div className={styles.content}>
        {data.icon && (
          <span className={styles.icon}>
            <div className={styles.bagIconImg}>
              <ShoppingIcon />
            </div>
          </span>
        )}
        <span className={styles.productname}>{data.product.productName}</span>
        <div className={styles.ratingInfo}>
          <span className={styles.snicon}>
            <SNIcon />
          </span>
          <span className={styles.rating}>{data.product.rating}/5 </span>
          <FormattedMessage id="rating" defaultMessage="User Rating" />
        </div>
        <div>
          <FormattedMessage id="rating" defaultMessage="FROM" />
          <span className={styles.textSize}> ${data.product.price} </span>
        </div>
      </div>
    </div>
  );
}
