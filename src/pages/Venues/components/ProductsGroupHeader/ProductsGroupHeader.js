import React from 'react';
import cx from 'classnames';
import Input from 'components/Input/Input';

import mentorImg from 'images/Icon_SupMan_Onboard_Arrow_Small.png';
import { ReactComponent as TrashIcon } from 'icons/trash.svg';
import { ReactComponent as DragIcon } from 'icons/Icon_SupMan_Drag.svg';
import styles from './ProductsGroupHeader.module.scss';

export default function ProductsGroupHeader({
  placeholder = 'Add a product group name for this first group...',
  trash = false,
  equal = false,
  propsValue = '',
  onboarding,
}) {
  return (
    <div className={styles.openedHeader} onClick={(event) => event.stopPropagation()}>
      <div
        className={cx(styles.input, {
          [styles.onboarding]: onboarding,
        })}
      >
        <div className={styles.mentoring}>
          <p>Add similar products to Product Groups</p>
          <img src={mentorImg} alt="Arrow for mentoring" />
        </div>
        <Input placeholder={placeholder} propsValue={propsValue} maxLength={30} />
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
