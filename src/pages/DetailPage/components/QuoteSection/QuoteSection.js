import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cx from 'classnames';
import moment from 'moment';
import { Button, DatePicker, TimePicker, Input, Spin } from 'antd';
import PlaceAutoComplete from 'components/PlaceAutoComplete/PlaceAutoComplete';
import NumberInput from 'components/NumberInput/NumberInput';
import { ReactComponent as CalendarIcon } from 'icons/calendar.svg';
import careyActions from 'store/carey/actions';
import { getLoading, getError } from 'store/carey/selectors';
import styles from './QuoteSection.module.scss';

export default function QuoteSection({ className }) {
  const dispatch = useDispatch();
  const [pickUpDate, setPickUpDate] = useState(moment());
  const [pickUpTime, setPickUpTime] = useState(moment());
  const [passengerCount, setPassengerCount] = useState(1);
  const [bagCount, setBagCount] = useState(1);
  const [tripType, setTripType] = useState('Point-To-Point');
  const [errorShow, setErrorShow] = useState('');

  const loading = useSelector(getLoading);
  const error = useSelector(getError);

  const handlePassengerChange = (value) => {
    setPassengerCount(value);
  };

  const handleBagChange = (value) => {
    setBagCount(value);
  };

  const handleTimeChange = (time) => {
    setPickUpTime(time);
  };

  const handleGetQuote = () => {
    const pickUpDateTime = `${moment(pickUpDate).format('YYYY-MM-DD')}T${moment(pickUpTime).format('hh:mm:ss')}`;
    const payload = {
      DateTime: pickUpDateTime,
    };
    dispatch(careyActions.getRateInquiry(payload));
  };

  const handleAutoCompleteChange = (locations) => {
    // eslint-disable-next-line no-console
    console.log(locations);
  };

  useEffect(() => {
    let timeout;
    if (error) {
      setErrorShow(error?.message);
      timeout = setTimeout(() => dispatch(careyActions.clearState()), 3000);
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
              </Button.Group>
            </div>
          </div>
          <div className={styles.location}>
            <h3>Pickup Location:</h3>
            <PlaceAutoComplete onLocationChange={handleAutoCompleteChange} />
          </div>
          <div className={styles.location}>
            <h3>DropOff Location:</h3>
            <PlaceAutoComplete onLocationChange={handleAutoCompleteChange} />
          </div>
          <div className={styles.special}>
            <Input.TextArea placeholder="Special Instructions" rows={4} />
          </div>
          <Button className={styles.btn} onClick={handleGetQuote}>
            Continue
          </Button>
        </div>
      </>
    </>
  );
}
