import React, { useState, useEffect } from 'react';
import { Collapse } from 'antd';
import { ReactComponent as ArrowIcon } from 'icons/arrow-down-small.svg';
import styles from './ProductsGroupCollapse.module.scss';

const { Panel } = Collapse;

const ProductsGroupCollapse = ({ children, header, collapsed = 'open', onboarding }) => {
  const [activeKey, setActiveKey] = useState(collapsed === 'open' ? 'default' : '');

  useEffect(() => {
    setActiveKey(onboarding || collapsed === 'open' ? 'default' : '');
  }, [onboarding]);

  const handleChange = (key) => {
    const collapse = key[0] === 'default' ? 'open' : 'close';
    setActiveKey(collapse === 'open' ? 'default' : '');
  };
  return (
    <Collapse
      className={styles.root}
      defaultActiveKey={collapsed === 'open' ? 'default' : ''}
      activeKey={activeKey}
      expandIcon={() => (
        <span>
          <ArrowIcon width={18} height={18} />
        </span>
      )}
      onChange={(key) => handleChange(key)}
    >
      <Panel header={header} key="default">
        {children}
      </Panel>
    </Collapse>
  );
};

export default ProductsGroupCollapse;
