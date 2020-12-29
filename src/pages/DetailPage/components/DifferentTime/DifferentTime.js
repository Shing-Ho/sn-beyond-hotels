import React, { useState } from 'react';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';

import { ReactComponent as CloseIcon } from 'icons/close-fill-gray.svg';
import DatePicker from 'components/DatePicker/DatePicker';
import TimePicker from 'components/TimePicker/TimePicker';
import Button from 'components/Button/Button';
import styles from './DifferentTime.module.scss';

const DifferentTime = ({ onBack }) => {
  const [, setDate] = useState(null);
  const [, setTime] = useState(null);
  // const onMakeChange = () => {
  //   //
  // };

  return (
    <div className={styles.root}>
      <div className={styles.bookContent}>
        <div className={styles.header}>
          <span className={styles.headerText}>Request a Different Time</span>
          <Button onClick={onBack}>
            <CloseIcon />
          </Button>
        </div>
        <div className={styles.main}>
          <div className={styles.notifyText}>
            You will be notified if your requested time is approved by this location.
          </div>
          <div className={styles.item}>
            <div className={styles.itemText}>Data Requested</div>
            <DatePicker defaultValue={moment()} onChange={setDate} />
          </div>
          <div className={styles.item}>
            <div className={styles.itemText}>Time Requested</div>
            <TimePicker defaultValue={moment()} onChange={setTime} />
          </div>
        </div>
        <Button className={styles.addToItinerary}>
          <FormattedMessage id="requestNewTime" defaultMessage="Request New Time" />
        </Button>
      </div>
    </div>
  );
};

export default DifferentTime;
