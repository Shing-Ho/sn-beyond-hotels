import React, { useState, useEffect, useRef } from 'react';
import { Button, DatePicker, Input } from 'antd';
import cx from 'classnames';
import moment from 'moment';
import { isEmpty } from 'lodash';

import NumberInput from 'components/NumberInput/NumberInput';
import Complete from 'components/AutoComlete/AutoComplete';
import { ReactComponent as CalendarIcon } from 'icons/calendar.svg';
import styles from './QuoteSection.module.scss';

export default function QuoteSection({ className }) {
  const [pickUpDate, setPickUpDate] = useState(moment());
  const [passengerCount, setPassengerCount] = useState(1);
  const [bagCount, setBagCount] = useState(1);
  const [tripType, setTripType] = useState('point');
  const [pickUp, setPickUp] = useState({});
  const [dropOff, setDropOff] = useState({});
  const pickUpCache = useRef({});
  const dropOffCache = useRef({});
  const [validate, setValidate] = useState(false);

  const handlePassengerChange = (value) => {
    setPassengerCount(value);
  };

  const handleBagChange = (value) => {
    setBagCount(value);
  };

  const clearPickUpData = () => {
    if (pickUp?.location_id) {
      pickUpCache.current = pickUp || {};
    }
    setPickUp({});
  };
  const clearDropOffData = () => {
    if (dropOff?.location_id) {
      dropOffCache.current = dropOff || {};
    }
    setDropOff({});
  };

  const handleGetQuote = () => {};

  useEffect(() => {
    if (!isEmpty(pickUp) && !isEmpty(dropOff)) setValidate(true);
  }, [pickUp, dropOff]);
  return (
    <div className={cx(styles.root, className)}>
      <div className={styles.pickUpDate}>
        <div className={styles.label}>
          <h3>When is your trip?</h3>
        </div>
        <div className={styles.datePickerWrapper}>
          <DatePicker
            showTime
            onChange={(value) => {
              setPickUpDate(value);
            }}
            value={pickUpDate}
            suffixIcon={<CalendarIcon className="calendarIcon" width={20} height={20} />}
            className={styles.datePicker}
          />
        </div>
      </div>
      <div className={styles.passengers}>
        <div className={styles.passengerInput}>
          <h3>Passengers: </h3>
          <NumberInput defaultValue={1} propsValue={passengerCount} onChange={handlePassengerChange} />
        </div>
        <div className={styles.passengerInput}>
          <h3>Bags: </h3>
          <NumberInput defaultValue={1} propsValue={bagCount} onChange={handleBagChange} />
        </div>
      </div>
      <div className={styles.tripKind}>
        <h3>What kind of trip is this?</h3>
        <div className={styles.tripType}>
          <Button.Group>
            <Button
              className={tripType === 'point' ? styles.roundSelectedBtn : styles.roundBtn}
              onClick={() => setTripType('point')}
            >
              POINT-TO-POINT
            </Button>
            <Button
              className={tripType === 'direct' ? styles.roundSelectedBtn : styles.roundBtn}
              onClick={() => setTripType('direct')}
            >
              AS DIRECTED
            </Button>
          </Button.Group>
        </div>
      </div>
      <div className={styles.location}>
        <h3>Pickup Location:</h3>
        <div className={styles.autoComplete}>
          <Complete
            value={pickUp}
            onSelect={(place) => setPickUp(place)}
            clearData={clearPickUpData}
            placeholder="Search or enter location..."
          />
        </div>
      </div>
      <div className={styles.location}>
        <h3>DropOff Location:</h3>
        <div className={styles.autoComplete}>
          <Complete
            value={dropOff}
            onSelect={(place) => setDropOff(place)}
            clearData={clearDropOffData}
            placeholder="Search or enter location..."
          />
        </div>
      </div>
      <div className={styles.special}>
        <Input.TextArea placeholder="Special Instructions" rows={4} />
      </div>
      {validate && (
        <Button className={styles.btn} onClick={handleGetQuote}>
          Continue
        </Button>
      )}
    </div>
  );
}
