import React, { useState } from 'react';
import Button from 'components/Button/Button';
import moment from 'moment';
import cx from 'classnames';
import { FormattedMessage } from 'react-intl';
import { Tabs, TabPane } from 'components/Tab/Tab';
import DatePicker from 'components/DatePicker/DatePicker';
import Divider from 'components/Divider/Divider';
import DifferentTime from '../DifferentTime/DifferentTime';
import styles from './ShoppingBookingSection.module.scss';

const showTimings = ['ASAP', '5:30 PM', '5:45 PM', '6:00 PM', '6:15 PM', '6:30 PM'];

export default function ShoppingBookingSection({ className }) {
  const [selectedTime, setSelectedTime] = useState(['ASAP']);
  const [differentTime, setDifferentTime] = useState(false);
  const onBookNowClick = () => {};

  const onTimeSelected = (time) => () => {
    const index = selectedTime.findIndex((t) => t === time);
    if (index !== -1) {
      setSelectedTime([...selectedTime.slice(0, index), ...selectedTime.slice(index + 1)]);
    } else {
      setSelectedTime([...selectedTime, time]);
    }
  };
  if (differentTime) {
    return <DifferentTime onBack={() => setDifferentTime(false)} />;
  }
  return (
    <div className={cx(styles.root, className)}>
      <Tabs className={styles.tabPane} defaultActiveKey="1">
        <TabPane tab="Pickup" key="1">
          <div className={styles.bookContent}>
            <span className={styles.textStyle}>
              <FormattedMessage id="dateAndTime" defaultMessage="Date & Time" />
            </span>
            <span className={styles.spacing} />
            <div className="w-100">
              <DatePicker defaultValue={moment()} className={styles.dateText} format="MMMM DD, YYYY" />
            </div>
            <span className={styles.spacing} />
            <div className={styles.timeWrapper}>
              {showTimings.map((time) => (
                <div
                  key={time}
                  onClick={onTimeSelected(time)}
                  className={cx(styles.time, selectedTime.includes(time) && styles.selected)}
                >
                  {time}
                </div>
              ))}
            </div>
            <span className={styles.spacing} />
            <Button className={styles.differentTime} onClick={() => setDifferentTime(true)}>
              <FormattedMessage id="differentTime" defaultMessage="Request different time" />
            </Button>
            <span className={styles.spacing} />
            <Divider margin={20} />
            <div className={styles.yourOrder}>
              <span className={styles.textStyle}>
                <FormattedMessage id="yourOrder" defaultMessage="Your Order" />
              </span>
              <div>
                <span className={styles.NoProductAdded}>
                  <FormattedMessage id="NoProductadded" defaultMessage="No Products Added" />
                </span>
                <span className={styles.spanColor}>0</span>
              </div>
            </div>
            <div className={styles.total}>
              <span className={styles.textTotal}>
                <FormattedMessage id="TOTAL" defaultMessage="TOTAL" />
              </span>
              <span className={styles.totalCost}>$ 0.00</span>
            </div>
          </div>
          <Button className={styles.bookNow} onClick={onBookNowClick}>
            <FormattedMessage id="orderNow" defaultMessage="Order Now" />
          </Button>
          <Button className={styles.addToItinerary} onClick={onBookNowClick}>
            <FormattedMessage id="addToItinerary" defaultMessage="Add to Itinerary" />
          </Button>
        </TabPane>
        <TabPane tab="Delivery" key="2">
          <div className={styles.bookContent}>
            <span className={styles.textStyle}>
              <FormattedMessage id="dateAndTime" defaultMessage="Date & Time" />
            </span>
            <span className={styles.spacing} />
            <div className="w-100">
              <DatePicker defaultValue={moment()} className="w-100" format="MMMM DD, YYYY" />
            </div>
            <span className={styles.spacing} />
            <div className={styles.timeWrapper}>
              {showTimings.map((time) => (
                <div
                  key={time}
                  onClick={onTimeSelected(time)}
                  className={cx(styles.time, selectedTime.includes(time) && styles.selected)}
                >
                  {time}
                </div>
              ))}
            </div>
            <span className={styles.spacing} />
            <Button className={styles.differentTime} onClick={() => setDifferentTime(true)}>
              <FormattedMessage id="differentTime" defaultMessage="Request different time" />
            </Button>
            <span className={styles.spacing} />
            <Divider margin={20} />
            <div className={styles.yourOrder}>
              <span className={styles.textStyle}>
                <FormattedMessage id="yourOrder" defaultMessage="Your Order" />
              </span>
              <div>
                <span className={styles.NoProductAdded}>
                  <FormattedMessage id="NoProductadded" defaultMessage="No Products Added" />
                </span>
                <span className={styles.spanColor}>0</span>
              </div>
            </div>
            <div className={styles.total}>
              <span className={styles.textTotal}>
                <FormattedMessage id="TOTAL" defaultMessage="TOTAL" />
              </span>
              <span className={styles.totalCost}>$ 0.00</span>
            </div>
          </div>
          <Button className={styles.bookNow} onClick={onBookNowClick}>
            <FormattedMessage id="orderNow" defaultMessage="Order Now" />
          </Button>
          <Button className={styles.addToItinerary} onClick={onBookNowClick}>
            <FormattedMessage id="addToItinerary" defaultMessage="Add to Itinerary" />
          </Button>
        </TabPane>
      </Tabs>
    </div>
  );
}
