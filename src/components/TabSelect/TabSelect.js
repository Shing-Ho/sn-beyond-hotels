import React, { useState } from 'react';
import cx from 'classnames';
import styles from './TabSelect.module.scss';

export default function TabSelect({ options, thin, stretch, uppercase, onChange }) {
  const [tab, setTab] = useState(options[0].value);

  const handleChange = (value) => {
    setTab(value);
    onChange(value);
  };

  return (
    <div
      className={cx(styles.root, {
        [styles.thin]: thin,
      })}
    >
      {options.map((option) => (
        <div
          className={cx(styles.tab, {
            [styles.active]: tab === option.value,
            [styles.stretch]: stretch,
            [styles.thin]: thin,
          })}
          onClick={() => handleChange(option.value)}
        >
          <span
            className={cx(styles.label, {
              [styles.uppercase]: uppercase,
            })}
          >
            {option.label}
          </span>
          {option.icon && <span className={styles.icon}>{option.icon}</span>}
        </div>
      ))}
    </div>
  );
}
