import React from 'react';
import cx from 'classnames';
import { ReactComponent as StarIcon } from 'icons/star.svg';
import { ReactComponent as StarGrayIcon } from 'icons/star_gray.svg';
import { ReactComponent as HeartIcon } from 'icons/heart.svg';
import { ReactComponent as HeartFillIcon } from 'icons/heart_fill.svg';
import { ReactComponent as StarOutlinedIcon } from 'icons/star-outline.svg';
import { ReactComponent as SimplenightIcon } from 'icons/simplenight.svg';
import styles from './Rating.module.scss';

const onStarClick = (score, isCancel, onChange) => () => {
  if (onChange) {
    onChange(isCancel ? 0 : score);
  }
};

const generateStars = (score, total, size, outlined, onChange, heart) => {
  const result = [];
  const Star = heart ? HeartFillIcon : StarIcon;
  let StarGrey = outlined ? StarOutlinedIcon : StarGrayIcon;
  if (heart) StarGrey = HeartIcon;
  for (let i = 0; i < total; i += 1) {
    if (score >= i + 1) {
      result.push(
        <Star
          key={`star_${i}`}
          width={size}
          height={size}
          className={heart ? styles.heart : styles.star}
          onClick={onStarClick(i + 1, score === i + 1, onChange)}
        />,
      );
    } else {
      result.push(
        <StarGrey
          key={`star_grey_${i}`}
          width={size}
          height={size}
          className={heart ? styles.heart : styles.star}
          onClick={onStarClick(i + 1, score === i + 1, onChange)}
        />,
      );
    }
  }
  return result;
};

const Rating = ({ scoreonly, heart, outlined, total = 5, score, size = 24, className, onChange }) => (
  <div
    className={cx(styles.rating, className, {
      [styles.disabled]: !onChange,
    })}
  >
    {generateStars(score, total, size, outlined, onChange, heart)}
    {!scoreonly && (
      <>
        {!heart ? <span className={styles.count}>{(Math.random() * 100).toFixed()}</span> : null}

        <div className={styles.simplenightIcon}>
          <SimplenightIcon />
        </div>
        <div className={styles.textRating}>
          <span className={styles.ratingValue}>{score}</span> / {total}
        </div>
        <span>User Rating</span>
      </>
    )}
  </div>
);

export default Rating;
