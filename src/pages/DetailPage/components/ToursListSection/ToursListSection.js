import React from 'react';
import { Tabs, TabPane } from 'components/Tab/Tab';
import Collapse from 'components/Collapse/Collapse';
import GoogleMap from 'components/GoogleMap/GoogleMap';
import TicketsItem from '../TicketsItem/TicketsItem';
import styles from './ToursListSection.module.scss';

const location = {
  lat: 27.2046,
  lng: 77.4977,
};

export default function ToursListSection(props) {
  return (
    <div className={styles.root}>
      <Tabs className={styles.tabPane} defaultActiveKey='1'>
        <TabPane tab='Tickets' key='1'>
          <Collapse
            className={styles.title}
            header='Fun For The Whole Family'
            type='large'
          >
            <TicketsItem type='TOUR' />
            <TicketsItem type='TOUR' />
            <TicketsItem type='TOUR' />
          </Collapse>
          <Collapse
            className={styles.title}
            header='Extreme Tours'
            type='large'
          >
            <TicketsItem type='TOUR' />
            <TicketsItem type='TOUR' />
          </Collapse>
        </TabPane>
        <TabPane tab='Details' key='3'>
          <h1>This is Details tab</h1>
        </TabPane>
        <TabPane tab='Map' key='4'>
          <div className={styles.googleMapContainer}>
            <GoogleMap
              className={styles.googleMap}
              center={location}
              coords={[location]}
            />
          </div>
        </TabPane>
        <TabPane tab='Reviews' key='5'>
          <div>
            <h1>This is review tab</h1>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}
