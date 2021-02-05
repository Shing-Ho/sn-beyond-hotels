import React from 'react';
import cx from 'classnames';
import { get } from 'lodash';
import { ReactComponent as BedIcon } from 'icons/bed3.svg';
import { ReactComponent as CleanIcon } from 'icons/cleaner.svg';
import { ReactComponent as UserGroupIcon } from 'icons/user-group.svg';
import { ReactComponent as HeartWhiteIcon } from 'icons/heartWhite.svg';
import { ReactComponent as ShareWhiteIcon } from 'icons/shareWhite.svg';
import Tag from 'components/Tag/Tag';
import Rating from 'components/Rating/Rating';
import styles from './DetailHeader.module.scss';

const DetailHeader = ({ className, details, icon, headerOnly, isRating, isFoodDetail }) => {
  const getTags = () => {
    if (isFoodDetail) {
      return ['Dinner', 'Lunch', 'Specials', 'American'];
    }
    if (details?.tags) {
      return details?.tags;
    }
    return ['Tag', 'Longer Tag', 'Tag', 'Longer Tag'];
  };

  const getRateText = (rate) => {
    if (rate < 3) {
      return 'Row';
    }
    if (rate < 5) {
      return 'Medium';
    }
    return 'High';
  };

  return (
    <div
      className={cx(styles.root, className, {
        [styles.headerOnly]: headerOnly,
      })}
    >
      <div className={styles.title}>
        <div className={styles.bedIcon}>{icon || <BedIcon />}</div>
        {details?.name}
      </div>
      {!headerOnly && (
        <>
          <div className={styles.details}>
            {isRating && <Rating scoreonly score={details?.star_rating || details?.rating} className={styles.rating} />}
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
              {getTags().map((tag) => (
                <Tag text={tag} key={tag} />
              ))}
            </div>
            <div className={styles.right}>
              {details.startTime && <Tag text={`Start: ${details.startTime}`} color="#00d6a3" />}
              {details.duration && <Tag text={details.duration} color="#00d6a3" />}
              {details.cultureShock && (
                <Tag
                  text={`Culture shock: ${getRateText(details.cultureShock)}`}
                  color="#b94b19"
                  icon={<HeartWhiteIcon />}
                />
              )}
              {details.cultureShock && (
                <Tag
                  text={`Physicality: ${getRateText(details.physicality)}`}
                  color="#b94b19"
                  icon={<HeartWhiteIcon />}
                />
              )}
              {details.type !== 'tours' && <Tag text="Very Clean" color="#00d6a3" icon={<CleanIcon />} />}
              {details.type !== 'tours' && <Tag text="Crowded" color="#b94b19" icon={<UserGroupIcon />} />}
              {details.type !== 'tours' && <Tag color="#7b7c7e" icon={<HeartWhiteIcon />} />}
              {details.type !== 'tours' && <Tag color="#7b7c7e" icon={<ShareWhiteIcon />} />}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DetailHeader;
