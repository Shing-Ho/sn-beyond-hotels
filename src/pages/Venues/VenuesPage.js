import React from 'react';
import { Row, Col } from 'antd';

import Page from 'components/Page/Page';
import VenuesHeader from './components/VenuesHeader/VenuesHeader';
import VenuesUploadZone from './components/VenuesUploadZone/VenuesUploadZone';
import styles from './VenuesPage.module.scss';

export default function VenuesPage() {
  return (
    <Page>
      <div className={styles.root}>
        <VenuesHeader />
        <VenuesUploadZone />
        <div className={styles.container}>
          <Row justify="center">
            <Col md={16} sm={24} flex={1}>
              <Row>left</Row>
            </Col>
            <Col md={8} sm={24} flex={1}>
              right
            </Col>
          </Row>
        </div>
      </div>
    </Page>
  );
}
