import React from 'react';
import { Collapse } from 'antd';
import cx from 'classnames';
import { ReactComponent as ArrowIcon } from 'icons/arrow-down-small.svg';
import styles from './Collapse.module.scss';

const { Panel } = Collapse;

const CustomCollapse = ({ children, className, header, invert, type = 'normal', activeKey = 'default' }) => {
  const size = type === 'large' || type === 'detail' ? 18 : 14;
  return (
    <Collapse
      className={cx(styles.root, className, {
        large: type === 'large',
        detail: type === 'detail',
        invert,
      })}
      defaultActiveKey={[activeKey]}
      expandIcon={() => (
        <span>
          <ArrowIcon width={size} height={size} className={styles.arrow} />
        </span>
      )}
    >
      <Panel header={header} key="default">
        {children}
      </Panel>
    </Collapse>
  );
};

export default CustomCollapse;
