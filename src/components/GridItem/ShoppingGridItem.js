import React from 'react';
import cx from 'classnames';
import { FormattedMessage } from 'react-intl';
import { getRandomImageUrl } from 'helpers/utils';
import { ReactComponent as ShoppingIcon } from 'icons/dashboardIcons/Icon_Category_Shopping.svg';
import snIcon from '../../icons/Icon_Global_Logo_SN_Icon.svg';
import styles from './GridItem.module.scss';

export default function ShoppingGridItem({ className, data = {} }) {
  return (
    <div className={cx(styles.root, className)}>
      <div className={styles.banner}>
        <img src={data.store.image || getRandomImageUrl()} alt="other shpping item" />
      </div>
      <div className={styles.content}>
        {data.icon && (
          <span className={styles.icon}>
            <div className={styles.bagIconImg}>
              <ShoppingIcon />
            </div>
          </span>
        )}
        <span className={styles.textAlign}>{data.store.title}</span>
        <br />
        <div>
          <span>
            <img className={styles.targetIcon} src={snIcon} alt="" />
          </span>
          <span>4/5</span>
          <FormattedMessage id="rating" defaultMessage="User Rating" />
        </div>
        <span className={styles.description}>
          {data.description ||
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec orci enim, luctus vel nisl Bibendum.'}
        </span>
      </div>
    </div>
  );
}
