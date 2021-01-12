import React from 'react';
import cx from 'classnames';
import { useSelector } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';
import { Tabs, TabPane } from 'components/Tab/Tab';
import GoogleMap from 'components/GoogleMap/GoogleMap';
import { getCurrency } from 'store/core/selectors';
import DetailItem from '../DetailItem/HotelItem';
import styles from './RoomListSection.module.scss';

export default function RoomListSection(props) {
  const { className, hotel, nights, selectedRooms, onRoomItemClick } = props;
  const location = {
    lat: hotel.hotel_details?.geolocation?.latitude,
    lng: hotel.hotel_details?.geolocation?.longitude,
  };
  const currency = useSelector(getCurrency);
  const intl = useIntl();

  return (
    <div className={cx(styles.root, className)}>
      <Tabs className={styles.tabPane} defaultActiveKey="1">
        <TabPane tab={intl.formatMessage({ id: 'rooms', defaultValue: 'Rooms' })} key="1">
          {(hotel.room_types || []).map((item) => (
            <DetailItem
              key={item.code}
              data={item}
              nights={nights}
              selected={selectedRooms.includes(item.code)}
              onSelect={onRoomItemClick(item.code)}
              onDeselect={onRoomItemClick(item.code, true)}
              occupancy={hotel.occupancy}
              currency={currency}
            />
          ))}
        </TabPane>
        <TabPane tab={intl.formatMessage({ id: 'details', defaultValue: 'Details' })} key="2">
          <div className={styles.amenities}>
            <p className={styles.detailsTab}>{hotel.hotel_details?.property_description}</p>
            <h5 className={styles.amenitiesWrapper}>
              <FormattedMessage id="amenities" defaultMessage="Amenities" />
            </h5>
            <ul>
              {hotel?.hotel_details?.amenities.map((amenity) => (
                <li>{amenity}</li>
              ))}
            </ul>
          </div>
        </TabPane>
        <TabPane tab={intl.formatMessage({ id: 'map', defaultValue: 'Map' })} key="3">
          <div>
            <GoogleMap center={location} coords={[location]} />
          </div>
        </TabPane>
        <TabPane tab={intl.formatMessage({ id: 'location', defaultValue: 'Location' })} key="4">
          <h3>Location tab</h3>
        </TabPane>
        <TabPane tab={intl.formatMessage({ id: 'cleaning/safety', defaultValue: 'Cleaning/Safety' })} key="5">
          <h3>Cleaning/Safety tab</h3>
        </TabPane>
      </Tabs>
    </div>
  );
}
