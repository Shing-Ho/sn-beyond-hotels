import React from 'react';
import cx from 'classnames';
import { get } from 'lodash';
import { ReactComponent as ShoppingIcon } from 'icons/dashboardIcons/Icon_Category_Shopping.svg';
import { ReactComponent as HeartWhiteIcon } from 'icons/heartWhite.svg';
import { ReactComponent as ShareWhiteIcon } from 'icons/shareWhite.svg';
import { ReactComponent as SpecialDietVeganIcon } from 'icons/Icon_Special_Diet_Vegan.svg';
import Tag from 'components/Tag/Tag';
import Rating from 'components/Rating/Rating';
import styles from './ShoppingProductDetailHeader.module.scss';

const ShoppingProductDetailHeader = ({ className, details, icon, headerOnly, isRating, isFoodDetail }) => (
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
          {isFoodDetail ? (
            <div className={styles.left}>
              <Tag text="Dinner" />
              <Tag text="Lunch" />
              <Tag text="Specials" />
              <Tag text="American" />
            </div>
          ) : (
            <div className={styles.left}>
              <Tag text="Tag" />
              <Tag text="Longer Tag" />
              <Tag text="Tag" />
              <Tag text="Longer Tag" />
            </div>
          )}
          <div className={styles.right}>
            <span className={styles.veganicon}>
              <Tag text="Vegan" color="#528800" icon={<SpecialDietVeganIcon color="#ffffffff" />} />
            </span>
            <Tag color="#7b7c7e" icon={<HeartWhiteIcon />} />
            <Tag color="#7b7c7e" icon={<ShareWhiteIcon />} />
          </div>
        </div>
      </>
    )}
  </div>
);

export default ShoppingProductDetailHeader;
