import React from 'react';
import cx from 'classnames';
import { getRandomImageUrl } from 'helpers/utils';
import Rating from 'components/Rating/Rating';
import styles from './ListTileItem.module.scss';

export default function ListTileItem({ className, data, currency }) {
  return (
    <div className={cx(styles.root, className)}>
      <div className={styles.banner}>
        <img src={data.image || getRandomImageUrl()} alt='other hotel item' />
      </div>
      <div className={styles.content}>
        {data.icon && <span className={styles.icon}>{data.icon}</span>}
        {data.name || 'Four Seasons'}
        <Rating
          scoreonly
          outlined
          score={data.rating || Math.round(Math.random() * 5)}
          className={styles.row}
        />
        <span className={styles.description}>
          {data.description ||
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec orci enim, luctus vel nisl Bibendum.'}
        </span>
        <div className={styles.row}>
          FROM
          <span>{currency?.symbol}{data.rate || 19.99}</span>
        </div>
      </div>
    </div>
  );
}
