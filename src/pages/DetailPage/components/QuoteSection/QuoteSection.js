import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cx from 'classnames';
import moment from 'moment';
import { Button, DatePicker, Input, Spin } from 'antd';
import { isEmpty } from 'lodash';

import NumberInput from 'components/NumberInput/NumberInput';
import Complete from 'components/AutoComlete/AutoComplete';
import { ReactComponent as CalendarIcon } from 'icons/calendar.svg';
import careyActions from 'store/carey/actions';
import { getLoading, getError } from 'store/carey/selectors';
import styles from './QuoteSection.module.scss';

export default function QuoteSection({ className }) {
  const dispatch = useDispatch();
  const [pickUpDate, setPickUpDate] = useState(moment());
  const [passengerCount, setPassengerCount] = useState(1);
  const [bagCount, setBagCount] = useState(1);
  const [tripType, setTripType] = useState('Point-To-Point');
  const [pickUp, setPickUp] = useState({});
  const [dropOff, setDropOff] = useState({});
  const pickUpCache = useRef({});
  const dropOffCache = useRef({});
  const [validate, setValidate] = useState(false);
  const [errorShow, setErrorShow] = useState('');

  const loading = useSelector(getLoading);
  const error = useSelector(getError);

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

  const handleGetQuote = () => {
    const payload = {
      Version: '1.0',
      POS: {
        Source: {
          BookingChannel: {
            Type: 'TA',
            CompanyName: {
              _value_1: 'CSI - SimpleNight',
              Code: '',
              CodeContext: '52969',
              CompanyShortName: 'PM744',
            },
          },
        },
      },
      Service: {
        Pickup: {
          DateTime: moment(pickUpDate).format('YYYY-MM-DDThh:mm:ss'),
          AirportInfo: {
            Departure: {
              AirportName: '',
              LocationCode: 'SEA',
            },
          },
        },
        Dropoff: {
          AirportInfo: {
            Departure: {
              AirportName: '',
              LocationCode: 'SEA',
            },
          },
          Airline: {
            FlightDateTime: '',
            FlightNumber: 'SEA',
            Code: '',
          },
        },
      },
      ServiceType: {
        Code: 'Point-To-Point',
        Description: 'ALL',
      },
      PassengerPrefs: {
        MaximumBaggage: '1',
        MaximumPassengers: '1',
        GreetingSignInd: 'false',
      },
      RateQualifier: {
        AccountID: '',
      },
    };
    dispatch(careyActions.getRateInquiry(payload));
  };

  useEffect(() => {
    let timeout;
    if (error) {
      setErrorShow(error?.message);
      timeout = setTimeout(() => dispatch(careyActions.clearState()), 3000);
    }
    return () => clearTimeout(timeout);
  }, [error, dispatch]);

  useEffect(() => {
    if (!isEmpty(pickUp) && !isEmpty(dropOff)) setValidate(true);
  }, [pickUp, dropOff]);

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
                  className={tripType === 'Point-To-Point' ? styles.roundSelectedBtn : styles.roundBtn}
                  onClick={() => setTripType('Point-To-Point')}
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
      </>
    </>
  );
}
