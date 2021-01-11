import React, { useState, useEffect } from 'react';
import { Input, Button } from 'antd';
import cx from 'classnames';
import { ReactComponent as PlusIcon } from 'icons/plus.svg';
import { ReactComponent as MinusIcon } from 'icons/minus.svg';
import styles from './NumberInput.module.scss';

const NumberInput = ({
  defaultValue = 1,
  maxValue = 0,
  className,
  name,
  onChange,
  rightComponent,
  leftComponent,
  propsValue,
}) => {
  const [value, setValue] = useState(defaultValue);
  const [minus, setMinus] = useState(propsValue <= 0);
  const [plus, setPlus] = useState(maxValue === 0 ? false : propsValue >= maxValue);

  useEffect(() => {
    setValue(propsValue);
  }, [propsValue]);

  const handleClick = (amount) => (e) => {
    e.stopPropagation();

    const newValue = value + amount;

    setMinus(newValue <= 0);

    setPlus(maxValue === 0 ? false : newValue >= maxValue);
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <Input.Group compact className={cx(styles.root, className, { [styles.minus]: minus, [styles.plus]: plus })}>
      <Button onClick={handleClick(-1)} className={styles.leftButton} disabled={minus}>
        {leftComponent || <MinusIcon width={28} height={28} />}
      </Button>
      <Input name={name} value={value} />
      <Button onClick={handleClick(1)} className={styles.rightButton} disabled={plus}>
        {rightComponent || <PlusIcon width={28} height={28} />}
      </Button>
    </Input.Group>
  );
};

export default NumberInput;
