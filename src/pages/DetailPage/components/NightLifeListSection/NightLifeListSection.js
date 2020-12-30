import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { Tabs, TabPane } from 'components/Tab/Tab';
import Collapse from 'components/Collapse/Collapse';
import GoogleMap from 'components/GoogleMap/GoogleMap';
import TicketsNightLifeItem from '../TicketsItem/TicketsNightLifeItem';
import styles from './NightLifeListSection.module.scss';

const location = {
  lat: 27.2046,
  lng: 77.4977,
};

const dataArr = [
  {
    key: 'general',
    title: 'General Admission',
    person: 0,
    guests: 0,
  },
  {
    key: 'pool',
    title: 'Pool Table',
    person: 8,
    guests: 0,
  },
  {
    key: 'lilly',
    title: 'Lilly Pad',
    person: 4,
    guests: 0,
  },
  {
    key: 'lower',
    title: 'Lower Table',
    person: 8,
    guests: 0,
  },
];

export default function NightLifeListSection() {
  const [data, setData] = useState(dataArr);
  const intl = useIntl();

  const setNightLifeData = (key, obj) => {
    const index = data.findIndex((d) => d.key === key);
    if (index !== -1) {
      setData([...data.slice(0, index), { ...obj }, ...data.slice(index + 1)]);
    }
  };

  return (
    <div className={styles.root}>
      <Tabs className={styles.tabPane} defaultActiveKey="1">
        <TabPane tab={intl.formatMessage({ id: 'admission', defaultValue: 'Admission' })} key="1">
          <Collapse className={styles.title} header="General Admission" type="large">
            <TicketsNightLifeItem details={data[0]} setData={setNightLifeData} />
          </Collapse>
          <Collapse className={styles.title} header="VIP" type="large">
            <TicketsNightLifeItem details={data[1]} setData={setNightLifeData} />
            <TicketsNightLifeItem details={data[2]} setData={setNightLifeData} />
            <TicketsNightLifeItem details={data[3]} setData={setNightLifeData} />
          </Collapse>
        </TabPane>
        <TabPane tab={intl.formatMessage({ id: 'seating', defaultValue: 'Seating' })} key="2">
          <h1>This is Details tab</h1>
        </TabPane>
        <TabPane tab={intl.formatMessage({ id: 'overview', defaultValue: 'Overview' })} key="3">
          <h1>This is Overview tab</h1>
        </TabPane>
        <TabPane tab={intl.formatMessage({ id: 'details', defaultValue: 'Details' })} key="4">
          <h1>This is Details tab</h1>
        </TabPane>
        <TabPane tab={intl.formatMessage({ id: 'menus', defaultValue: 'Menus' })} key="5">
          <h1>This is Menus tab</h1>
        </TabPane>
        <TabPane tab={intl.formatMessage({ id: 'map', defaultValue: 'Map' })} key="6">
          <div className={styles.googleMapContainer}>
            <GoogleMap className={styles.googleMap} center={location} coords={[location]} />
          </div>
        </TabPane>
        <TabPane tab={intl.formatMessage({ id: 'reviews', defaultValue: 'Reviews' })} key="7">
          <div>
            <h1>This is review tab</h1>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}
