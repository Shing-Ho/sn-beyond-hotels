import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { push } from 'connected-react-router';
import { isEmpty } from 'lodash';
import { Button, Modal, Row, Col, Input } from 'antd';

import { getCareyRateInquiry } from 'store/carey/selectors';

import Page from 'components/Page/Page';
import GoogleMap from 'components/GoogleMap/GoogleMap';
import PlaceAutoComplete from 'components/PlaceAutoComplete/PlaceAutoComplete';
import styles from './QuoteViewPage.module.scss';

const QuoteViewPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const quotes = useSelector(getCareyRateInquiry);

  const [inputInfo, setInputInfo] = useState(false);
  const handleModalClose = () => {
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

  return (
    <Page>
      {isEmpty(quotes) ? (
        <Modal
          title={<div className={styles.modalHeader}>Did you get quotes?</div>}
          onCancel={handleModalClose}
          footer={[
            <Button size="large" halfWidth onClick={handleModalClose}>
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
                    <Input placeholder="First Name" />
                  </Col>
                  <Col lg={8}>
                    <Input placeholder="Last Name" />
                  </Col>
                  <Col lg={8}>
                    <Input placeholder="Phone Number" />
                  </Col>
                </Row>
                <div>Payment Information:</div>
                <Row>
                  <Col lg={8}>
                    <div>Card Type</div>
                  </Col>
                  <Col lg={16}>
                    <div>Card Number</div>
                  </Col>
                </Row>
                <Row>
                  <Col lg={8}>
                    <div>Card Type</div>
                  </Col>
                  <Col lg={16}>
                    <div>Card Number</div>
                  </Col>
                </Row>
                <Row>
                  <Col lg={24}>
                    <div>Name on Card</div>
                  </Col>
                </Row>
                <Row>
                  <Col lg={24}>
                    <div>Name on Card</div>
                  </Col>
                </Row>
                <Row gutter={3}>
                  <Col lg={8}>Exp.Month</Col>
                  <Col lg={8}>Exp.Year</Col>
                  <Col lg={8}>Exp.CVV</Col>
                </Row>
                <Row gutter={3}>
                  <Col lg={8}>Exp.Month</Col>
                  <Col lg={8}>Exp.Year</Col>
                  <Col lg={8}>Exp.CVV</Col>
                </Row>
                <Row>
                  <PlaceAutoComplete />
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
