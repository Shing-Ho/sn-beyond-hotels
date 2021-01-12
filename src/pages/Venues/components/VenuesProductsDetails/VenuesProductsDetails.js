import React, { useState } from 'react';
import { Row, Col, Button } from 'antd';

import { ReactComponent as TrashIcon } from 'icons/trash.svg';

import Editor from 'components/Editor/Editor';
import GoogleMap from 'components/GoogleMap/GoogleMap';

import VenuesPaymentForms from '../VenuesPaymentForms/VenuesPaymentForms';

import styles from './VenuesProductsDetails.module.scss';

const location = {
  lat: 27.2046,
  lng: 77.4977,
};

export default function VenuesProductsDetails() {
  const [detailDescription, setDetailDescription] = useState('');

  const handleDetailDescriptionUpdate = (content) => {
    setDetailDescription(content);
  };

  return (
    <div className={styles.productsDetails}>
      <h2>Description</h2>
      <Editor
        blockStyle
        maxLength={50}
        value={detailDescription}
        onChange={handleDetailDescriptionUpdate}
        className={styles.descEditor}
      />

      <h2>Location</h2>
      <div className={styles.location}>
        <div className={styles.map}>
          <GoogleMap center={location} coords={[location]} height={118} />
        </div>
        <div className={styles.content}>
          <div className={styles.address}>
            <b>555 Main ST</b>
            <p>Anytown, CA 90210</p>
          </div>
          <div className={styles.actions}>
            <TrashIcon width={14} height={24} />
            <Button className={styles.btn}>Edit</Button>
          </div>
        </div>
      </div>

      <h2>Hours of Operation</h2>
      <div className={styles.hoursOfOperation}>
        <Row className={styles.header}>
          <Col span={14}>
            <h2>Weekdays</h2>
          </Col>
          <Col span={5}>
            <b>Unlimited</b> Capacity
          </Col>
          <Col span={5}>
            <b>3/1/2020 - 7/1/2020</b>
          </Col>
        </Row>
        <Row>
          <Col span={4}>
            <b>Mon - Thur</b>
          </Col>
          <Col span={8}>9AM - 3PM, 5PM - 10PM</Col>
        </Row>
        <Row>
          <Col span={4}>
            <b>Fri</b>
          </Col>
          <Col span={8}>8AM - 4PM, 5PM - 11PM</Col>
          <Col span={12}>
            <div className={styles.actions}>
              <TrashIcon width={14} height={24} />
              <Button className={styles.btn}>Edit</Button>
            </div>
          </Col>
        </Row>
        <hr />
        <Row className={styles.header}>
          <Col span={14}>
            <h2>Weekends</h2>
          </Col>
          <Col span={5}>
            <b>Unlimited</b> Capacity
          </Col>
          <Col span={5}>
            <b>3/1/2020 - 7/1/2020</b>
          </Col>
        </Row>
        <Row>
          <Col span={4}>
            <b>Sat - Sun</b>
          </Col>
          <Col span={8}>8AM - 4PM, 5PM - 11PM</Col>
          <Col span={12}>
            <div className={styles.actions}>
              <TrashIcon width={14} height={24} />
              <Button className={styles.btn}>Edit</Button>
            </div>
          </Col>
        </Row>
      </div>

      <h2>Forms of Payment Accepted</h2>
      <VenuesPaymentForms />
    </div>
  );
}
