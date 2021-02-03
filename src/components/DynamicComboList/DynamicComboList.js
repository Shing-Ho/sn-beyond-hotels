import React from 'react';

import Button from '../Button/Button';
import { Checkbox } from '../CheckboxGroup/CheckboxGroup';
import styles from './DynamicComboList.module.scss';

const DynamicComboList = ({ list }) => (
  <div>
    {list.map((item) => (
      <div className={styles.wrapper} key={item.name}>
        <Checkbox
          // checked={nonStopFlight}
          // onChange={(e) => {
          //   e.preventDefault();
          //   setNonStopFlight(!nonStopFlight);
          // }}
          className={styles.combo}
        >
          <span className={styles.text}>{item.name}</span>
        </Checkbox>
      </div>
    ))}
    <Button className={styles.addCustom}>
      <i className="fa fa-plus" aria-hidden="true" />
      Add Custom
    </Button>
  </div>
);

export default DynamicComboList;
