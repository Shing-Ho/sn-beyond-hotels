import React, { useMemo, useRef, useState } from 'react';
import { Row, Col, Button, Switch, DatePicker, Input } from 'antd';
import cx from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import PaypalImg from 'icons/paypal-logo.png';
import AlipayImg from 'icons/alipay-logo.png';
import VenmoImg from 'icons/venmo-logo.png';
import WechatImg from 'icons/wechat-logo.png';
import ApplepayImg from 'icons/applepay-logo.png';
import ChaseImg from 'icons/chase-logo.png';
import { ReactComponent as TrashIcon } from 'icons/trash.svg';
import { ReactComponent as CalendarIcon } from 'icons/calendar.svg';

import TimePicker from 'components/TimePicker/TimePicker';
import Select from 'components/Select/Select';
import { Steps, Step } from 'components/Steps/Steps';
import * as moment from 'moment';
import { isNumber } from '../../../../helpers/helperMethods';
import bookingActions from '../../../../store/booking/actions';
import { getVenueDetails } from '../../../../store/booking/selectors';
import Complete from '../../../../components/AutoComlete/AutoComplete';
import styles from './VenuesDetailsSteps.module.scss';

const { TextArea } = Input;
const steps = [
  {
    step: 1,
    title: 'Description',
  },
  {
    step: 2,
    title: 'Location',
  },
  {
    step: 3,
    title: 'Capacity',
  },
  {
    step: 4,
    title: 'Payment',
  },
  {
    step: 5,
    title: 'Hours',
  },
];

const searchOptions = [
  {
    title: 'Tag',
    value: 'tag',
  },
  {
    title: 'LongTag',
    value: 'longtag',
  },
];

const initialState = {
  location: {
    location_id: '5128581',
    location_name: 'New York City',
    iso_country_code: 'USA',
  },
};

export default function VenuesDetailsSteps({ onCancel }) {
  const [venueDetails, setVenueDetails] = useState({
    days: { mon: true, tue: true, wed: true, thu: true, fri: true },
    paymentMethod: {
      credit: true,
    },
    addSeasonal: false,
    seasonalDetails: {
      holiday: null,
      date: null,
      specialDay: null,
      multipleDays: false,
      open: null,
      close: null,
      reOpen: null,
      reClose: null,
    },
    reOpen: { mon: true, tue: false, wed: false, thu: false, fri: false },
    hoursOpen: {
      mon: { open: null, close: null, reOpen: null, reClose: null },
      tue: { open: null, close: null },
      wed: { open: null, close: null },
      thu: { open: null, close: null },
      fri: { open: null, close: null },
    },
    description: null,
    location: { ...initialState.location },
    venueCapacity: null,
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState({ description: false, venueCapacity: false, location: false });
  const data = useSelector(getVenueDetails);
  const locCache = useRef(initialState.location);
  const dispatch = useDispatch();

  useMemo(() => {
    if (data) {
      setVenueDetails(data);
    }
  }, [data]);

  const handleStep = (step, isBack) => {
    if (!isBack) {
      if (currentStep === 0 && !venueDetails.description) {
        setError({
          ...error,
          description: true,
        });
        return;
      }
      if (currentStep === 1 && Object.keys(venueDetails.location).length === 0) {
        setError({
          ...error,
          location: true,
        });
        return;
      }
      if (currentStep === 2 && !venueDetails.venueCapacity) {
        setError({
          ...error,
          venueCapacity: true,
        });
        return;
      }
    }
    dispatch(bookingActions.setVenueDetails(venueDetails));
    if (step < 0 || step > 4) {
      onCancel();
      setCurrentStep(0);
    } else {
      setCurrentStep(step);
    }
  };

  const handleChange = (e, type = null, name = null) => {
    if (typeof e === 'object' && e.target.name === 'venueCapacity') {
      const { value } = e.target;
      if (isNumber(value) || value === '') {
        setVenueDetails({ ...venueDetails, [e.target.name]: e.target.value });
      }
    } else if (typeof e === 'string') {
      if (type === 'reOpen') {
        setVenueDetails({
          ...venueDetails,
          [type]: { ...venueDetails[type], [e]: !venueDetails[type][e] },
          hoursOpen: { ...venueDetails.hoursOpen, [e]: { open: null, close: null, reOpen: null, reClose: null } },
        });
      } else if (type === 'seasonalDetails') {
        setVenueDetails({ ...venueDetails, [type]: { ...venueDetails.seasonalDetails, [name]: e } });
      } else if (type === 'paymentMethod') {
        setVenueDetails({ ...venueDetails, [type]: { [e]: !venueDetails[type][e] } });
      } else {
        setVenueDetails({ ...venueDetails, [type]: { ...venueDetails[type], [e]: !venueDetails[type][e] } });
      }
    } else if (type === 'addSeasonal') {
      setVenueDetails({ ...venueDetails, [type]: e });
    } else {
      setVenueDetails({ ...venueDetails, [e.target.name]: e.target.value });
    }
  };

  const handleTime = (name = null, e, type = null) => {
    if (type === 'seasonalDetails') {
      if (name === 'date') {
        setVenueDetails({
          ...venueDetails,
          [type]: { ...venueDetails.seasonalDetails, [name]: moment(e).format('YYYY/MM/DD') },
        });
      } else {
        setVenueDetails({
          ...venueDetails,
          [type]: { ...venueDetails.seasonalDetails, [name]: moment(e).format('LT') },
        });
      }
    } else {
      setVenueDetails({
        ...venueDetails,
        hoursOpen: {
          ...venueDetails.hoursOpen,
          [type]: { ...venueDetails.hoursOpen[type], [name]: moment(e).format('LT') },
        },
      });
    }
  };

  const onSelect = (location) => {
    setVenueDetails({ ...venueDetails, location });
  };

  const clearData = () => {
    if (venueDetails.location?.location_id) {
      locCache.current = venueDetails.location || initialState.location;
    }
    setVenueDetails({ ...venueDetails, location: {} });
  };

  const handleBlur = (type) => () => {
    if (type === 'location' && Object.keys(venueDetails.location).length === 0) {
      setError({
        ...error,
        [type]: true,
      });
      return;
    }
    if (!venueDetails[type]) {
      setError({
        ...error,
        [type]: true,
      });
      return;
    }
    setError({
      ...error,
      [type]: false,
    });
  };

  return (
    <div className={styles.venuesDetailsSteps}>
      <div className={styles.stepsContainer}>
        <Steps current={currentStep} venuesMode labelPlacement="vertical">
          {steps.map((item) => (
            <Step key={item.title} title={item.title} icon={<div>{item.step}</div>} />
          ))}
        </Steps>
      </div>
      <div className={styles.content}>
        {currentStep === 0 && (
          <div className={styles.step1}>
            <h1>Add Venue Description</h1>
            <div className={cx(styles.input, { [styles.error]: error.description === true })}>
              <TextArea
                name="description"
                placeholder="Describe Your Venue, Your Way"
                suffix="500 Word Limit"
                maxLength={500}
                showCount
                value={venueDetails.description}
                onChange={(e) => handleChange(e)}
                onBlur={handleBlur('description')}
              />
            </div>
          </div>
        )}
        {currentStep === 1 && (
          <div className={styles.step2}>
            <h1>Add Venue Location</h1>
            <div className={styles.input}>
              <div
                className={cx('itemWrapper', 'autoCompleteWrapper', styles.autoCompleteWrapper, styles.itemWrapper, {
                  [styles.locationError]: error.location === true,
                })}
              >
                <Complete
                  value={venueDetails.location}
                  onSelect={onSelect}
                  clearData={() => clearData()}
                  onBlur={handleBlur('location')}
                />
                <div className={styles.suffix}>
                  <i className="fa fa-search" />
                </div>
              </div>
            </div>
          </div>
        )}
        {currentStep === 2 && (
          <div className={styles.step3}>
            <h1>Add Venue Capacity</h1>
            <div className={cx(styles.input, { [styles.error]: error.venueCapacity === true })}>
              <Input
                name="venueCapacity"
                placeholder="Enter Venue Capacity"
                prefix={
                  <div className={styles.prefix}>
                    <i className="fa fa-user" />
                  </div>
                }
                value={venueDetails.venueCapacity}
                onChange={(e) => handleChange(e)}
                onBlur={handleBlur('venueCapacity')}
              />
            </div>
          </div>
        )}
        {currentStep === 3 && (
          <div className={styles.step4}>
            <h1>Select Forms of Payment Accepted</h1>
            <div className={styles.paymentForms}>
              <div
                onClick={() => handleChange('credit', 'paymentMethod')}
                className={`${
                  venueDetails.paymentMethod.credit ? cx(styles.paymentItem, styles.active) : styles.paymentItem
                }`}
              >
                <div className={[styles.name, styles.center]}>CREDIT/DEBIT</div>
              </div>
              <div
                onClick={() => handleChange('payPal', 'paymentMethod')}
                className={`${
                  venueDetails.paymentMethod.payPal ? cx(styles.paymentItem, styles.active) : styles.paymentItem
                }`}
              >
                <img src={PaypalImg} alt="paypal" />
              </div>
              <div
                onClick={() => handleChange('venmo', 'paymentMethod')}
                className={`${
                  venueDetails.paymentMethod.venmo ? cx(styles.paymentItem, styles.active) : styles.paymentItem
                }`}
              >
                <img src={VenmoImg} alt="Venmo" />
              </div>
              <div
                onClick={() => handleChange('applePay', 'paymentMethod')}
                className={`${
                  venueDetails.paymentMethod.applePay ? cx(styles.paymentItem, styles.active) : styles.paymentItem
                }`}
              >
                <img src={ApplepayImg} alt="Apple Pay" />
              </div>
              <div
                onClick={() => handleChange('chase', 'paymentMethod')}
                className={`${
                  venueDetails.paymentMethod.chase ? cx(styles.paymentItem, styles.active) : styles.paymentItem
                }`}
              >
                <img src={ChaseImg} alt="Chase" />
              </div>
              <div
                onClick={() => handleChange('weChatPay', 'paymentMethod')}
                className={`${
                  venueDetails.paymentMethod.weChatPay ? cx(styles.paymentItem, styles.active) : styles.paymentItem
                }`}
              >
                <img src={WechatImg} alt="WeChat Pay" />
              </div>
              <div
                onClick={() => handleChange('aliPay', 'paymentMethod')}
                className={`${
                  venueDetails.paymentMethod.aliPay ? cx(styles.paymentItem, styles.active) : styles.paymentItem
                }`}
              >
                <img src={AlipayImg} alt="Alipay" />
              </div>
              <div className={styles.paymentItem}>
                <div className={styles.name}>NAME OF NEW</div>
                <div className={styles.icon}>
                  <TrashIcon width={12} />
                </div>
              </div>
            </div>
            <Button className={styles.addBtn}>
              <i className="fa fa-plus" aria-hidden="true" /> Add New Form Of Payment
            </Button>
          </div>
        )}
        {currentStep === 4 && (
          <div className={styles.step5}>
            <h1>Add Days & Hours of Operation</h1>
            <div className={styles.openDays}>
              <h3>Select Open Days</h3>
              <div className={styles.days}>
                <span>Sun</span>
                <span
                  className={`${venueDetails.days.mon ? styles.selected : ''}`}
                  onClick={() => handleChange('mon', 'days')}
                >
                  Mon
                </span>
                <span
                  className={`${venueDetails.days.tue ? styles.selected : ''}`}
                  onClick={() => handleChange('tue', 'days')}
                >
                  Tue
                </span>
                <span
                  className={`${venueDetails.days.wed ? styles.selected : ''}`}
                  onClick={() => handleChange('wed', 'days')}
                >
                  Wed
                </span>
                <span
                  className={`${venueDetails.days.thu ? styles.selected : ''}`}
                  onClick={() => handleChange('thu', 'days')}
                >
                  Thu
                </span>
                <span
                  className={`${venueDetails.days.fri ? styles.selected : ''}`}
                  onClick={() => handleChange('fri', 'days')}
                >
                  Fri
                </span>
                <span>Sat</span>
              </div>
            </div>
            <div className={styles.openHours}>
              <div className={styles.header}>
                <div>
                  <h3>Select Open Days</h3>
                </div>
                <div className={styles.switch}>
                  SAME HOURS EACH DAY <Switch defaultChecked />
                </div>
              </div>
              <div className={styles.hours}>
                <Row>
                  <Col span={6}>
                    <div className={styles.label}>Hours Open</div>
                  </Col>
                  <Col span={3}>
                    <div className={styles.label}>Open</div>
                  </Col>
                  <Col span={3}>
                    <div className={styles.label}>Close</div>
                  </Col>
                  <Col span={3} offset={1}>
                    <div className={styles.label}>Re-Open</div>
                  </Col>
                  <Col span={3}>
                    <div className={styles.label}>Close</div>
                  </Col>
                </Row>
                <Row className={styles.row}>
                  <Col span={6}>
                    <div>Monday</div>
                  </Col>
                  <Col span={3}>
                    <div className={styles.timePicker}>
                      <TimePicker
                        onChange={(e) => handleTime('open', e, 'mon')}
                        value={venueDetails.hoursOpen.mon?.open && moment(venueDetails.hoursOpen.mon.open, 'LT a')}
                        use12Hours
                        variant="secondaryLight"
                        format="h A"
                        placeholder="- -"
                      />
                    </div>
                  </Col>
                  <Col span={3}>
                    <div className={cx(styles.timePicker, styles.second)}>
                      <TimePicker
                        onChange={(e) => handleTime('close', e, 'mon')}
                        value={venueDetails.hoursOpen.mon?.close && moment(venueDetails.hoursOpen.mon.close, 'LT a')}
                        use12Hours
                        variant="secondaryLight"
                        format="h A"
                        placeholder="- -"
                      />
                    </div>
                  </Col>
                  {venueDetails.reOpen.mon && (
                    <>
                      <Col span={3} offset={1}>
                        <div className={styles.timePicker}>
                          <TimePicker
                            onChange={(e) => handleTime('reOpen', e, 'mon')}
                            value={
                              venueDetails.hoursOpen.mon?.reOpen && moment(venueDetails.hoursOpen.mon.reOpen, 'LT a')
                            }
                            use12Hours
                            variant="secondaryLight"
                            format="h A"
                            placeholder="- -"
                          />
                        </div>
                      </Col>
                      <Col span={3}>
                        <div className={cx(styles.timePicker, styles.second)}>
                          <TimePicker
                            onChange={(e) => handleTime('reClose', e, 'mon')}
                            value={
                              venueDetails.hoursOpen.mon?.reClose && moment(venueDetails.hoursOpen.mon.reClose, 'LT a')
                            }
                            use12Hours
                            variant="secondaryLight"
                            format="h A"
                            placeholder="- -"
                          />
                        </div>
                      </Col>
                      <Col span={2}>
                        <TrashIcon
                          width={14}
                          style={{ marginLeft: '10px' }}
                          onClick={() => handleChange('mon', 'reOpen')}
                        />
                      </Col>
                    </>
                  )}
                  {!venueDetails.reOpen.mon && (
                    <Col span={2} offset={1}>
                      <Button className={styles.addTimeBtn} onClick={() => handleChange('mon', 'reOpen')}>
                        <i className="fa fa-plus" aria-hidden="true" /> Add
                      </Button>
                    </Col>
                  )}
                </Row>
                <Row className={styles.row}>
                  <Col span={6}>
                    <div>Tuesday</div>
                  </Col>
                  <Col span={3}>
                    <div className={styles.timePicker}>
                      <TimePicker
                        value={venueDetails.hoursOpen.tue?.open && moment(venueDetails.hoursOpen.tue.open, 'LT a')}
                        onChange={(e) => handleTime('open', e, 'tue')}
                        use12Hours
                        format="h A"
                        placeholder="- -"
                      />
                    </div>
                  </Col>
                  <Col span={3}>
                    <div className={cx(styles.timePicker, styles.second)}>
                      <TimePicker
                        value={venueDetails.hoursOpen.tue?.close && moment(venueDetails.hoursOpen.tue.close, 'LT a')}
                        onChange={(e) => handleTime('close', e, 'tue')}
                        use12Hours
                        variant="secondaryLight"
                        format="h A"
                        placeholder="- -"
                      />
                    </div>
                  </Col>
                  {venueDetails.reOpen.tue && (
                    <>
                      <Col span={3} offset={1}>
                        <div className={styles.timePicker}>
                          <TimePicker
                            value={
                              venueDetails.hoursOpen.tue?.reOpen && moment(venueDetails.hoursOpen.tue.reOpen, 'LT a')
                            }
                            onChange={(e) => handleTime('reOpen', e, 'tue')}
                            use12Hours
                            variant="secondaryLight"
                            format="h A"
                            placeholder="- -"
                          />
                        </div>
                      </Col>
                      <Col span={3}>
                        <div className={cx(styles.timePicker, styles.second)}>
                          <TimePicker
                            value={
                              venueDetails.hoursOpen.tue?.reClose && moment(venueDetails.hoursOpen.tue.reClose, 'LT a')
                            }
                            onChange={(e) => handleTime('reClose', e, 'tue')}
                            use12Hours
                            variant="secondaryLight"
                            format="h A"
                            placeholder="- -"
                          />
                        </div>
                      </Col>
                      <Col span={2}>
                        <TrashIcon
                          width={14}
                          style={{ marginLeft: '10px' }}
                          onClick={() => handleChange('tue', 'reOpen')}
                        />
                      </Col>
                    </>
                  )}
                  {!venueDetails.reOpen.tue && (
                    <Col span={2} offset={1}>
                      <Button className={styles.addTimeBtn} onClick={() => handleChange('tue', 'reOpen')}>
                        <i className="fa fa-plus" aria-hidden="true" /> Add
                      </Button>
                    </Col>
                  )}
                </Row>
                <Row className={styles.row}>
                  <Col span={6}>
                    <div>Wednesday</div>
                  </Col>
                  <Col span={3}>
                    <div className={styles.timePicker}>
                      <TimePicker
                        value={venueDetails.hoursOpen.wed?.open && moment(venueDetails.hoursOpen.wed.open, 'LT a')}
                        onChange={(e) => handleTime('open', e, 'wed')}
                        use12Hours
                        variant="secondaryLight"
                        format="h A"
                        placeholder="- -"
                      />
                    </div>
                  </Col>
                  <Col span={3}>
                    <div className={cx(styles.timePicker, styles.second)}>
                      <TimePicker
                        value={venueDetails.hoursOpen.wed?.close && moment(venueDetails.hoursOpen.wed.close, 'LT a')}
                        onChange={(e) => handleTime('close', e, 'wed')}
                        use12Hours
                        variant="secondaryLight"
                        format="h A"
                        placeholder="- -"
                      />
                    </div>
                  </Col>
                  {venueDetails.reOpen.wed && (
                    <>
                      <Col span={3} offset={1}>
                        <div className={styles.timePicker}>
                          <TimePicker
                            value={
                              venueDetails.hoursOpen.wed?.reOpen && moment(venueDetails.hoursOpen.wed.reOpen, 'LT a')
                            }
                            onChange={(e) => handleTime('reOpen', e, 'wed')}
                            use12Hours
                            variant="secondaryLight"
                            format="h A"
                            placeholder="- -"
                          />
                        </div>
                      </Col>
                      <Col span={3}>
                        <div className={cx(styles.timePicker, styles.second)}>
                          <TimePicker
                            value={
                              venueDetails.hoursOpen.wed?.reClose && moment(venueDetails.hoursOpen.wed.reClose, 'LT a')
                            }
                            onChange={(e) => handleTime('reClose', e, 'wed')}
                            use12Hours
                            variant="secondaryLight"
                            format="h A"
                            placeholder="- -"
                          />
                        </div>
                      </Col>
                      <Col span={2}>
                        <TrashIcon
                          width={14}
                          style={{ marginLeft: '10px' }}
                          onClick={() => handleChange('wed', 'reOpen')}
                        />
                      </Col>
                    </>
                  )}
                  {!venueDetails.reOpen.wed && (
                    <Col span={2} offset={1}>
                      <Button className={styles.addTimeBtn} onClick={() => handleChange('wed', 'reOpen')}>
                        <i className="fa fa-plus" aria-hidden="true" /> Add
                      </Button>
                    </Col>
                  )}
                </Row>
                <Row className={styles.row}>
                  <Col span={6}>
                    <div>Thursday</div>
                  </Col>
                  <Col span={3}>
                    <div className={styles.timePicker}>
                      <TimePicker
                        value={venueDetails.hoursOpen.thu?.open && moment(venueDetails.hoursOpen.thu.open, 'LT a')}
                        onChange={(e) => handleTime('open', e, 'thu')}
                        use12Hours
                        variant="secondaryLight"
                        format="h A"
                        placeholder="- -"
                      />
                    </div>
                  </Col>
                  <Col span={3}>
                    <div className={cx(styles.timePicker, styles.second)}>
                      <TimePicker
                        value={venueDetails.hoursOpen.thu?.close && moment(venueDetails.hoursOpen.thu.close, 'LT a')}
                        onChange={(e) => handleTime('close', e, 'thu')}
                        use12Hours
                        variant="secondaryLight"
                        format="h A"
                        placeholder="- -"
                      />
                    </div>
                  </Col>
                  {venueDetails.reOpen.thu && (
                    <>
                      <Col span={3} offset={1}>
                        <div className={styles.timePicker}>
                          <TimePicker
                            value={
                              venueDetails.hoursOpen.thu?.reOpen && moment(venueDetails.hoursOpen.thu.reOpen, 'LT a')
                            }
                            onChange={(e) => handleTime('reOpen', e, 'thu')}
                            use12Hours
                            variant="secondaryLight"
                            format="h A"
                            placeholder="- -"
                          />
                        </div>
                      </Col>
                      <Col span={3}>
                        <div className={cx(styles.timePicker, styles.second)}>
                          <TimePicker
                            value={
                              venueDetails.hoursOpen.thu?.reClose && moment(venueDetails.hoursOpen.thu.reClose, 'LT a')
                            }
                            onChange={(e) => handleTime('reClose', e, 'thu')}
                            use12Hours
                            variant="secondaryLight"
                            format="h A"
                            placeholder="- -"
                          />
                        </div>
                      </Col>
                      <Col span={2}>
                        <TrashIcon
                          width={14}
                          style={{ marginLeft: '10px' }}
                          onClick={() => handleChange('thu', 'reOpen')}
                        />
                      </Col>
                    </>
                  )}
                  {!venueDetails.reOpen.thu && (
                    <Col span={2} offset={1}>
                      <Button className={styles.addTimeBtn} onClick={() => handleChange('thu', 'reOpen')}>
                        <i className="fa fa-plus" aria-hidden="true" /> Add
                      </Button>
                    </Col>
                  )}
                </Row>
                <Row className={styles.row}>
                  <Col span={6}>
                    <div>Friday</div>
                  </Col>
                  <Col span={3}>
                    <div className={styles.timePicker}>
                      <TimePicker
                        value={venueDetails.hoursOpen.fri?.open && moment(venueDetails.hoursOpen.fri.open, 'LT a')}
                        onChange={(e) => handleTime('open', e, 'fri')}
                        use12Hours
                        variant="secondaryLight"
                        format="h A"
                        placeholder="- -"
                      />
                    </div>
                  </Col>
                  <Col span={3}>
                    <div className={cx(styles.timePicker, styles.second)}>
                      <TimePicker
                        value={venueDetails.hoursOpen.fri?.close && moment(venueDetails.hoursOpen.fri.close, 'LT a')}
                        onChange={(e) => handleTime('close', e, 'fri')}
                        use12Hours
                        variant="secondaryLight"
                        format="h A"
                        placeholder="- -"
                      />
                    </div>
                  </Col>
                  {venueDetails.reOpen.fri && (
                    <>
                      <Col span={3} offset={1}>
                        <div className={styles.timePicker}>
                          <TimePicker
                            value={
                              venueDetails.hoursOpen.fri?.reOpen && moment(venueDetails.hoursOpen.fri.reOpen, 'LT a')
                            }
                            onChange={(e) => handleTime('reOpen', e, 'fri')}
                            use12Hours
                            variant="secondaryLight"
                            format="h A"
                            placeholder="- -"
                          />
                        </div>
                      </Col>
                      <Col span={3}>
                        <div className={cx(styles.timePicker, styles.second)}>
                          <TimePicker
                            value={
                              venueDetails.hoursOpen.fri?.reClose && moment(venueDetails.hoursOpen.fri.reClose, 'LT a')
                            }
                            onChange={(e) => handleTime('reClose', e, 'fri')}
                            use12Hours
                            variant="secondaryLight"
                            format="h A"
                            placeholder="- -"
                          />
                        </div>
                      </Col>
                      <Col span={2}>
                        <TrashIcon
                          width={14}
                          style={{ marginLeft: '10px' }}
                          onClick={() => handleChange('fri', 'reOpen')}
                        />
                      </Col>
                    </>
                  )}
                  {!venueDetails.reOpen.fri && (
                    <Col span={2} offset={1}>
                      <Button className={styles.addTimeBtn} onClick={() => handleChange('fri', 'reOpen')}>
                        <i className="fa fa-plus" aria-hidden="true" /> Add
                      </Button>
                    </Col>
                  )}
                </Row>
              </div>
            </div>
            <div className={styles.holidayHours}>
              <div className={styles.header}>
                <div>
                  <h3>Add Seasonal & Holiday Hours</h3>
                </div>
                <div className={styles.switch}>
                  {venueDetails.addSeasonal ? 'Yes' : 'No'}{' '}
                  <Switch onChange={(e) => handleChange(e, 'addSeasonal')} defaultChecked={venueDetails.addSeasonal} />
                </div>
              </div>
              {venueDetails.addSeasonal && (
                <>
                  <div className={styles.holidayItem}>
                    <div className={styles.holiday}>
                      <Row className={styles.row}>
                        <Col span={6}>
                          <div className={styles.label}>Holiday Or Season</div>
                        </Col>
                        <Col span={6}>
                          <div className={styles.label}>Name Of Special Day</div>
                        </Col>
                        <Col span={6}>
                          <div className={styles.label}>Date</div>
                        </Col>
                        <Col span={6}>
                          <div className={styles.label}>Multiple Days</div>
                        </Col>
                      </Row>
                      <Row className={styles.row}>
                        <Col span={6}>
                          <div className={styles.select}>
                            <Select
                              onChange={(e) => {
                                handleChange(e, 'seasonalDetails', 'holiday');
                              }}
                              defaultValue={venueDetails.seasonalDetails.holiday}
                              placeholder="Select Type"
                              options={searchOptions}
                            />
                          </div>
                        </Col>
                        <Col span={6}>
                          <div className={styles.select}>
                            <Select
                              onChange={(e) => {
                                handleChange(e, 'seasonalDetails', 'specialDay');
                              }}
                              defaultValue={venueDetails.seasonalDetails.specialDay}
                              placeholder="Select or Enter Your Own"
                              options={searchOptions}
                            />
                          </div>
                        </Col>
                        <Col span={6}>
                          <div className={styles.date}>
                            <DatePicker
                              onChange={(e) => handleTime('date', e, 'seasonalDetails')}
                              defaultValue={
                                venueDetails.seasonalDetails?.date &&
                                moment(venueDetails.seasonalDetails.date, 'YYYY/MM/DD')
                              }
                              placeholder="- -"
                              suffixIcon={<CalendarIcon className="calendarIcon" width={16} />}
                            />
                          </div>
                        </Col>
                        <Col span={6}>
                          <div className={styles.switch}>
                            <Switch />
                          </div>
                        </Col>
                      </Row>
                      <Row className={styles.row}>
                        <Col span={3}>
                          <div className={styles.label}>Open</div>
                        </Col>
                        <Col span={3}>
                          <div className={styles.label}>Close</div>
                        </Col>
                        <Col span={6}>
                          <div className={styles.label}>Add Re-opening Times</div>
                        </Col>
                      </Row>
                      <Row className={styles.row}>
                        <Col span={6} className={styles.time}>
                          <div className={styles.timePicker}>
                            <TimePicker
                              onChange={(e) => handleTime('open', e, 'seasonalDetails')}
                              value={
                                venueDetails.seasonalDetails?.open && moment(venueDetails.seasonalDetails.open, 'LT a')
                              }
                              use12Hours
                              format="h A"
                              placeholder="- -"
                            />
                          </div>
                          <div className={cx(styles.timePicker, styles.second)}>
                            <TimePicker
                              onChange={(e) => handleTime('close', e, 'seasonalDetails')}
                              value={
                                venueDetails.seasonalDetails?.close &&
                                moment(venueDetails.seasonalDetails.close, 'LT a')
                              }
                              use12Hours
                              format="h A"
                              placeholder="- -"
                            />
                          </div>
                        </Col>
                        <Col span={3}>
                          <Button className={styles.addTimeBtn}>
                            <i className="fa fa-plus" aria-hidden="true" /> Add
                          </Button>
                        </Col>
                      </Row>
                    </div>
                    <div className={styles.action}>
                      <TrashIcon width={24} height={24} />
                    </div>
                  </div>
                  <Button className={styles.addBtn}>
                    <i className="fa fa-plus" aria-hidden="true" /> Add Another Season or Holiday
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      <div className={styles.actions}>
        <Button className={[styles.btn, styles.cancel]} onClick={() => handleStep(currentStep - 1, 'back')}>
          {currentStep === 0 ? 'Cancel' : 'Back'}
        </Button>
        <Button className={[styles.btn, styles.continue]} onClick={() => handleStep(currentStep + 1)}>
          {currentStep === 4 ? 'Finish' : 'Continue'}
        </Button>
      </div>
    </div>
  );
}
