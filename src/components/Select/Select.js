import React from 'react';
import { Select } from 'antd';
import cx from 'classnames';
import Tag from 'components/Tag/Tag';
import { ReactComponent as ArrowIcon } from 'icons/arrow-down-small.svg';
import { ReactComponent as CloseIcon } from 'icons/close-fill.svg';
import styles from './Select.module.scss';

const tagRender = ({ label, onClose }) => (
  <div className={styles.tag}>
    <Tag text={label} style={{ marginRight: 3 }} />
    <CloseIcon onClick={onClose} />
  </div>
);

const CustomSelect = ({ options, value, className, suffix, ...other }) => (
  <div className={cx(styles.root, className)}>
    <Select
      showSearch
      tagRender={tagRender}
      defaultValue={value || (options.length ? options[0].value : '')}
      filterOption={(input, option) =>
        option.children && option.children.toLowerCase().indexOf(input.toLowerCase()) > -1
      }
      {...other}
    >
      {options.map((option) => (
        <Select.Option key={option.value} value={option.value}>
          {option.title}
        </Select.Option>
      ))}
    </Select>
    {suffix && <div className={styles.suffix}>{suffix}</div>}
    {!suffix && <ArrowIcon className={styles.arrowDown} />}
  </div>
);

export default CustomSelect;
