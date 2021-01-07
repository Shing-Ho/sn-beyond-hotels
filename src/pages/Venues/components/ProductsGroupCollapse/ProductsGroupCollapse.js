import React, { useState } from 'react';
import { Collapse } from 'antd';
import { ReactComponent as ArrowIcon } from 'icons/arrow-down-small.svg';
import styles from './ProductsGroupCollapse.module.scss';

const { Panel } = Collapse;

const ProductsGroupCollapse = ({ children, header, collapsedHeader, collapsed = 'open' }) => {
  const [mode, setMode] = useState(collapsed);
  const handleChange = (key) => {
    const collapse = key[0] === 'default' ? 'open' : 'close';
    setMode(collapse);
  };
  return (
    <Collapse
      className={styles.root}
      defaultActiveKey={collapsed === 'open' ? 'default' : ''}
      expandIcon={() => (
        <span>
          <ArrowIcon width={18} height={18} />
        </span>
      )}
      onChange={(key) => handleChange(key)}
    >
      <Panel header={mode === 'open' ? header : collapsedHeader} key="default">
        {children}
      </Panel>
    </Collapse>
  );
};

export default ProductsGroupCollapse;
