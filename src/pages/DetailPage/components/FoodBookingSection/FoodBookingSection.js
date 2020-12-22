import React, { useState } from 'react';
import { Button } from 'antd';
import cx from 'classnames';
import { FormattedMessage } from 'react-intl';
import DatePicker from 'components/DatePicker/DatePicker';
import Divider from 'components/Divider/Divider';
import { ReactComponent as CloseIcon } from 'icons/close-fill.svg';
import styles from './FoodBookingSection.module.scss';
import { TabPane, Tabs } from '../../../../components/Tab/Tab';

const showTimings = ['ASAP', '5.30 PM', '5.45 PM', '6:00 PM', '6:15 PM', '6:30 PM'];

export default function FoodBookingSection({ className }) {
  const [selectedTime, setSelectedTime] = useState([]);
  const onBookNowClick = () => {};

  const onTimeSelected = (time) => () => {
    const index = selectedTime.findIndex((t) => t === time);
    if (index !== -1) {
      setSelectedTime([...selectedTime.slice(0, index), ...selectedTime.slice(index + 1)]);
    } else {
      setSelectedTime([...selectedTime, time]);
    }
  };

  return (
    <div className={cx(styles.root, className)}>
      <Tabs className={styles.tabPane} defaultActiveKey="1">
        <TabPane tab="Pickup" key="1">
          <div className={styles.bookContent}>
            <div className={styles.time}>
              <h3>Date & Time</h3>
              <div className="w-100">
                <DatePicker className="w-100" format="MMMM DD, YYYY" />
              </div>
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
              <Button className={styles.requestButton} onClick={onBookNowClick}>
                Request a Different Time
              </Button>
            </div>
            <Divider margin={25} />
            <div className={styles.yourOrder}>
              <span>
                <FormattedMessage id="yourOrder" defaultMessage="Your Order" />
              </span>
              <div>
                Sliders
                <span>
                  2
                  <CloseIcon />
                </span>
              </div>
              <div>
                Small Salad
                <span>
                  1
                  <CloseIcon />
                </span>
              </div>
              <div>
                Big Burger Combo
                <span>
                  1
                  <CloseIcon />
                </span>
              </div>
            </div>
            <div className={styles.total}>
              <span>
                <FormattedMessage id="total" defaultMessage="Total" />
              </span>
              <span className={styles.totalCost}>$ 150.00</span>
            </div>
          </div>
          <Button className={styles.bookNow} onClick={onBookNowClick}>
            Order Now
          </Button>
          <Button className={styles.addToItinerary} onClick={onBookNowClick}>
            Add to Itinerary
          </Button>
        </TabPane>
        <TabPane tab="Delivery" key="2">
          <h1>This is Delivery tab</h1>
        </TabPane>
      </Tabs>
    </div>
  );
}
