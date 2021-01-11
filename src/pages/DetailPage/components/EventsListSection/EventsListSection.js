import React from 'react';
import { useSelector } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';
import cx from 'classnames';
import { Tabs, TabPane } from 'components/Tab/Tab';
import GoogleMap from 'components/GoogleMap/GoogleMap';
import { getCurrency } from 'store/core/selectors';
import TicketsItem from '../DetailItem/TicketsItem';
import SeatingItem from '../SeatingItem/SeatingItem';
import styles from './EventsListSection.module.scss';

const location = {
  lat: 27.2046,
  lng: 77.4977,
};

export default function EventsListSection() {
  const intl = useIntl();
  const currency = useSelector(getCurrency);

  return (
    <div className={cx(styles.root)}>
      <Tabs className={styles.tabPane} defaultActiveKey="1">
        <TabPane tab={intl.formatMessage({ id: 'tickets', defaultValue: 'Tickets' })} key="1">
          <div className={styles.title}>
            <FormattedMessage id="orchestraSeats" defaultMessage="Orchestra Seats" />
          </div>
          <TicketsItem currency={currency} />
          <TicketsItem currency={currency} />
          <TicketsItem currency={currency} />
        </TabPane>
        <TabPane tab={intl.formatMessage({ id: 'seating', defaultValue: 'Seating' })} key="2">
          <SeatingItem />
        </TabPane>
        <TabPane tab={intl.formatMessage({ id: 'details', defaultValue: 'Details' })} key="3">
          <h1>This is Details tab</h1>
        </TabPane>
        <TabPane tab={intl.formatMessage({ id: 'map', defaultValue: 'Map' })} key="4">
          <div className={styles.googleMapContainer}>
            <GoogleMap className={styles.googleMap} center={location} coords={[location]} />
          </div>
        </TabPane>
        <TabPane tab={intl.formatMessage({ id: 'reviews', defaultValue: 'Reviews' })} key="5">
          <div>
            <h1>This is review tab</h1>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}
