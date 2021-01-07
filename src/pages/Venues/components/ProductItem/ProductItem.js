import React from 'react';
import { Button } from 'antd';

import { ReactComponent as PhotoIcon } from 'icons/Icon_SupMan_Photos.svg';
import styles from './ProductItem.module.scss';

export default function ProductItem() {
  return (
    <div className={styles.productItem}>
      <div className={styles.image}>
        {/* <img src={} alt="Product Item" /> */}
        <div className={styles.icon}>
          <PhotoIcon width={24} />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.initContent}>
          <h3 className={styles.title}>Add Products</h3>
          <p className={styles.description}>Add Products to your venue to show what you offer.</p>
          <Button className={styles.btn}>
            <i className="fa fa-plus" aria-hidden="true" /> Add Product
          </Button>
        </div>
      </div>
    </div>
  );
}
