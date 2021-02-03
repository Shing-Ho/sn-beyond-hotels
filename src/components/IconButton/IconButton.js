import React from 'react';
import cx from 'classnames';
import styles from './IconButton.module.scss';

const IconButton = ({ Icon, onClick, className }) => (
  <button className={cx(styles.iconButton, className)} onClick={onClick}>
    <Icon />
  </button>
);

export default IconButton;
