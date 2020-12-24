import React from 'react';

export default function TabSelect({ options, onChange }) {
  return (
    <div className={styles.root}>
      {options.map((option) => (
        <div
          className={cx(styles.tab, {
            [styles.active]: tab === option.value,
          })}
          onClick={() => onChange(option.value)}
        >
          <span className={styles.label}>{option.label}</span>
          {option.icon && <span className={styles.icon}>{option.icon}</span>}
        </div>
      ))}
    </div>
  );
}
