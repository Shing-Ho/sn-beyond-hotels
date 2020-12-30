import React from 'react';
import { useSelector } from 'react-redux';
import { Tabs, TabPane } from 'components/Tab/Tab';
import Collapse from 'components/Collapse/Collapse';
import GoogleMap from 'components/GoogleMap/GoogleMap';
import Divider from 'components/Divider/Divider';
import { getCurrency } from 'store/core/selectors';
import TicketsItem from '../TicketsItem/TicketsItem';
import styles from './GasListSection.module.scss';

const location = {
  lat: 27.2046,
  lng: 77.4977,
};

export default function GasListSection() {
  const currency = useSelector(getCurrency);

  return (
    <div className={styles.root}>
      <Tabs className={styles.tabPane} defaultActiveKey="1">
        <TabPane tab="Chargers" key="1">
          <Collapse className={styles.title} header="Prepaid Gas" type="large">
            <TicketsItem type="GAS" currency={currency} />
          </Collapse>
          <Divider />
          <Collapse className={styles.title} header="Other Services" type="large">
            <TicketsItem type="GAS" currency={currency} />
            <TicketsItem type="GAS" currency={currency} />
          </Collapse>
        </TabPane>
        <TabPane tab="Station Info" key="3">
          <h1>This is Details tab</h1>
        </TabPane>
        <TabPane tab="Map" key="4">
          <div className={styles.googleMapContainer}>
            <GoogleMap className={styles.googleMap} center={location} coords={[location]} />
          </div>
        </TabPane>
        <TabPane tab="Reviews" key="5">
          <div>
            <h1>This is review tab</h1>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}
