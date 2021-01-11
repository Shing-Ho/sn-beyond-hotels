import React from 'react';
import { Row, Col, Button, Switch, DatePicker } from 'antd';
import cx from 'classnames';

import PaypalImg from 'icons/paypal-logo.png';
import AlipayImg from 'icons/alipay-logo.png';
import VenmoImg from 'icons/venmo-logo.png';
import WechatImg from 'icons/wechat-logo.png';
import ApplepayImg from 'icons/applepay-logo.png';
import ChaseImg from 'icons/chase-logo.png';
import { ReactComponent as TrashIcon } from 'icons/trash.svg';
import { ReactComponent as CalendarIcon } from 'icons/calendar.svg';

import Input from 'components/Input/Input';
import TimePicker from 'components/TimePicker/TimePicker';
import Select from 'components/Select/Select';
import { Steps, Step } from 'components/Steps/Steps';
import styles from './VenuesDetailsSteps.module.scss';

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

export default function VenuesDetailsSteps({ onCancel }) {
  const [currentStep, setCurrentStep] = React.useState(0);

  const handleStep = (step) => {
    if (step < 0 || step > 4) {
      onCancel();
    } else {
      setCurrentStep(step);
    }
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
            <div className={styles.input}>
              <Input
                placeholder="Describe Your Venue, Your Way"
                suffix={<div className={styles.suffix}>500 Word Limit</div>}
              />
            </div>
          </div>
        )}
        {currentStep === 1 && (
          <div className={styles.step2}>
            <h1>Add Venue Location</h1>
            <div className={styles.input}>
              <Input
                placeholder="Enter Venue Location"
                suffix={
                  <div className={styles.suffix}>
                    <i className="fa fa-search" />
                  </div>
                }
              />
            </div>
          </div>
        )}
        {currentStep === 2 && (
          <div className={styles.step3}>
            <h1>Add Venue Capacity</h1>
            <div className={styles.input}>
              <Input
                placeholder="Enter Venue Capacity"
                prefix={
                  <div className={styles.prefix}>
                    <i className="fa fa-user" />
                  </div>
                }
              />
            </div>
          </div>
        )}
        {currentStep === 3 && (
          <div className={styles.step4}>
            <h1>Select Forms of Payment Accepted</h1>
            <div className={styles.paymentForms}>
              <div className={cx(styles.paymentItem, styles.active)}>
                <div className={[styles.name, styles.center]}>CREDIT/DEBIT</div>
              </div>
              <div className={styles.paymentItem}>
                <img src={PaypalImg} alt="paypal" />
              </div>
              <div className={styles.paymentItem}>
                <img src={VenmoImg} alt="Venmo" />
              </div>
              <div className={styles.paymentItem}>
                <img src={ApplepayImg} alt="Apple Pay" />
              </div>
              <div className={styles.paymentItem}>
                <img src={ChaseImg} alt="Chase" />
              </div>
              <div className={styles.paymentItem}>
                <img src={WechatImg} alt="WeChat Pay" />
              </div>
              <div className={styles.paymentItem}>
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
                <span className={styles.selected}>Mon</span>
                <span className={styles.selected}>Tue</span>
                <span className={styles.selected}>Wed</span>
                <span className={styles.selected}>Thur</span>
                <span className={styles.selected}>Fir</span>
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
                      <TimePicker use12Hours variant="secondaryLight" format="h A" placeholder="- -" />
                    </div>
                  </Col>
                  <Col span={3}>
                    <div className={cx(styles.timePicker, styles.second)}>
                      <TimePicker use12Hours variant="secondaryLight" format="h A" placeholder="- -" />
                    </div>
                  </Col>
                  <Col span={3} offset={1}>
                    <div className={styles.timePicker}>
                      <TimePicker use12Hours variant="secondaryLight" format="h A" placeholder="- -" />
                    </div>
                  </Col>
                  <Col span={3}>
                    <div className={cx(styles.timePicker, styles.second)}>
                      <TimePicker use12Hours variant="secondaryLight" format="h A" placeholder="- -" />
                    </div>
                  </Col>
                  <Col span={2}>
                    <TrashIcon width={14} style={{ marginLeft: '10px' }} />
                  </Col>
                </Row>
                <Row className={styles.row}>
                  <Col span={6}>
                    <div>Tuesday</div>
                  </Col>
                  <Col span={3}>
                    <div className={styles.timePicker}>
                      <TimePicker use12Hours format="h A" placeholder="- -" />
                    </div>
                  </Col>
                  <Col span={3}>
                    <div className={cx(styles.timePicker, styles.second)}>
                      <TimePicker use12Hours variant="secondaryLight" format="h A" placeholder="- -" />
                    </div>
                  </Col>
                  <Col span={2} offset={1}>
                    <Button className={styles.addTimeBtn}>
                      <i className="fa fa-plus" aria-hidden="true" /> Add
                    </Button>
                  </Col>
                </Row>
                <Row className={styles.row}>
                  <Col span={6}>
                    <div>Wednesday</div>
                  </Col>
                  <Col span={3}>
                    <div className={styles.timePicker}>
                      <TimePicker use12Hours variant="secondaryLight" format="h A" placeholder="- -" />
                    </div>
                  </Col>
                  <Col span={3}>
                    <div className={cx(styles.timePicker, styles.second)}>
                      <TimePicker use12Hours variant="secondaryLight" format="h A" placeholder="- -" />
                    </div>
                  </Col>
                  <Col span={2} offset={1}>
                    <Button className={styles.addTimeBtn}>
                      <i className="fa fa-plus" aria-hidden="true" /> Add
                    </Button>
                  </Col>
                </Row>
                <Row className={styles.row}>
                  <Col span={6}>
                    <div>Thursday</div>
                  </Col>
                  <Col span={3}>
                    <div className={styles.timePicker}>
                      <TimePicker use12Hours variant="secondaryLight" format="h A" placeholder="- -" />
                    </div>
                  </Col>
                  <Col span={3}>
                    <div className={cx(styles.timePicker, styles.second)}>
                      <TimePicker use12Hours variant="secondaryLight" format="h A" placeholder="- -" />
                    </div>
                  </Col>
                  <Col span={2} offset={1}>
                    <Button className={styles.addTimeBtn}>
                      <i className="fa fa-plus" aria-hidden="true" /> Add
                    </Button>
                  </Col>
                </Row>
                <Row className={styles.row}>
                  <Col span={6}>
                    <div>Friday</div>
                  </Col>
                  <Col span={3}>
                    <div className={styles.timePicker}>
                      <TimePicker use12Hours variant="secondaryLight" format="h A" placeholder="- -" />
                    </div>
                  </Col>
                  <Col span={3}>
                    <div className={cx(styles.timePicker, styles.second)}>
                      <TimePicker use12Hours variant="secondaryLight" format="h A" placeholder="- -" />
                    </div>
                  </Col>
                  <Col span={2} offset={1}>
                    <Button className={styles.addTimeBtn}>
                      <i className="fa fa-plus" aria-hidden="true" /> Add
                    </Button>
                  </Col>
                </Row>
              </div>
            </div>
            <div className={styles.holidayHours}>
              <div className={styles.header}>
                <div>
                  <h3>Add Seasonal & Holiday Hours</h3>
                </div>
                <div className={styles.switch}>
                  YES <Switch defaultChecked />
                </div>
              </div>
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
                        <Select placeholder="Select Type" options={searchOptions} />
                      </div>
                    </Col>
                    <Col span={6}>
                      <div className={styles.select}>
                        <Select placeholder="Select or Enter Your Own" options={searchOptions} />
                      </div>
                    </Col>
                    <Col span={6}>
                      <div className={styles.date}>
                        <DatePicker
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
                        <TimePicker use12Hours variant="secondaryLight" format="h A" placeholder="- -" />
                      </div>
                      <div className={cx(styles.timePicker, styles.second)}>
                        <TimePicker use12Hours variant="secondaryLight" format="h A" placeholder="- -" />
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
            </div>
          </div>
        )}
      </div>
      <div className={styles.actions}>
        <Button className={[styles.btn, styles.cancel]} onClick={() => handleStep(currentStep - 1)}>
          {currentStep === 0 ? 'Cancel' : 'Back'}
        </Button>
        <Button className={[styles.btn, styles.continue]} onClick={() => handleStep(currentStep + 1)}>
          {currentStep === 4 ? 'Finish' : 'Continue'}
        </Button>
      </div>
    </div>
  );
}
