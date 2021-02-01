import React from 'react';
import cx from 'classnames';
import { Switch, DatePicker } from 'antd';
import moment from 'moment';

import { Tabs, TabPane } from 'components/Tab/Tab';
import Input from 'components/Input/Input';
import { ReactComponent as CalendarIcon } from 'icons/calendarGreen.svg';

import NumberInput from 'components/NumberInput/NumberInput';
import styles from './VenueAddRoomPricing.module.scss';

export default function VenueAddRoomPricing({ data, setData }) {
  const { activeTab, roomDate } = data;
  // const [roomDate, setRoomDate] = useState();
  return (
    <div>
      <div className={styles.main}>
        <Tabs
          className={cx(styles.tabPane)}
          defaultActiveKey="1"
          activeKey={activeTab}
          onChange={(key) => setData({ ...data, activeTab: key })}
        >
          <TabPane tab="RATE" key="1">
            <div className={styles.tabPaneData}>
              <div className={styles.bigInputItem}>
                <span>Standalone Rate</span>
                <Input
                  placeholder="Price"
                  prefix={<div className={styles.prefix}>$</div>}
                  suffix={
                    <div className={styles.suffix}>
                      USD
                      <i className="fa fa-angle-down" aria-hidden="true" />
                    </div>
                  }
                />
              </div>
              <div className={styles.bigInputItem}>
                <span>Package Discount Rate</span>
                <Input
                  placeholder="Price"
                  prefix={<div className={styles.prefix}>$</div>}
                  suffix={
                    <div className={styles.suffix}>
                      Fixed
                      <i className="fa fa-angle-down" aria-hidden="true" />
                    </div>
                  }
                />
              </div>
            </div>
          </TabPane>
          <TabPane tab="TAXES" key="2">
            <div className={styles.tabPaneData}>
              <div className={styles.inputItem}>
                <span>Goverment Tax</span>
                <Input placeholder="10.0" suffix={<div className={styles.suffix}>%</div>} />
              </div>
              <div className={styles.inputItem}>
                <span>Occupancy Tax</span>
                <Input placeholder="Price" suffix={<div className={styles.suffix}>%</div>} />
              </div>
              <div className={styles.inputItem}>
                <span>Other Tax</span>
                <Input placeholder="Price" suffix={<div className={styles.suffix}>%</div>} />
              </div>
              <div className={styles.switchItem}>
                <span>Certain Taxes</span>
                <div>
                  <Switch />
                </div>
              </div>
              <div className={styles.inputItem}>
                <span>Total Flat Tax</span>
                <Input placeholder="--" disabled suffix={<div className={styles.suffix}>%</div>} />
              </div>
            </div>
          </TabPane>
          <TabPane tab="GUESTS" key="3">
            <div className={styles.tabPaneData}>
              <div className={styles.inputItem}>
                <span>Extra Adult</span>
                <Input placeholder="10.0" suffix={<div className={styles.suffix}>%</div>} />
              </div>
              <div className={styles.inputItem}>
                <span>Included Adults</span>
                <NumberInput className={styles.numberInput} />
              </div>
              <div className={styles.inputItem}>
                <span>Extra Child</span>
                <Input placeholder="Price" suffix={<div className={styles.suffix}>%</div>} />
              </div>
              <div className={styles.inputItem}>
                <span>Included children</span>
                <NumberInput className={styles.numberInput} />
              </div>
            </div>
          </TabPane>
          <TabPane tab="DATES" key="4">
            <div className={styles.tabPaneData}>
              <div className={styles.dateItem}>
                <span>Date</span>
                <DatePicker
                  onChange={(e) => setData({ ...data, roomDate: e })}
                  defaultValue={moment(roomDate)}
                  value={moment(roomDate)}
                  suffixIcon={<CalendarIcon className="calendarIcon" />}
                  format="MMM DD, YYYY"
                  clearIcon={null}
                />
              </div>
              <div className={styles.inputItem}>
                <span>Multiple Dates</span>
                <div>
                  <Switch />
                </div>
              </div>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}
