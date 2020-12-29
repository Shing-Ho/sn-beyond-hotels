import React, { useState, useEffect } from 'react';
import { Input, Button } from 'antd';
import cx from 'classnames';
import { ReactComponent as PlusIcon } from 'icons/plus.svg';
import { ReactComponent as MinusIcon } from 'icons/minus.svg';
import styles from './NumberInput.module.scss';

const NumberInput = ({
  defaultValue = 1,
  className,
  name,
  // onChange,
  rightComponent,
  leftComponent,
  propsValue,
}) => {
  const [value, setValue] = useState(defaultValue);
  const [minus, setMinus] = useState(false);

  useEffect(() => {
    setValue(propsValue);
  }, [propsValue]);

  const handleClick = (amount) => (e) => {
    e.stopPropagation();

    const newValue = value + amount;
    if (newValue <= 0) {
      setMinus(true);
      // return;
    } else {
      setMinus(false);
    }

    setValue(newValue);

    // onChange(name)(newValue);
  };

  return (
    <Input.Group compact className={cx(styles.root, className, { [styles.minus]: minus })}>
      <Button onClick={handleClick(-1)} className={styles.leftButton} disabled={minus}>
        {leftComponent || <MinusIcon width={28} height={28} />}
      </Button>
      <Input name={name} value={value} />
      <Button onClick={handleClick(1)} className={styles.rightButton}>
        {rightComponent || <PlusIcon width={28} height={28} />}
      </Button>
    </Input.Group>
  );
};

export default NumberInput;
