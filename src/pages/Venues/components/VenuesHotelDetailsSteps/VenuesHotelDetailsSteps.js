import React from 'react';
import { Row, Col, Button, Switch, DatePicker, Input } from 'antd';
import cx from 'classnames';

import { ReactComponent as TrashIcon } from 'icons/trash.svg';
import { ReactComponent as CalendarIcon } from 'icons/calendar.svg';

import TimePicker from 'components/TimePicker/TimePicker';
import Select from 'components/Select/Select';
import { Steps, Step } from 'components/Steps/Steps';

import VenuesPaymentForms from '../VenuesPaymentForms/VenuesPaymentForms';
import styles from './VenuesHotelDetailsSteps.module.scss';
import { isNumber } from '../../../../helpers/helperMethods';

const { TextArea } = Input;
const steps = [
  {
    step: 1,
    title: 'General',
  },
  {
    step: 2,
    title: 'Description',
  },
  {
    step: 3,
    title: 'Room Type',
  },
  {
    step: 4,
    title: 'Price',
  },
  {
    step: 5,
    title: 'Photos',
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
  const [venueCapacity, setVenueCapacity] = React.useState(null);
  const [days, setDays] = React.useState({
    mon: true,
    tue: true,
    wed: true,
    thu: true,
    fri: true,
  });
  const [reOpen, setReOpen] = React.useState({
    mon: true,
    tue: false,
    wed: false,
    thu: false,
    fri: false,
  });

  const handleStep = (step) => {
    if (step < 0 || step > 4) {
      onCancel();
      setCurrentStep(0);
    } else {
      setCurrentStep(step);
    }
  };

  const handleNumber = (e) => {
    const { value } = e.target;
    if (isNumber(value) || value === '') {
      setVenueCapacity(value);
    }
  };

  const selectDays = (name) => {
    setDays({ ...days, [name]: !days[name] });
  };

  const addReOpenTimings = (name) => {
    setReOpen({ ...reOpen, [name]: !reOpen[name] });
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
              <TextArea
                placeholder="Describe Your Venue, Your Way"
                suffix="500 Word Limit"
                autoSize
                maxLength={500}
                showCount
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
            <h1>Add Room Type Details</h1>
            <div className={styles.input}>
              <Input
                onChange={(e) => handleNumber(e)}
                value={venueCapacity}
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
            <VenuesPaymentForms />
            {/* <Button className={styles.addBtn}>
              <i className="fa fa-plus" aria-hidden="true" /> Add New Form Of Payment
            </Button> */}
          </div>
        )}
        {currentStep === 4 && (
          <div className={styles.step5}>
            <h1>Add Days & Hours of Operation</h1>
            <div className={styles.openDays}>
              <h3>Select Open Days</h3>
              <div className={styles.days}>
                <span>Sun</span>
                <span className={`${days.mon ? styles.selected : ''}`} onClick={() => selectDays('mon')}>
                  Mon
                </span>
                <span className={`${days.tue ? styles.selected : ''}`} onClick={() => selectDays('tue')}>
                  Tue
                </span>
                <span className={`${days.wed ? styles.selected : ''}`} onClick={() => selectDays('wed')}>
                  Wed
                </span>
                <span className={`${days.thu ? styles.selected : ''}`} onClick={() => selectDays('thu')}>
                  Thu
                </span>
                <span className={`${days.fri ? styles.selected : ''}`} onClick={() => selectDays('fri')}>
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
                      <TimePicker use12Hours variant="secondaryLight" format="h A" placeholder="- -" />
                    </div>
                  </Col>
                  <Col span={3}>
                    <div className={cx(styles.timePicker, styles.second)}>
                      <TimePicker use12Hours variant="secondaryLight" format="h A" placeholder="- -" />
                    </div>
                  </Col>
                  {reOpen.mon && (
                    <>
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
                        <TrashIcon width={14} style={{ marginLeft: '10px' }} onClick={() => addReOpenTimings('mon')} />
                      </Col>
                    </>
                  )}
                  {!reOpen.mon && (
                    <Col span={2} offset={1}>
                      <Button className={styles.addTimeBtn} onClick={() => addReOpenTimings('mon')}>
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
                      <TimePicker use12Hours format="h A" placeholder="- -" />
                    </div>
                  </Col>
                  <Col span={3}>
                    <div className={cx(styles.timePicker, styles.second)}>
                      <TimePicker use12Hours variant="secondaryLight" format="h A" placeholder="- -" />
                    </div>
                  </Col>
                  {reOpen.tue && (
                    <>
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
                        <TrashIcon width={14} style={{ marginLeft: '10px' }} onClick={() => addReOpenTimings('tue')} />
                      </Col>
                    </>
                  )}
                  {!reOpen.tue && (
                    <Col span={2} offset={1}>
                      <Button className={styles.addTimeBtn} onClick={() => addReOpenTimings('tue')}>
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
                      <TimePicker use12Hours variant="secondaryLight" format="h A" placeholder="- -" />
                    </div>
                  </Col>
                  <Col span={3}>
                    <div className={cx(styles.timePicker, styles.second)}>
                      <TimePicker use12Hours variant="secondaryLight" format="h A" placeholder="- -" />
                    </div>
                  </Col>
                  {reOpen.wed && (
                    <>
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
                        <TrashIcon width={14} style={{ marginLeft: '10px' }} onClick={() => addReOpenTimings('wed')} />
                      </Col>
                    </>
                  )}
                  {!reOpen.wed && (
                    <Col span={2} offset={1}>
                      <Button className={styles.addTimeBtn} onClick={() => addReOpenTimings('wed')}>
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
                      <TimePicker use12Hours variant="secondaryLight" format="h A" placeholder="- -" />
                    </div>
                  </Col>
                  <Col span={3}>
                    <div className={cx(styles.timePicker, styles.second)}>
                      <TimePicker use12Hours variant="secondaryLight" format="h A" placeholder="- -" />
                    </div>
                  </Col>
                  {reOpen.thu && (
                    <>
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
                        <TrashIcon width={14} style={{ marginLeft: '10px' }} onClick={() => addReOpenTimings('thu')} />
                      </Col>
                    </>
                  )}
                  {!reOpen.thu && (
                    <Col span={2} offset={1}>
                      <Button className={styles.addTimeBtn} onClick={() => addReOpenTimings('thu')}>
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
                      <TimePicker use12Hours variant="secondaryLight" format="h A" placeholder="- -" />
                    </div>
                  </Col>
                  <Col span={3}>
                    <div className={cx(styles.timePicker, styles.second)}>
                      <TimePicker use12Hours variant="secondaryLight" format="h A" placeholder="- -" />
                    </div>
                  </Col>
                  {reOpen.fri && (
                    <>
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
                        <TrashIcon width={14} style={{ marginLeft: '10px' }} onClick={() => addReOpenTimings('fri')} />
                      </Col>
                    </>
                  )}
                  {!reOpen.fri && (
                    <Col span={2} offset={1}>
                      <Button className={styles.addTimeBtn} onClick={() => addReOpenTimings('fri')}>
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
