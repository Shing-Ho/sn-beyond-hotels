import React from 'react';
import cx from 'classnames';
import { get } from 'lodash';
// import { ReactComponent as BedIcon } from 'icons/bed3.svg';
import { ReactComponent as CleanIcon } from 'icons/cleaner.svg';
import { ReactComponent as ShoppingIcon } from 'icons/dashboardIcons/Icon_Category_Shopping.svg';
import { ReactComponent as UserGroupIcon } from 'icons/user-group.svg';
import { ReactComponent as HeartWhiteIcon } from 'icons/heartWhite.svg';
import { ReactComponent as ShareWhiteIcon } from 'icons/shareWhite.svg';
import Tag from 'components/Tag/Tag';
import Rating from 'components/Rating/Rating';
import styles from './ShoppingDetailHeader.module.scss';

const DetailHeader = ({ className, details, icon, headerOnly, isRating }) => (
  <div
    className={cx(styles.root, className, {
      [styles.headerOnly]: headerOnly,
    })}
  >
    <div className={styles.title}>
      <div className={styles.bedIcon}>{icon || <ShoppingIcon />}</div>
      {details?.name}
    </div>
    {!headerOnly && (
      <>
        <div className={styles.details}>
          {isRating && <Rating scoreonly score={details?.star_rating} className={styles.rating} />}
          {details?.address && (
            <>
              <p>{get(details, 'address.address1')}</p>
              <p>
                {get(details, 'address.city')}
                {details?.address?.province ? `, ${details.address.province}` : ''}, {get(details, 'address.country')}
              </p>
              <p>{get(details, 'address.postal_code')}</p>
            </>
          )}
        </div>
        <div className={styles.tags}>
          <div className={styles.left}>
            <Tag text="Tag" />
            <Tag text="Longer Tag" />
            <Tag text="Longer Tag" />
            <Tag text="+2" />
          </div>
          <div className={styles.right}>
            <Tag text="Very Clean" color="#00d6a3" icon={<CleanIcon />} />
            <Tag text="Crowded" color="#b94b19" icon={<UserGroupIcon />} />
            <Tag color="#7b7c7e" icon={<HeartWhiteIcon />} />
            <Tag color="#7b7c7e" icon={<ShareWhiteIcon />} />
          </div>
        </div>
      </>
    )}
  </div>
);

export default DetailHeader;