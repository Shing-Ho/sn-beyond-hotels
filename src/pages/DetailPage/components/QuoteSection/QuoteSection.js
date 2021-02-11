import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import cx from 'classnames';
import moment from 'moment';
import { Button, DatePicker, TimePicker, Input, Spin, Row, Col, Modal, Radio } from 'antd';
import { isEmpty } from 'lodash';
import PlaceAutoComplete from 'components/PlaceAutoComplete/PlaceAutoComplete';
import NumberInput from 'components/NumberInput/NumberInput';
import { ReactComponent as CalendarIcon } from 'icons/calendar.svg';

import careyActions from 'store/carey/actions';
import { getLoading, getError, getCareyRateInquiry } from 'store/carey/selectors';
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
  const [visible, setVisible] = useState(false);
  const [selectVehicle, setSelectVehicle] = useState('');

  const loading = useSelector(getLoading);
  const error = useSelector(getError);
  const quotes = useSelector(getCareyRateInquiry);

  const handlePassengerChange = (value) => {
    setPassengerCount(value);
  };

  const handleBagChange = (value) => {
    setBagCount(value);
  };

  const handleTimeChange = (time) => {
    setPickUpTime(time);
  };

  const handlePickUpAutoCompleteChange = (locations) => {
    setPickUpLoacation(locations);
    if (locations?.airport) setShowFlight(true);
    else setShowFlight(false);
  };

  const handleAutoCompleteChange = (locations) => {
    setDropOffLocation(locations);
  };

  const handleGetQuote = () => {
    const pickUpDateTime = `${moment(pickUpDate).format('YYYY-MM-DD')}T${moment(pickUpTime).format('hh:mm:ss')}`;
    const payload = {
      dateTime: pickUpDateTime,
      passengers: passengerCount,
      bags: bagCount,
      tripType,
      pickUpLoacation,
      dropOffLocation,
      special,
    };
    if (pickUpLoacation?.airport) {
      const flightInfo = {
        flightDate: moment(flightDate).format('YYYY-MM-DDTHH:mm:ss'),
        flightNum,
        flightCode,
      };

      payload.flightInfo = flightInfo;
    }
    dispatch(careyActions.getRateInquiry(payload));
  };

  const handleCancel = () => {
    dispatch(careyActions.clearState());
    setVisible(false);
  };

  const handleSelectVehicleChange = (e) => {
    setSelectVehicle(e.target.value);
  };

  const handleViewQuote = () => {
    dispatch(push(`/transports/carhire/${selectVehicle}/viewquote`));
  };

  useEffect(() => {
    if (error) {
      setErrorShow(error?.message);
      dispatch(careyActions.clearState());
    }
  }, [error, dispatch]);

  useEffect(() => {
    dispatch(careyActions.clearState());
    if (!visible) setSelectVehicle('');
  }, [
    pickUpDate,
    pickUpTime,
    flightDate,
    flightNum,
    flightCode,
    pickUpLoacation,
    dropOffLocation,
    passengerCount,
    bagCount,
    special,
    visible,
  ]);

  useEffect(() => {
    if (!isEmpty(quotes)) setVisible(true);
  }, [quotes]);

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
            <PlaceAutoComplete onLocationChange={handlePickUpAutoCompleteChange} />
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
                    format="YYYY-MM-DD HH:mm"
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
      </>
      {visible && !isEmpty(quotes) && (
        <Modal
          title={<div className={styles.modalHeader}>Select Vehicle</div>}
          visible={visible}
          onCancel={handleCancel}
          footer={false}
        >
          <div>
            <Row>
              <Col lg={12} className={styles.column}>
                <div>
                  {pickUpLoacation?.locationName} {pickUpLoacation?.addressLine} {pickUpLoacation?.cityName}{' '}
                  {pickUpLoacation?.postalCode} {pickUpLoacation?.stateProv?.value}{' '}
                  {pickUpLoacation?.countryName?.value}
                </div>
              </Col>
              <Col lg={12} className={styles.column}>
                <div>
                  {dropOffLocation?.locationName} {dropOffLocation?.addressLine} {dropOffLocation?.cityName}{' '}
                  {dropOffLocation?.postalCode} {dropOffLocation?.stateProv?.value}{' '}
                  {dropOffLocation?.countryName?.value}
                </div>
              </Col>
            </Row>
            <Radio.Group
              defaultValue="accommodations"
              buttonStyle="solid"
              className={styles.radio}
              onChange={handleSelectVehicleChange}
            >
              <Row>
                {quotes.map((quote) => (
                  <Col lg={12} className={styles.column}>
                    <Radio value={quote.vehicleDetails.vehicleCode}>
                      <div>
                        <div>{quote?.vehicleDetails?.vehicleName}</div>
                        <div>{quote?.total?.totalAmountDescription}</div>
                      </div>
                    </Radio>
                  </Col>
                ))}
              </Row>
            </Radio.Group>
            <Row>
              <Col>{selectVehicle && <Button onClick={handleViewQuote}>View Quotes</Button>}</Col>
            </Row>
          </div>
        </Modal>
      )}
    </>
  );
}
