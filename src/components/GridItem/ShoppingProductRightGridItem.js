import React from 'react';
import cx from 'classnames';
import { FormattedMessage } from 'react-intl';
import { getRandomImageUrl } from 'helpers/utils';
import Button from 'components/Button/Button';
import { ReactComponent as ShoppingIcon } from 'icons/dashboardIcons/Icon_Category_Shopping.svg';
import snIcon from '../../icons/Icon_Global_Logo_SN_Icon.svg';
import styles from './GridItem.module.scss';

export default function ShoppingProductRightGridItem({ className, data = {} }) {
  return (
    <div className={cx(styles.root, className)}>
      <div className={styles.banner}>
        <img src={data.product.productImage || getRandomImageUrl()} alt="other shpping item" />
      </div>
      <div className={styles.content}>
        {/* {data.icon && ( */}
        <span className={styles.icon}>
          <div className={styles.bagIconImg}>
            <ShoppingIcon />
          </div>
        </span>
        {/* )} */}
        <span className={styles.textAlign}>{data.product.productName}</span>
        <br />
        <div>
          <span>
            <img className={styles.targetIcon} src={snIcon} alt="" />
          </span>
          <span className={styles.textSize}>{data.product.rating}/5 </span>
          <FormattedMessage id="rating" defaultMessage="User Rating" />
        </div>
        <br />
        <Button variant="btn btn-success">View Store Page</Button>
      </div>
    </div>
  );
}
