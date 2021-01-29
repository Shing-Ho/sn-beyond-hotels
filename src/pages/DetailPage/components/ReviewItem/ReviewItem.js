import React from 'react';

import avatar from 'icons/avatar.png';
import Rating from 'components/Rating/Rating';
import styles from './ReviewItem.module.scss';

export default function ReviewItem({ score }) {
  return (
    <div className={styles.main}>
      <div className={styles.top}>
        <div className={styles.row}>
          <img src={avatar} alt="avatar" />
          <div>
            <span className={styles.name}>Firstname L.</span>
            <Rating total={10} heart size={18} score={score} />
          </div>
        </div>
        <div className={styles.date}>00/00/2021</div>
      </div>
      <div className={styles.description}>
        loream ipsum dolar sit amet, consectetur adipiscing eit. Nam gravida vehicula velit, quis sagittis dui. loream
        ipsum dolar sit amet, consectetur adipiscing eit. Nam gravida vehicula velit, quis sagittis dui. loream ipsum
        dolar sit amet, consectetur adipiscing eit. Nam gravida vehicula velit, quis sagittis dui.
      </div>
    </div>
  );
}
