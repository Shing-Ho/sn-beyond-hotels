import React from 'react';
import { Tabs as DefaultTabs } from 'antd';
import cx from 'classnames';
import styles from './Tab.module.scss';

const Tabs = ({ size, children, className, ...other }) => (
  <div className={cx(styles.root, className)}>
    <DefaultTabs className={size === 'big' ? styles.bigTab : styles.tabs} {...other}>
      {children}
    </DefaultTabs>
  </div>
);

const { TabPane } = DefaultTabs;

export { Tabs, TabPane };
