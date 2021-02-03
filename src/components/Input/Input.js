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
  ...props
}) {
  const [value, setValue] = useState(propsValue);
  const [currentLength, setCurrentLength] = useState(propsValue ? propsValue.length : 0);

  const handleChange = (val) => {
    setValue(val);
    setCurrentLength(val.length);
  };

  return (
    <Input
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={(e) => handleChange(e.target.value)}
      maxLength={maxLength}
      prefix={prefix}
      suffix={suffix || <div className={styles.suffix}>{maxLength ? `${currentLength}/${maxLength}` : ''}</div>}
      {...props}
    />
  );
}
