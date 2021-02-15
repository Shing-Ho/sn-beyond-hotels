import React, { useState } from 'react';
import { Input } from 'antd';
import styles from './Input.module.scss';

export default function CustomInput({
  placeholder = 'Add...',
  name,
  propsValue,
  prefix,
  suffix,
  maxLength,
  type = 'text',
  isTrigger = false,
  onChange,
  ...props
}) {
  const [value, setValue] = useState(propsValue);
  const [currentLength, setCurrentLength] = useState(propsValue ? propsValue.length : 0);

  const handleChange = (e) => {
    const val = e.target.value;
    setValue(val);
    setCurrentLength(val.length);

    if (isTrigger) {
      onChange(val);
    }
  };

  return (
    <Input
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={handleChange}
      maxLength={maxLength}
      prefix={prefix}
      suffix={suffix || <div className={styles.suffix}>{maxLength ? `${currentLength}/${maxLength}` : ''}</div>}
      {...props}
    />
  );
}
