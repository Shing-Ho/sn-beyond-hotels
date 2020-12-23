import React from 'react';
import cx from 'classnames';
import { useSelector } from 'react-redux';
import { Tabs, TabPane } from 'components/Tab/Tab';
import GoogleMap from 'components/GoogleMap/GoogleMap';
import { getCurrency } from 'store/core/selectors';
import DiningDetailItem from '../DiningDetailItem/DiningDetailItem';
import styles from './DiningListSection.module.scss';

const tempItem = [
  {
    name: 'Appetizers',
    details: [
      {
        name: 'Poutine',
        price: 8.5,
        img_url:
          'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHw%3D&auto=format&fit=crop&w=500&q=60',
      },
      {
        name: 'Avocado Eggrolls',
        price: 10,
        img_url:
          'https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHw%3D&auto=format&fit=crop&w=500&q=60',
      },
      {
        name: 'Sliders',
        price: 11.75,
        img_url:
          'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHw%3D&auto=format&fit=crop&w=500&q=60',
      },
    ],
  },
  {
    name: 'Small Plates',
    details: [
      {
        name: 'Poutine',
        price: 8.5,
        img_url:
          'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHw%3D&auto=format&fit=crop&w=500&q=60',
      },
      {
        name: 'Avocado Eggrolls',
        price: 10,
        img_url:
          'https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHw%3D&auto=format&fit=crop&w=500&q=60',
      },
      {
        name: 'Sliders',
        price: 11.75,
        img_url:
          'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHw%3D&auto=format&fit=crop&w=500&q=60',
      },
    ],
  },
];

export default function DiningListSection(props) {
  const { className, hotel, nights, selectedRooms, onRoomItemClick } = props;
  const location = {
    lat: hotel.hotel_details?.geolocation?.latitude,
    lng: hotel.hotel_details?.geolocation?.longitude,
  };
  const currency = useSelector(getCurrency);
  return (
    <div className={cx(styles.root, className)}>
      <Tabs className={styles.tabPane} defaultActiveKey="1">
        <TabPane tab="MENUS" key="1">
          {(tempItem || []).map((item) => (
            <DiningDetailItem
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
        <TabPane tab="Details" key="2">
          <div className={styles.amenities}>
            <p className={styles.detailsTab}>{hotel.hotel_details?.property_description}</p>
            <h5 className={styles.amenitiesWrapper}>Amenities</h5>
            <ul>
              {hotel?.hotel_details?.amenities.map((amenity) => (
                <li>{amenity}</li>
              ))}
            </ul>
          </div>
        </TabPane>
        <TabPane tab="Map" key="3">
          <div>
            <GoogleMap center={location} coords={[location]} />
          </div>
        </TabPane>
        <TabPane tab="REVIEWS" key="4">
          <div>This is Review</div>
        </TabPane>
        <TabPane tab="SAFETY" key="5">
          <div>This is Safety</div>
        </TabPane>
      </Tabs>
    </div>
  );
}
