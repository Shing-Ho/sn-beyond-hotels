import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';

import { isEmpty } from 'lodash';
import { getTopFilters } from 'store/core/selectors';

import { ReactComponent as RedClose } from 'icons/close-fill-large.svg';
import DatePicker from 'components/DatePicker/DatePicker';
import { TabPane, Tabs } from 'components/Tab/Tab';
import NumberInput from 'components/NumberInput/NumberInput';
import TimeSelect from 'components/TimeSelect/TimeSelect';
import Button from 'components/Button/Button';
import styles from './DiningSection.module.scss';
import DifferentTime from '../DifferentTime/DifferentTime';
import WaitList from '../WaitList/WaitList';

const defaultTime = [
  new Date('2020-12-10 17:00'),
  new Date('2020-12-10 17:30'),
  new Date('2020-12-10 17:45'),
  new Date('2020-12-10 18:15'),
  new Date('2020-12-10 18:45'),
];

const orders = [
  {
    name: 'Sliders',
    count: 2,
  },
  {
    name: 'COBB Salad',
    count: 1,
  },
  {
    name: 'Chicken Parmesan',
    count: 1,
  },
];

export default function DiningSection() {
  const [form, setForm] = useState({});
  const [bookNow, setBookNow] = useState(false);
  const [waitList, setWatiList] = useState(false);
  const [activeTime, setActiveTime] = useState(defaultTime[0]);
  const [differentTime, setDifferentTime] = useState(false);
  const topFilters = useSelector(getTopFilters);

  const handleChange = (key) => (value) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  const onBookNow = () => {
    // setBookNow(true)
  };

  const onJoinWaitList = () => {
    setWatiList(true);
  };

  if (waitList) {
    return <WaitList onBack={() => setWatiList(false)} />;
  }

  if (differentTime) {
    return <DifferentTime onBack={() => setDifferentTime(false)} />;
  }

  return (
    <div className={styles.root}>
      <div className={styles.bookContent}>
        <Tabs size="big" tabBarGutter={0} defaultActiveKey="1">
          <TabPane className={styles.tabPane} tab="Find a Table" key="1">
            <div className={styles.guestRow}>
              <NumberInput defaultValue={1} name="guest" onChange={handleChange} />
              <span className={styles.guestText}>Guests</span>
            </div>
            <div className={styles.dateContainer}>
              <span className={styles.dateTimeText}>Date & Time</span>
              <DatePicker
                defaultValue={isEmpty(topFilters) ? moment() : moment(topFilters.start_date)}
                onChange={handleChange('date')}
              />
              <div className={styles.timeSelectContainer}>
                <TimeSelect
                  times={defaultTime}
                  activeTime={activeTime}
                  setActiveTime={(time) => {
                    setActiveTime(time);
                    if ((time.getTime() / 100000) % 2 === 1) setBookNow(true);
                    // This is temperal working because of UI work
                    else setBookNow(false);
                  }}
                />
              </div>
              <span className={styles.differentTimeText}>
                Don&apos;t see a time that works for you? Request your preferred time.
              </span>
              <Button className={styles.differentTime} onClick={() => setDifferentTime(true)}>
                <FormattedMessage id="differentTime" defaultMessage="Request different time" />
              </Button>
            </div>
            {bookNow ? (
              <div className={styles.waitListWrapper}>
                <span className={styles.waitListLeft}>Waitlist Available</span>
                <div className={styles.waitListRight}>
                  <span className={styles.waitListTop}>20-30</span>
                  <span className={styles.waitListBottom}>Minutes</span>
                </div>
              </div>
            ) : null}
            {bookNow ? (
              <Button className={styles.bookNow} onClick={onJoinWaitList}>
                <FormattedMessage id="joinWaitList" defaultMessage="Join the Waitlist" />
              </Button>
            ) : (
              <Button className={styles.bookNow} onClick={onBookNow}>
                <FormattedMessage id="bookNow" defaultMessage="Book Now" />
              </Button>
            )}
            <Button className={styles.addToItinerary}>
              <FormattedMessage id="addToItinerary" defaultMessage="Add to Itinerary" />
            </Button>
          </TabPane>
          <TabPane className={styles.tabPane} tab="Order Online" key="2">
            <div className={styles.topButtons}>
              <Button className={styles.deliveryButton} onClick={onJoinWaitList}>
                <FormattedMessage id="deliveryButton" defaultMessage="Delivery" />
              </Button>
              <Button className={styles.pickUpButton} onClick={onBookNow}>
                <FormattedMessage id="pickUpButton" defaultMessage="Pickup" />
              </Button>
            </div>
            <div className={styles.dateContainer}>
              <span className={styles.dateTimeText}>Date & Time</span>
              <DatePicker defaultValue={moment()} onChange={handleChange('date')} />
              <div className={styles.timeSelectContainer}>
                <TimeSelect
                  times={defaultTime}
                  activeTime={activeTime}
                  setActiveTime={(time) => {
                    setActiveTime(time);
                    if ((time.getTime() / 100000) % 2 === 1) setBookNow(true);
                    // This is temperal working because of UI work
                    else setBookNow(false);
                  }}
                />
              </div>
              <Button className={styles.differentTime} onClick={() => setDifferentTime(true)}>
                <FormattedMessage id="differentTime" defaultMessage="Request different time" />
              </Button>
            </div>
            {bookNow ? (
              <div className={styles.waitListWrapper}>
                <span className={styles.waitListLeft}>Waitlist Available</span>
                <div className={styles.waitListRight}>
                  <span className={styles.waitListTop}>20-30</span>
                  <span className={styles.waitListBottom}>Minutes</span>
                </div>
              </div>
            ) : null}
            <div className={styles.orderContainer}>
              <span className={styles.orderText}>Your Order</span>
              {orders.map((order) => (
                <div key={order.name} className={styles.orderRow}>
                  <span className={styles.orderName}>{order.name}</span>
                  <div className={styles.orderRight}>
                    <span className={styles.orderNumber}>{order.count}</span>
                    <RedClose className={styles.closeIcon} />
                  </div>
                </div>
              ))}
            </div>
            {bookNow ? (
              <Button className={styles.bookNow} onClick={onJoinWaitList}>
                <FormattedMessage id="joinWaitList" defaultMessage="Join the Waitlist" />
              </Button>
            ) : (
              <Button className={styles.bookNow} onClick={onBookNow}>
                <FormattedMessage id="bookNow" defaultMessage="Book Now" />
              </Button>
            )}
            <Button className={styles.addToItinerary}>
              <FormattedMessage id="addToItinerary" defaultMessage="Add to Itinerary" />
            </Button>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}
