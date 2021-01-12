import React, { useState } from 'react';
import { Row, Col, Button } from 'antd';

import { ReactComponent as TrashIcon } from 'icons/trash.svg';
import styles from './VenuesAvailability.module.scss';

export default function VenuesAvailability() {
  const [mode, setMode] = useState(false);
  return (
    <div className={styles.availability}>
      <h3 className={styles.title}>Availability</h3>

      {mode && (
        <div>
          <div className={styles.contentContainer}>
            <Row className={styles.content}>
              <Col span={12}>
                <p>Rule Name</p>
                <b>Weekdays</b>
              </Col>
              <Col span={12}>
                <p>Capacity</p>
                <b>Unlimited</b>
              </Col>
            </Row>
            <Row className={styles.content}>
              <Col span={12}>
                <p>Days</p>
                <b>Mon - Fri</b>
              </Col>
              <Col span={12}>
                <p>Date Range</p>
                <b>3/1/2020 - 7/1/2020</b>
              </Col>
            </Row>
            <Row className={styles.content}>
              <Col span={12}>
                <p>Times</p>
                <b>9AM - 3PM</b>
                <b>5PM - 10PM</b>
              </Col>
              <Col span={12} className={styles.actions}>
                <TrashIcon width={14} height={24} />
                <Button className={styles.btn}>Edit</Button>
              </Col>
            </Row>
          </div>
          <div className={styles.contentContainer}>
            <Row className={styles.content}>
              <Col span={12}>
                <p>Rule Name</p>
                <b>Weekdays</b>
              </Col>
              <Col span={12}>
                <p>Capacity</p>
                <b>Unlimited</b>
              </Col>
            </Row>
            <Row className={styles.content}>
              <Col span={12}>
                <p>Days</p>
                <b>Sun, Sat</b>
              </Col>
              <Col span={12}>
                <p>Date Range</p>
                <b>3/1/2020 - 7/1/2020</b>
              </Col>
            </Row>
            <Row className={styles.content}>
              <Col span={12}>
                <p>Times</p>
                <b>9AM - 3PM</b>
                <b>5PM - 10PM</b>
              </Col>
              <Col span={12} className={styles.actions}>
                <TrashIcon width={14} height={24} />
                <Button className={styles.btn}>Edit</Button>
              </Col>
            </Row>
          </div>
        </div>
      )}
      {!mode && (
        <div className={styles.contentContainer}>
          <p className={styles.description}>Add difference times this venue is open or available by adding rules.</p>
        </div>
      )}
      <Button className={styles.btn} onClick={() => setMode(!mode)}>
        <i className="fa fa-plus" aria-hidden="true" /> Add Rule
      </Button>
    </div>
  );
}
