import React from 'react';
import moment from 'moment';

import styles from './TimeSelect.module.scss';

const TimeSelect = ({ times, activeTime, setActiveTime }) => (
  <div className={styles.row}>
    {times.map((time) => (
      <button
        key={time.getTime()}
        className={[time.getTime() === activeTime.getTime() ? styles.activeItem : styles.item]}
        onClick={() => setActiveTime(time)}
      >
        <span className={styles.text}>{moment(time).format('hh:mm a')}</span>
      </button>
    ))}
  </div>
);
export default TimeSelect;
