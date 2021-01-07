import React from 'react';
import cx from 'classnames';
import styles from './ShoppingView.module.scss';

export default function ShoppingView({ setItemView, itemView }) {
  return (
    <div className={styles.content}>
      <div className={styles.layout}>
        <span
          className={
            itemView === 'list' ? cx('fa fa-bars', styles.icon, styles.selectedIcon) : cx('fa fa-bars', styles.icon)
          }
          onClick={() => setItemView('list')}
        />
        <span
          className={
            itemView === 'location'
              ? cx('fa fa-map-marker', styles.icon, styles.selectedIcon)
              : cx('fa fa-map-marker', styles.icon)
          }
          onClick={() => setItemView('location')}
        />
      </div>
    </div>
  );
}
