import React, { useEffect, useState } from 'react';
import { Row, Col, Input } from 'antd';
import { get } from 'lodash';
import countryList from 'country-list';

import FormItem from 'components/FormItem/FormItem';
import Select from 'components/Select/Select';
import { isEmailValid, isNumber } from '../../../../helpers/helperMethods';
import styles from './PrimaryContactForm.module.scss';

export const rules = {
  email: [
    () => ({
      validator(rule, value) {
        if (!value) {
          return Promise.resolve();
        }
        if (!isEmailValid(value)) {
          return Promise.reject(new Error('email is invalid'));
        }
        return Promise.resolve();
      },
    }),
  ],
  phoneNumber: [
    () => ({
      validator(rule, value) {
        if (!value) {
          return Promise.resolve();
        }
        if (!isNumber(value)) {
          return Promise.reject(new Error('Only numbers are allowed'));
        }
        return Promise.resolve();
      },
    }),
  ],
};

export default function PrimaryContactForm({ index, primaryContact, setPrimaryContact }) {
  const [countrySelectList, setCountrySelectList] = useState([]);

  const setValue = (value, key) => {
    const temp = { ...primaryContact };
    temp[key] = value;
    setPrimaryContact(temp);
  };

  useEffect(() => {
    const list = countryList.getNameList();
    const keys = Object.keys(list);
    let tmpList = [];
    tmpList = keys.map((key) => ({ title: key.toUpperCase(), value: list[key] }));
    setCountrySelectList(tmpList.sort((a, b) => (a.title > b.title ? 1 : -1)));
    if (primaryContact) {
      setPrimaryContact(primaryContact);
    }
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.summary}>
        <Row gutter={24}>
          <Col span={12} xs={24}>
            <FormItem label="First Name" name={`firstName_${index}`} size="large" required>
              <Input
                placeholder="First Name"
                value={get(primaryContact, `firstName_${index}`, '')}
                defaultValue={primaryContact?.[`firstName_${index}`] || ''}
                onChange={(e) => setValue(e.target.value, `firstName_${index}`)}
              />
            </FormItem>
          </Col>
          <Col span={12} xs={24}>
            <FormItem label="Last Name" name={`lastName_${index}`} size="large" required>
              <Input
                placeholder="Last Name"
                value={get(primaryContact, `lastName_${index}`, '')}
                defaultValue={primaryContact?.[`lastName_${index}`] || ''}
                onChange={(e) => setValue(e.target.value, `lastName_${index}`)}
              />
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12} xs={24}>
            <FormItem label="Country" name={`country_${index}`} size="large" required>
              <Select
                options={countrySelectList}
                defaultValue={primaryContact?.[`country_${index}`]}
                onChange={(value) => setValue(value, `country_${index}`)}
              />
            </FormItem>
          </Col>
          <Col span={12} xs={24}>
            <FormItem label="Phone Number" name={`phoneNumber_${index}`} size="large" rules={rules.phoneNumber}>
              <Input
                placeholder="Phone Number"
                defaultValue={primaryContact?.[`phoneNumber_${index}`]}
                value={get(primaryContact, `phoneNumber_${index}`, '')}
                onChange={(e) => setValue(e.target.value, `phoneNumber_${index}`)}
              />
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24}>
            <FormItem label="Email Address" name={`email_${index}`} size="large" rules={rules.email}>
              <Input
                placeholder="Email Address"
                defaultValue={primaryContact?.[`email_${index}`]}
                value={get(primaryContact, `email_${index}`, '')}
                onChange={(e) => setValue(e.target.value, `email_${index}`)}
              />
            </FormItem>
          </Col>
        </Row>
      </div>
    </div>
  );
}
