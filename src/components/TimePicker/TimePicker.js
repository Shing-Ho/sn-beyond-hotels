import React from 'react';
import { TimePicker } from 'antd';
import cx from 'classnames';
import { ReactComponent as TimeIcon } from 'icons/time.svg';
import styles from './TimePicker.module.scss';

const CustomTimePicker = ({ className, variant = 'primary', ...other }) => (
  <TimePicker
    {...other}
    suffixIcon={<TimeIcon width={20} height={20} />}
    className={cx(styles.root, styles[variant])}
    popupClassName={cx(styles.popup, styles[variant])}
    clearIcon={null}
  />
);

export default CustomTimePicker;
