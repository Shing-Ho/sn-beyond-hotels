import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import $ from 'jquery';
import { useDispatch } from 'react-redux';

import history from 'store/history';
import venueActions from 'store/venue/actions';

import Page from 'components/Page/Page';
import Modal from 'components/Modal/Modal';
import VenuesHeader from './components/VenuesHeader/VenuesHeader';
import VenuesUploadZone from './components/VenuesUploadZone/VenuesUploadZone';
import VenuesDetailHeader from './components/VenuesDetailHeader/VenuesDetailHeader';
import VenuesAvailability from './components/VenuesAvailability/VenuesAvailability';
import VenuesActions from './components/VenuesActions/VenuesActions';
import VenuesAssistant from './components/VenuesAssistant/VenuesAssistant';
import VenuesContentSection from './components/VenuesContentSection/VenuesContentSection';
import VenuesAssistantOnboarding from './components/VenuesAssistantOnboarding/VenuesAssistantOnboarding';
import VenueMediaUpload from './components/VenueMediaUpload/VenueMediaUpload';
import styles from './VenuesPage.module.scss';

export default function VenuesPage(props) {
  const { location = {}, mainIcon, loading, venue } = props;
  const [onboarding, SetOnboarding] = useState(0);
  const [showMe, setShowMe] = useState(true);
  const [showVenueMedia, setShowVenueMedia] = useState(false);
  const dispatch = useDispatch();

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

  const onActive = (status) => {
    if (venue) {
      const payload = {
        id: venue.id,
        name: venue.name,
        status,
      };
      dispatch(venueActions.updateVenue(payload));
    }
  };

  const onUpdateVenue = (name, tags) => {
    if (venue) {
      const payload = {
        id: venue.id,
        name,
      };
      if (tags) {
        payload.tags = tags;
      }
      dispatch(venueActions.updateVenue(payload));
    }
  };

  const onCancel = () => {
    dispatch(venueActions.setVenue(null));
    dispatch(venueActions.setVenueProductGroups(null));
    history.push(`${window.BASE_ROUTE || ''}/venues`);
  };

  const onUploadVenueMedia = (file) => {
    if (venue) {
      const formData = new FormData();
      formData.append('venue', venue.id);
      formData.append('url', file);

      const payload = {
        venue: venue.id,
        formData,
      };

      dispatch(venueActions.uploadVenueMedia(payload));
    }
  };

  const onUpdateVenueMediaOrder = (orders) => {
    if (venue) {
      const payload = {
        id: venue.id,
        order: orders,
      };
      dispatch(venueActions.updateVenueMediaOrder(payload));
    }
  };

  const onRemoveVenueMedia = (id) => {
    if (venue) {
      const payload = {
        venue_id: venue.id,
        id,
      };
      dispatch(venueActions.removeVenueMedia(payload));
    }
  };

  return (
    <Page param={location}>
      <div className={styles.root}>
        <VenuesHeader {...{ venue, onActive, onCancel }} />
        <VenuesUploadZone
          onboarding={onboarding === 2}
          handleUploadMedia={setShowVenueMedia}
          images={venue.media || []}
        />
        <div className={styles.container}>
          <Row justify="center">
            <Col md={16} sm={24} flex={1}>
              <Row>
                <VenuesDetailHeader mainIcon={mainIcon} onboarding={onboarding === 3} {...{ venue, onUpdateVenue }} />
              </Row>
              <Row>
                <VenuesContentSection
                  productOnboarding={onboarding === 4}
                  tabsOnboarding={onboarding === 5}
                  {...{ venue }}
                />
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
      {showVenueMedia && (
        <Modal
          title="Upload Venue Photos and Video"
          visible
          footer={null}
          centered
          width={1000}
          onCancel={() => setShowVenueMedia(false)}
        >
          <VenueMediaUpload {...{ loading, venue, onUploadVenueMedia, onUpdateVenueMediaOrder, onRemoveVenueMedia }} />
        </Modal>
      )}
    </Page>
  );
}
