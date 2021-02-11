import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { push } from 'connected-react-router';
import { isEmpty } from 'lodash';
import { Button, Modal, Row, Col, Input } from 'antd';

import careyActions from 'store/carey/actions';
import { getCareyRateInquiry } from 'store/carey/selectors';

import Page from 'components/Page/Page';
import GoogleMap from 'components/GoogleMap/GoogleMap';
import PlaceAutoComplete from 'components/PlaceAutoComplete/PlaceAutoComplete';
import Select from 'components/Select/Select';
import styles from './QuoteViewPage.module.scss';

const cardOptions = [
  { title: '', value: '' },
  { title: 'AMEX', value: 'AMEX' },
  { title: 'VISA', value: 'VISA' },
  { title: 'MASTERCARD', value: 'MASTERCARD' },
  { title: 'DINERS', value: 'DINERS' },
  { title: 'DISCOVER', value: 'DISCOVER' },
];

const expMonths = [
  { title: '', value: '' },
  { title: '01', value: '01' },
  { title: '02', value: '02' },
  { title: '03', value: '03' },
  { title: '04', value: '04' },
  { title: '05', value: '05' },
  { title: '06', value: '06' },
  { title: '07', value: '07' },
  { title: '08', value: '08' },
  { title: '09', value: '09' },
  { title: '10', value: '10' },
  { title: '11', value: '11' },
  { title: '12', value: '12' },
];

const expYears = [
  { title: '', value: '' },
  { title: '2021', value: '2021' },
  { title: '2022', value: '2022' },
  { title: '2023', value: '2023' },
  { title: '2024', value: '2024' },
];

const QuoteViewPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const quotes = useSelector(getCareyRateInquiry);
  const [inputInfo, setInputInfo] = useState(false);
  const [billingAddress, setBillingAddress] = useState({});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [cardType, setCardType] = useState('');
  const [cardNum, setCardNum] = useState('');
  const [cardName, setCardName] = useState('');
  const [expCVV, setExpCVV] = useState('');
  const [expMonth, setExpMonth] = useState('');
  const [expYear, setExpYear] = useState('');
  const [bookReservation, setBookReservation] = useState(false);
  const handleCloseNavigate = () => {
    dispatch(push('/transports'));
  };

  let quoteData = {};
  let geoLocation = [];
  let center = {};
  if (!isEmpty(quotes)) {
    quoteData = quotes.find((quote) => quote?.vehicleDetails?.vehicleCode === params.id);
    center = {
      lat: quoteData?.pickUpLoacation?.latitude,
      lng: quoteData?.pickUpLoacation?.longitude,
    };
    geoLocation = [
      {
        latitude: quoteData?.pickUpLoacation?.latitude,
        longitude: quoteData?.pickUpLoacation?.longitude,
      },
      {
        latitude: quoteData?.dropOffLocation?.latitude,
        longitude: quoteData?.dropOffLocation?.longitude,
      },
    ];
  }

  const handleCancel = () => {
    setInputInfo(false);
  };

  const handleBillingAddress = (locations) => {
    setBillingAddress(locations);
  };

  const handleBookReservation = () => {
    const payload = {
      passengerInfo: {
        firstName,
        lastName,
        phoneNum,
      },
      paymentInfo: {
        cardType,
        cardNum,
        cardName,
        expCVV,
        expDate: `${expMonth}/${expYear}`,
        billingAddress,
      },
      quoteInfo: quoteData,
    };
    dispatch(careyActions.bookReservation(payload));
  };

  useEffect(() => {
    if (
      firstName &&
      lastName &&
      phoneNum &&
      cardType &&
      cardNum &&
      cardName &&
      expCVV &&
      expMonth &&
      expYear &&
      !isEmpty(billingAddress)
    )
      setBookReservation(true);
    else setBookReservation(false);
  }, [firstName, lastName, phoneNum, cardType, cardNum, cardName, expCVV, expMonth, expYear, billingAddress]);

  return (
    <Page>
      {isEmpty(quotes) ? (
        <Modal
          title={<div className={styles.modalHeader}>Did you get quotes?</div>}
          visible={isEmpty(quotes)}
          onCancel={handleCloseNavigate}
          footer={[
            <Button size="large" halfWidth onClick={handleCloseNavigate}>
              OK
            </Button>,
          ]}
        >
          <p className={styles.modalBoldText}>Related Quotes are not existed, please get quotes again!</p>
        </Modal>
      ) : (
        <div className={styles.root}>
          <div className={styles.content}>
            <GoogleMap center={center} coords={geoLocation} />
            <div className={styles.detail}>
              <div className={styles.left}>
                <Row className={styles.row} gutter={2}>
                  <Col lg={6}>
                    <div className={styles.label}>No of Passengers</div>
                  </Col>
                  <Col lg={6}>
                    <Input disabled value={quoteData?.passengers} />
                  </Col>
                  <Col lg={6}>
                    <div className={styles.label}>No of Bags</div>
                  </Col>
                  <Col lg={6}>
                    <Input disabled value={quoteData?.bags} />
                  </Col>
                </Row>
                <Row className={styles.row}>
                  <Col lg={24}>
                    <div className={styles.title}>{quoteData?.vehicleDetails?.vehicleName}</div>
                  </Col>
                  <Col lg={24}>
                    <div>
                      <span>
                        Capacity: {quoteData?.vehicleDetails?.maxPassengers} passengers,{' '}
                        {quoteData?.vehicleDetails?.maxBags} Bags
                      </span>
                    </div>
                  </Col>
                </Row>
                <Row className={styles.row}>
                  <Col lg={24}>
                    <div>
                      {quoteData?.pickUpLoacation?.locationName} {quoteData?.pickUpLoacation?.addressLine}{' '}
                      {quoteData?.pickUpLoacation?.cityName} {quoteData?.pickUpLoacation?.postalCode}{' '}
                      {quoteData?.pickUpLoacation?.stateProv?.StateCode}{' '}
                      {quoteData?.pickUpLoacation?.countryName?.value}
                    </div>
                  </Col>
                </Row>
                <Row className={styles.row}>
                  <Col lg={24}>
                    <div>
                      {quoteData?.dropOffLocation?.locationName} {quoteData?.dropOffLocation?.addressLine}{' '}
                      {quoteData?.dropOffLocation?.cityName} {quoteData?.dropOffLocation?.postalCode}{' '}
                      {quoteData?.dropOffLocation?.stateProv?.StateCode}{' '}
                      {quoteData?.dropOffLocation?.countryName?.value}
                    </div>
                  </Col>
                </Row>
              </div>
              <div className={styles.right}>
                <Row className={styles.row}>
                  <Col lg={24}>
                    <div className="title">Quote Details</div>
                  </Col>
                  <Col lg={24}>
                    <Row>
                      <Col lg={12}>Est. drive time:</Col>
                      <Col lg={12}>{quoteData?.reference?.estimatedDistance}</Col>
                    </Row>
                    <Row>
                      <Col lg={12}>Est. distance:</Col>
                      <Col lg={12}>{quoteData?.reference?.estimatedTime}</Col>
                    </Row>
                    <Row>
                      <Col lg={12}>Billing method:</Col>
                      <Col lg={12}>{quoteData?.chargeDetails?.billingType}</Col>
                    </Row>
                    {quoteData?.chargeItems.map((chargeItem) => (
                      <Row>
                        <Col lg={12}>{chargeItem?.itemName}</Col>
                        <Col lg={12}>{chargeItem?.readBack}</Col>
                      </Row>
                    ))}
                    <Row>
                      <Col lg={12}>Estimated Quote:</Col>
                      <Col lg={12}>{quoteData?.chargeDetails?.readBack}</Col>
                    </Row>
                    <Row>
                      <Col lg={24}>{quoteData?.additional?.garageToGarageEstimate}</Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col lg={24}>
                    <Button onClick={() => setInputInfo(true)}>Enter Payment & Passenger Information</Button>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
          {inputInfo && (
            <Modal
              title={<div className={styles.modalHeader}>Input Payment & Passenger Information</div>}
              visible={inputInfo}
              onCancel={handleCancel}
              footer={false}
            >
              <div className={styles.modalContainer}>
                <div>Passenger Information:</div>
                <Row>
                  <Col lg={8}>
                    <Input placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                  </Col>
                  <Col lg={8}>
                    <Input placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                  </Col>
                  <Col lg={8}>
                    <Input placeholder="Phone Number" value={phoneNum} onChange={(e) => setPhoneNum(e.target.value)} />
                  </Col>
                </Row>
                <div>Payment Information:</div>
                <Row>
                  <Col lg={8}>
                    <div>
                      <div>Card Type</div>
                      <Select
                        options={cardOptions}
                        placeholder="Choose Card Type"
                        value={cardType}
                        onChange={setCardType}
                      />
                    </div>
                  </Col>
                  <Col lg={16}>
                    <div>
                      <div>Card Number</div>
                      <Input value={cardNum} onChange={(e) => setCardNum(e.target.value)} />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col lg={24}>
                    <div>Name on Card</div>
                    <Input value={cardName} onChange={(e) => setCardName(e.target.value)} />
                  </Col>
                </Row>
                <Row gutter={4}>
                  <Col lg={8}>
                    <div>Exp.Month</div>
                    <Select
                      options={expMonths}
                      placeholder="Exp.Month"
                      value={expMonth}
                      onChange={(value) => setExpMonth(value)}
                    />
                  </Col>
                  <Col lg={8}>
                    <div>Exp.Year</div>
                    <Select
                      options={expYears}
                      placeholder="Exp.Year"
                      value={expYear}
                      onChange={(value) => setExpYear(value)}
                    />
                  </Col>
                  <Col lg={8}>
                    <div>Exp.CVV</div>
                    <Input value={expCVV} onChange={(e) => setExpCVV(e.target.value)} />
                  </Col>
                </Row>
                <Row>
                  <Col lg={24}>
                    <div>Billing Address Information</div>
                    <PlaceAutoComplete onLocationChange={handleBillingAddress} />
                  </Col>
                </Row>
                <Row>
                  <Col lg={24}>
                    {bookReservation && <Button onClick={handleBookReservation}>Book Reservation</Button>}
                  </Col>
                </Row>
              </div>
            </Modal>
          )}
        </div>
      )}
    </Page>
  );
};

export default QuoteViewPage;
