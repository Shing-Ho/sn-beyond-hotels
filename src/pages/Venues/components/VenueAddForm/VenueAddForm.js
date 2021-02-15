import React, { useState, useRef, useEffect } from 'react';
import cx from 'classnames';
import { Row, Col, Button } from 'antd';
import { useIntl } from 'react-intl';
import _ from 'lodash';

import Input from 'components/Input/Input';
import Modal from 'components/Modal/Modal';
import Select from 'components/Select/Select';

import { ReactComponent as Nightlife } from 'icons/dashboardIcons/Nightlife.svg';
import { ReactComponent as BedFillGray } from 'icons/dashboardIcons/BedFillGray.svg';
import { ReactComponent as FlightsOutline } from 'icons/dashboardIcons/FlightsOutline.svg';
import { ReactComponent as TransportationOutline } from 'icons/dashboardIcons/TransportationOutline.svg';
import { ReactComponent as GasStation } from 'icons/dashboardIcons/GasStation.svg';
import { ReactComponent as ToursActivities } from 'icons/dashboardIcons/ToursActivities.svg';
import { ReactComponent as ShowsEvents } from 'icons/dashboardIcons/ShowsEvents.svg';
import { ReactComponent as DiningSvg } from 'icons/dashboardIcons/Dining.svg';
import { ReactComponent as Shopping } from 'icons/dashboardIcons/Icon_Category_Shopping.svg';

import { Languages } from '../../../../helpers/constants';
import styles from './VenueAddForm.module.scss';

const languageOptions = Object.keys(Languages).map((value) => ({
  title: value,
  value: Languages[value],
}));

const VenueTypes = [
  {
    id: 1,
    name: 'nightLife',
    value: 'NIGHT_LIFE',
    icon: <Nightlife />,
  },
  {
    id: 2,
    name: 'hotels',
    value: 'HOTELS',
    icon: <BedFillGray />,
  },
  {
    id: 3,
    name: 'flights',
    value: 'flights',
    icon: <FlightsOutline />,
  },
  {
    id: 4,
    name: 'transportation',
    value: 'CAR_SERVICE',
    icon: <TransportationOutline />,
  },
  {
    id: 5,
    name: 'gasAndCharging',
    value: 'GAS_AND_CHARGING',
    icon: <GasStation />,
  },
  {
    id: 6,
    name: 'toursAndActivities',
    value: 'tours',
    icon: <ToursActivities />,
  },
  {
    id: 7,
    name: 'showsAndEvents',
    value: 'THINGS_TO_DO',
    icon: <ShowsEvents />,
  },
  {
    id: 8,
    name: 'dining',
    value: 'DINING',
    icon: <DiningSvg />,
  },
  {
    id: 9,
    name: 'shopping',
    value: 'SHOPPINGS',
    icon: <Shopping />,
  },
];

export default function VenueAddForm({ closeVenueModal, createVenue, loading }) {
  const [venueName, setVenueName] = useState('');
  const [selectedVenue, setVenueType] = useState('NIGHT_LIFE');
  const [selectedLanguage, setVenueLanguage] = useState('en');
  const [isValid, setIsValid] = useState(false);

  const intl = useIntl();
  // const dispatch = useDispatch();

  const debouncedFunction = useRef(
    _.debounce((key) => {
      if (key !== '' && selectedVenue !== '' && selectedLanguage !== '') {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    }, 500),
  );

  useEffect(() => debouncedFunction.current(venueName), [venueName]);

  const submitHandle = () => {
    if (isValid) {
      const payload = {
        name: venueName,
        type: selectedVenue,
        language_code: selectedLanguage,
      };
      createVenue(payload);
    }
  };

  return (
    <div className={styles.VenueAddForm}>
      <Modal title="Add Venue" visible footer={null} centered width={1000} onCancel={() => closeVenueModal()}>
        <div className={styles.venueContent}>
          <Row>
            <h3 className={styles.title}>What type of experience would you like to add?</h3>
          </Row>
          <Row>
            <div className={styles.venueTypes}>
              {VenueTypes.map((item) => (
                <div
                  className={cx(styles.venue, { [styles.selectedVenue]: item.value === selectedVenue })}
                  onClick={() => setVenueType(item.value)}
                >
                  <div className={styles.icon}>{item.icon}</div>
                  <div className={styles.text}>{intl.formatMessage({ id: item.name, defaultValue: item.name })}</div>
                </div>
              ))}
            </div>
          </Row>
          <Row>
            <Col className={styles.input}>
              <h3 className={styles.title}>What&apos; your venue called?</h3>
            </Col>
            <Col className={[styles.input, styles.left]}>
              <h3 className={styles.title}>Select Language</h3>
            </Col>
          </Row>
          <Row>
            <Col className={styles.input}>
              <Input value={venueName} placeholder="Add Venue Name..." maxLength={40} onChange={setVenueName} />
            </Col>
            <Col className={[styles.input, styles.left]}>
              <Select
                options={languageOptions}
                value={selectedLanguage}
                showSearch={false}
                onChange={setVenueLanguage}
              />
            </Col>
          </Row>
          <Row>
            <div className={styles.actions}>
              <Button className={[styles.btn, styles.cancel]} onClick={() => closeVenueModal()}>
                Cancel
              </Button>
              <Button
                className={cx([styles.btn, styles.continue], { [styles.disabled]: !isValid })}
                disabled={!isValid}
                loading={loading}
                onClick={() => submitHandle()}
              >
                Continue
              </Button>
            </div>
          </Row>
        </div>
      </Modal>
    </div>
  );
}
