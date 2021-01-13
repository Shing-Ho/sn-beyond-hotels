import React, { useState } from 'react';
import { Row, Col, Button } from 'antd';
import $ from 'jquery';

import Page from 'components/Page/Page';
import VenuesHeader from './components/VenuesHeader/VenuesHeader';
import VenuesUploadZone from './components/VenuesUploadZone/VenuesUploadZone';
import VenuesDetailHeader from './components/VenuesDetailHeader/VenuesDetailHeader';
import VenuesActions from './components/VenuesActions/VenuesActions';
import VenuesAssistant from './components/VenuesAssistant/VenuesAssistant';
import VenuesContentSection from './components/VenuesContentSection/VenuesContentSection';
import VenuesAssistantOnboarding from './components/VenuesAssistantOnboarding/VenuesAssistantOnboarding';
import styles from './VenuesPage.module.scss';

export default function VenuesPage() {
  const [onboarding, SetOnboarding] = useState(0);

  const openOnboarding = () => {
    $('html, body').animate({ scrollTop: 0 }, 100, () => {
      // $('body').addClass('noscroll');
      SetOnboarding(1);
    });
  };
  const handleOnboarding = (currentStep) => {
    if (currentStep === 2) {
      $('html, body').animate({ scrollTop: 180 }, 100);
    } else if (currentStep === 3) {
      $('html, body').animate({ scrollTop: 350 }, 100);
    } else if (currentStep === 4) {
      $('html, body').animate({ scrollTop: 500 }, 100);
    }
    SetOnboarding(currentStep);
  };
  return (
    <Page>
      <div className={styles.root}>
        <VenuesHeader />
        <VenuesUploadZone onboarding={onboarding === 2} />
        <div className={styles.container}>
          <Row justify="center">
            <Col md={16} sm={24} flex={1}>
              <Row>
                <VenuesDetailHeader onboarding={onboarding === 3} />
              </Row>
              <Row>
                <VenuesContentSection productOnboarding={onboarding === 4} tabsOnboarding={onboarding === 5} />
              </Row>
            </Col>
            <Col md={8} sm={24} flex={1}>
              <div className={styles.rightContent}>
                <Row>
                  <Button className={styles.btn}>Publish</Button>
                </Row>
                <Row>
                  <VenuesActions />
                </Row>
                <Row>
                  <VenuesAssistant handleOnboarding={openOnboarding} />
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      {onboarding > 0 && <VenuesAssistantOnboarding currentStep={onboarding} handleOnboarding={handleOnboarding} />}
    </Page>
  );
}
