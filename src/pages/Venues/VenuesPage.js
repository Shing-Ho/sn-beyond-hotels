import React from 'react';
import { Row, Col } from 'antd';

import Page from 'components/Page/Page';
import VenuesHeader from './components/VenuesHeader/VenuesHeader';
import VenuesUploadZone from './components/VenuesUploadZone/VenuesUploadZone';
import VenuesDetailHeader from './components/VenuesDetailHeader/VenuesDetailHeader';
import VenuesAvailability from './components/VenuesAvailability/VenuesAvailability';
import VenuesActions from './components/VenuesActions/VenuesActions';
import VenuesAssistant from './components/VenuesAssistant/VenuesAssistant';
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
              <Row>
                <VenuesDetailHeader />
              </Row>
            </Col>
            <Col md={8} sm={24} flex={1}>
              <div className={styles.rightContent}>
                <Row>
                  <VenuesAvailability />
                </Row>
                <Row>
                  <VenuesActions />
                </Row>
                <Row>
                  <VenuesAssistant />
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Page>
  );
}
