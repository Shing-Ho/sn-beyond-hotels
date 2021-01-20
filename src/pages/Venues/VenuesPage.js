import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import $ from 'jquery';

import Page from 'components/Page/Page';
import VenuesHeader from './components/VenuesHeader/VenuesHeader';
import VenuesUploadZone from './components/VenuesUploadZone/VenuesUploadZone';
import VenuesDetailHeader from './components/VenuesDetailHeader/VenuesDetailHeader';
import VenuesAvailability from './components/VenuesAvailability/VenuesAvailability';
import VenuesActions from './components/VenuesActions/VenuesActions';
import VenuesAssistant from './components/VenuesAssistant/VenuesAssistant';
import VenuesContentSection from './components/VenuesContentSection/VenuesContentSection';
import VenuesAssistantOnboarding from './components/VenuesAssistantOnboarding/VenuesAssistantOnboarding';
import styles from './VenuesPage.module.scss';

export default function VenuesPage({ location = {}, mainIcon }) {
  const [onboarding, SetOnboarding] = useState(0);
  const [showMe, setShowMe] = useState(true);

  const openOnboarding = () => {
    $('html, body').animate({ scrollTop: 0 }, 100, () => {
      // $('body').addClass('noscroll');
      SetOnboarding(1);
    });
  };

  useEffect(() => {
    openOnboarding();
  }, []);

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
  const handleShowMeClose = () => {
    setShowMe(false);
  };

  return (
    <Page param={location}>
      <div className={styles.root}>
        <VenuesHeader />
        <VenuesUploadZone onboarding={onboarding === 2} />
        <div className={styles.container}>
          <Row justify="center">
            <Col md={16} sm={24} flex={1}>
              <Row>
                <VenuesDetailHeader mainIcon={mainIcon} onboarding={onboarding === 3} />
              </Row>
              <Row>
                <VenuesContentSection productOnboarding={onboarding === 4} tabsOnboarding={onboarding === 5} />
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
                  {showMe && <VenuesAssistant handleOnboarding={openOnboarding} onCloseClick={handleShowMeClose} />}
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
