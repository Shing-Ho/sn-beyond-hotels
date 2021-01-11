import React from 'react';
import Button from 'components/Button/Button';
import cx from 'classnames';
import { FormattedMessage } from 'react-intl';
import Products from '../ProductJson/home.json';
import styles from './ShoppingHomePage.module.scss';

export default function ShoppingHome() {
  const productList = Products.map((item) => (
    <div className={cx(styles.resultContainer)}>
      <div className={styles.resultItem}>
        <div className={styles.mainImage}>
          <img src={item.productImage} alt="Result Item" />
        </div>
        <div className={styles.right}>
          <div className={styles.circle}>
            <img className={styles.iconImg} src="https://i.ibb.co/4S96N9R/Bag.png" alt="" />
          </div>
          <div className={styles.content}>
            <div className={styles.line}>
              <h3 className={styles.itemName}>{item.productName}</h3>
              <div className={styles.rateInfo}>
                <div className="flex-vertical-center">
                  <span>
                    <FormattedMessage id="from" defaultMessage="FROM" />
                  </span>
                  <span className={styles.itemRate}>{item.price}</span>
                </div>
                <div className={`${styles.taxesAndFees} flex-vertical-center`}>
                  <span>
                    <img className={styles.iconImage} src="https://i.ibb.co/XDhwtHR/Rating.png" alt="" />
                  </span>
                  <span className={styles.itemRate}>{item.rating}</span>
                  <span>
                    <FormattedMessage id="userRating" defaultMessage="Rating" />
                  </span>
                </div>
                <div className={`${styles.taxesAndFees} flex-vertical-center`}>
                  <span className={styles.itemRate}>
                    Target
                    <img className={styles.iconImage} src="https://i.ibb.co/qYHRLBn/Car-Service-copy.png" alt="" />
                    <img className={styles.iconImage} src="https://i.ibb.co/jZ0VVyB/shop.png" alt="" />
                  </span>
                </div>
              </div>
              <div>
                <span />
              </div>
            </div>
            <div className={`${styles.line} ${styles.baseline}`}>
              <span className={styles.description}>{item.productDetail}</span>
              <div className={styles.actions}>
                <Button id="view">View </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));
  return <div className={styles.root}>{productList}</div>;
}
