import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cx from 'classnames';
import moment from 'moment';
import { Button, DatePicker, TimePicker, Input, Spin, Row, Col } from 'antd';
import Complete from 'components/AutoComlete/AutoComplete';
import PlaceAutoComplete from 'components/PlaceAutoComplete/PlaceAutoComplete';
import NumberInput from 'components/NumberInput/NumberInput';
import { ReactComponent as CalendarIcon } from 'icons/calendar.svg';
import { ReactComponent as PinIcon } from 'icons/pin.svg';

import careyActions from 'store/carey/actions';
import { getLoading, getError } from 'store/carey/selectors';
import styles from './QuoteSection.module.scss';

export default function QuoteSection({ className }) {
  const dispatch = useDispatch();
  const [pickUpDate, setPickUpDate] = useState(moment());
  const [pickUpTime, setPickUpTime] = useState(moment());
  const [flightDate, setFlightDate] = useState();
  const [flightNum, setFlightNum] = useState('');
  const [flightCode, setFlightCode] = useState('');

  const [pickUpLoacation, setPickUpLoacation] = useState({});
  const [dropOffLocation, setDropOffLocation] = useState({});
  const [showFlight, setShowFlight] = useState(false);
  const [passengerCount, setPassengerCount] = useState(1);
  const [bagCount, setBagCount] = useState(1);
  const [tripType, setTripType] = useState('Point-To-Point');
  const [special, setSpecial] = useState('');
  const [errorShow, setErrorShow] = useState('');
  const pickUpCache = useRef({});

  const loading = useSelector(getLoading);
  const error = useSelector(getError);

  const [testVehicle, setTestVehicle] = useState({});

  const handlePassengerChange = (value) => {
    setPassengerCount(value);
  };

  const handleBagChange = (value) => {
    setBagCount(value);
  };

  const handleTimeChange = (time) => {
    setPickUpTime(time);
  };

  const handleAutoCompleteChange = (locations) => {
    setDropOffLocation(locations);
  };

  const clearPickUpData = () => {
    if (pickUpLoacation.location_id) {
      pickUpCache.current = pickUpLoacation || {};
    }
    setPickUpLoacation({});
  };

  const handleGetQuote = () => {
    const pickUpDateTime = `${moment(pickUpDate).format('YYYY-MM-DD')}T${moment(pickUpTime).format('hh:mm:ss')}`;
    const payload = {
      dateTime: pickUpDateTime,
      passengers: passengerCount,
      bags: bagCount,
      tripType,
      pickUpLoacation,
      flightInfo: {
        flightDate,
        flightNum,
        flightCode,
      },
      dropOffLocation,
      special,
    };
    dispatch(careyActions.getRateInquiry(payload));
    setTestVehicle({
      mockData: {
        test: '123',
      },
    });
  };

  useEffect(() => {
    let timeout;
    if (error) {
      setErrorShow(error?.message);
    } else {
      setErrorShow('');
    }
    return () => clearTimeout(timeout);
  }, [error, dispatch]);

  return (
    <>
      {loading && (
        <div className={styles.loaderContainerAbsolute}>
          <Spin size="large" />
        </div>
      )}
      <>
        <div className={cx(styles.root, className)}>
          {errorShow ? <div className={styles.errorText}>{errorShow}</div> : null}
          <div className={styles.pickUpDate}>
            <div className={styles.label}>
              <h3>When is your trip?</h3>
            </div>
            <div className={styles.datePickerWrapper}>
              <DatePicker
                onChange={(value) => {
                  setPickUpDate(value);
                }}
                value={pickUpDate}
                suffixIcon={<CalendarIcon className="calendarIcon" width={20} height={20} />}
                className={styles.datePicker}
              />
              <TimePicker
                onChange={handleTimeChange}
                value={moment(pickUpTime, 'LT a')}
                use12Hours
                variant="secondaryLight"
                format="hh:mm a"
                className={styles.datePicker}
              />
            </div>
          </div>
          <div className={styles.passengers}>
            <div className={styles.passengerInput}>
              <h3>Passengers: </h3>
              <NumberInput
                defaultValue={1}
                propsValue={passengerCount}
                onChange={handlePassengerChange}
                maxValue={10}
              />
            </div>
            <div className={styles.passengerInput}>
              <h3>Bags: </h3>
              <NumberInput defaultValue={1} propsValue={bagCount} onChange={handleBagChange} maxValue={14} />
            </div>
          </div>
          <div className={styles.tripKind}>
            <h3>What kind of trip is this?</h3>
            <div className={styles.tripType}>
              <Button.Group>
                <Button
                  className={tripType === 'Point-To-Point' ? styles.roundSelectedBtn : styles.roundBtn}
                  onClick={() => setTripType('Point-To-Point')}
                >
                  POINT-TO-POINT
                </Button>
              </Button.Group>
            </div>
          </div>
          <div className={styles.location}>
            <h3>Pickup Location:</h3>
            <div className={styles.autoCompleteWrapper}>
              <Complete
                value={pickUpLoacation}
                onSelect={(place) => {
                  if (place?.location_type !== 'AIRPORT') {
                    setErrorShow('Please pick up airport location');
                    setShowFlight(false);
                  } else {
                    setErrorShow('');
                    setShowFlight(true);
                  }
                  setPickUpLoacation(place);
                }}
                clearData={clearPickUpData}
                placeholder="Search or enter location..."
              />
              <PinIcon className={styles.pinIcon} width={24} height={24} />
            </div>
          </div>
          {showFlight && (
            <div className={styles.flight}>
              <Row>
                <Col span={12}>
                  <DatePicker
                    onChange={(value) => {
                      setFlightDate(value);
                    }}
                    value={flightDate}
                    suffixIcon={<CalendarIcon className="calendarIcon" width={20} height={20} />}
                    showTime
                  />
                </Col>
                <Col span={6}>
                  <Input placeholder="Flight Number" value={flightNum} onChange={(e) => setFlightNum(e.target.value)} />
                </Col>
                <Col span={6}>
                  <Input placeholder="Flight Code" value={flightCode} onChange={(e) => setFlightCode(e.target.value)} />
                </Col>
              </Row>
            </div>
          )}
          <div className={styles.location}>
            <h3>DropOff Location:</h3>
            <PlaceAutoComplete onLocationChange={handleAutoCompleteChange} />
          </div>
          <div className={styles.special}>
            <Input.TextArea
              placeholder="Special Instructions"
              rows={4}
              value={special}
              onChange={(e) => setSpecial(e.target.value)}
            />
          </div>
          <Button className={styles.btn} onClick={handleGetQuote}>
            Continue
          </Button>
        </div>
        {!!testVehicle && <div>asdf</div>}
      </>
    </>
  );
}
