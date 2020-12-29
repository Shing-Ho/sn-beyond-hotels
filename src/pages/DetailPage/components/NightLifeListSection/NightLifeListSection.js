import React from 'react';
import { useIntl } from 'react-intl';
import { Tabs, TabPane } from 'components/Tab/Tab';
import Collapse from 'components/Collapse/Collapse';
import GoogleMap from 'components/GoogleMap/GoogleMap';
import TicketsItem from '../TicketsItem/TicketsItem';
import styles from './NightLifeListSection.module.scss';

const location = {
  lat: 27.2046,
  lng: 77.4977,
};

export default function NightLifeListSection() {
  const intl = useIntl();

  return (
    <div className={styles.root}>
      <Tabs className={styles.tabPane} defaultActiveKey="1">
        <TabPane tab={intl.formatMessage({ id: 'admission', defaultValue: 'Admission' })} key="1">
          <Collapse className={styles.title} header="General Admission" type="large">
            <TicketsItem type="NIGHTLIFE" />
          </Collapse>
          <Collapse className={styles.title} header="VIP" type="large">
            <TicketsItem type="NIGHTLIFE" personCapacity={8} />
            <TicketsItem type="NIGHTLIFE" personCapacity={4} />
            <TicketsItem type="NIGHTLIFE" personCapacity={8} />
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
