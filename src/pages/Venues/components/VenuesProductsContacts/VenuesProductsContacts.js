import React from 'react';
import { Row, Col, Button, Switch } from 'antd';

import Input from 'components/Input/Input';
import { ReactComponent as TrashIcon } from 'icons/trash.svg';
import { ReactComponent as InfoIcon } from 'icons/info.svg';

import styles from './VenuesProductsContacts.module.scss';

const OtherContactItem = () => (
  <div className={styles.contactContainer}>
    <Row className={styles.header}>
      <Col span={12}>
        <b>Contact Name</b>
      </Col>
      <Col span={5} offset={1}>
        <b>Title</b>
      </Col>
      <Col span={5} offset={1}>
        <b>Department</b>
        <InfoIcon width={16} height={16} />
      </Col>
    </Row>
    <Row className={styles.input}>
      <Col span={12}>
        <Input placeholder="Enther Name..." />
      </Col>
      <Col span={5} offset={1}>
        <Input placeholder="Manager, Etc..." />
      </Col>
      <Col span={5} offset={1}>
        <Input placeholder="Front Desk, Etc..." />
      </Col>
    </Row>
    <Row className={styles.header}>
      <Col span={12}>
        <b>Email Address</b>
      </Col>
      <Col span={5} offset={1}>
        <b>Phone Number</b>
      </Col>
    </Row>
    <Row className={styles.input}>
      <Col span={12}>
        <Input placeholder="Enther email..." />
      </Col>
      <Col span={5} offset={1}>
        <Input placeholder="Enter number..." />
      </Col>
      <Col span={5} offset={1}>
        <div className={styles.actions}>
          <TrashIcon width={14} height={24} />
          <Button className={styles.btn}>Clear</Button>
        </div>
      </Col>
    </Row>
  </div>
);

export default function VenuesProductsContacts() {
  return (
    <div className={styles.productsContacts}>
      <h2>Main Contact Information</h2>
      <div className={styles.contactContainer}>
        <Row className={styles.header}>
          <Col span={12}>
            <b>Venue Website</b>
          </Col>
          <Col span={5} offset={1}>
            <b>Main Phone Number</b>
          </Col>
          <Col span={5} offset={1}>
            <b>Fax</b>
          </Col>
        </Row>
        <Row className={styles.input}>
          <Col span={12}>
            <Input placeholder="Enther Website" />
          </Col>
          <Col span={5} offset={1}>
            <Input placeholder="Enther Phone Number" />
          </Col>
          <Col span={5} offset={1}>
            <Input placeholder="Enther Fax" />
          </Col>
        </Row>
        <Row className={styles.header}>
          <Col span={12}>
            <b>Venue Main Email Address</b>
          </Col>
        </Row>
        <Row className={styles.input}>
          <Col span={12}>
            <Input placeholder="Enther Website" />
          </Col>
          <Col span={12}>
            <div className={styles.actions}>
              <Button className={styles.btn}>Clear</Button>
            </div>
          </Col>
        </Row>
      </div>

      <div className={styles.otherContactsHeader}>
        <h2>Other Contacts</h2>
        <div className={styles.switch}>
          Include <Switch defaultChecked />
        </div>
      </div>
      <OtherContactItem />
      <OtherContactItem />
    </div>
  );
}
