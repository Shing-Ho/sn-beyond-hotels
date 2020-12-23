import React from 'react';
import { TimePicker } from 'antd';
import { ReactComponent as TimeIcon } from 'icons/time.svg';
import styles from './TimePicker.module.scss';

const CustomTimePicker = ({ className, ...other }) => (
  <TimePicker {...other} suffixIcon={<TimeIcon width={20} height={20} />} className={styles.root} clearIcon={null} />
);

export default CustomTimePicker;
