import React, { useState } from 'react';
import cx from 'classnames';
import styles from './TabSelect.module.scss';

export default function TabSelect({ options, onChange }) {
  const [tab, setTab] = useState(options[0].value);

  const handleChange = (value) => {
    setTab(value);
    onChange(value);
  };

  return (
    <div className={styles.root}>
      {options.map((option) => (
        <div
          className={cx(styles.tab, {
            [styles.active]: tab === option.value,
          })}
          onClick={() => handleChange(option.value)}
        >
          <span className={styles.label}>{option.label}</span>
          {option.icon && <span className={styles.icon}>{option.icon}</span>}
        </div>
      ))}
    </div>
  );
}
