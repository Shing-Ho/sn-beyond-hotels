import React from 'react';

import { ReactComponent as TrashIcon } from 'icons/trash.svg';
import { ReactComponent as DragIcon } from 'icons/Icon_SupMan_Drag.svg';
import styles from './ProductsGroupCollapsedHeader.module.scss';

export default function ProductsGroupCollapsedHeader({
  title = 'Hightlights',
  amount = 0,
  trash = false,
  equal = false,
}) {
  return (
    <div className={styles.collapsedHeader}>
      <div className={styles.title}>{title}</div>
      <div className={styles.amount}>
        <div className={styles.val}>{amount}</div>
      </div>
      <div className={styles.actions}>
        {trash && (
          <div className={styles.item}>
            <TrashIcon width={14} />
          </div>
        )}
        {equal && (
          <div className={styles.item}>
            <DragIcon width={20} />
          </div>
        )}
      </div>
    </div>
  );
}
