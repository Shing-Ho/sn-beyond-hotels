import React, { useState } from "react";
import { Button } from "antd";
import cx from "classnames";
import { FormattedMessage } from "react-intl";
import DatePicker from "components/DatePicker/DatePicker";
import Divider from "components/Divider/Divider";
import styles from "./EventBookingSection.module.scss";
import {ReactComponent as CloseIcon} from "icons/close-fill.svg";

const showTimings = ['ALL', '12:00 PM', '3:00 PM', '6:00 PM', '9:00 PM'];

export default function EventBookingSection({ className }) {
  const [selectedTime, setSelectedTime] = useState([]);
  const onBookNowClick = () => {};

  const onTimeSelected = time => () => {
    const index = selectedTime.findIndex(t => t === time);
    if (index !== -1) {
      setSelectedTime([...selectedTime.slice(0, index), ...selectedTime.slice(index + 1)])
    } else {
      setSelectedTime([...selectedTime, time]);
    }
  };

  return (
    <div className={cx(styles.root, className)}>
      <div className={styles.bookContent}>
        <h3>Date & Time</h3>
        <div className="w-100">
          <DatePicker className="w-100" format="MMMM DD, YYYY" />
        </div>
        <div className={styles.timeWrapper}>
          {
            showTimings.map(time => (
              <div
                key={time}
                onClick={onTimeSelected(time)}
                className={cx(styles.time, selectedTime.includes(time) && styles.selected)}
              >
                {time}
              </div>
            ))
          }
        </div>
        <Divider margin={20} />
        <div className={styles.yourOrder}>
          <span>
            <FormattedMessage id="yourOrder" defaultMessage="Your Order" />
          </span>
          <div>
            Right
            <span>
            2
            <CloseIcon />
          </span>
          </div>
        </div>
        <div className={styles.total}>
          <span>
            <FormattedMessage id="total" defaultMessage="Total" />
          </span>
          <span className={styles.totalCost}>
            $ 150.00
          </span>
        </div>
      </div>
      <Button className={styles.bookNow} onClick={onBookNowClick}>
        Order Now
      </Button>
      <Button className={styles.addToItinerary} onClick={onBookNowClick}>
        Add to Itinerary
      </Button>
    </div>
  );
}
