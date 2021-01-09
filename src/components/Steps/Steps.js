import React from 'react';
import { Steps as DefaultSteps } from 'antd';
import cx from 'classnames';
// import { ReactComponent as CheckIcon } from 'icons/check-fill.svg';
import styles from './Steps.module.scss';

const { Step: DefaultStep } = DefaultSteps;

const Steps = ({ className, children, ...others }) => (
  <DefaultSteps className={cx(styles.root, styles.venues, className)} {...others}>
    {children}
  </DefaultSteps>
);

const Step = ({ className, icon = null, ...others }) => (
  <DefaultStep className={cx(styles.step, className)} icon={icon} {...others} />
);

export { Steps, Step };
