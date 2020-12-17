import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Radio } from 'antd';
import GoogleMap from 'components/GoogleMap/GoogleMap';
import ResultsList from './ResultsList';
import { getFormattedFilteredHotels } from 'store/hotel/selectors';
import styles from './Results.module.scss';

const Results = ({ toggleDrawer, currency }) => {
  const [view, setView] = useState('list');
  const [mapCoords, setMapCoords] = useState([]);
  const [defaultCenter, setDefaultCenter] = useState([]);
  const hotels = useSelector(getFormattedFilteredHotels);

  const onViewChange = (e) => {
    setView(e.target.value);
  };

  useEffect(() => {
    if (hotels && hotels.length > 0) {
      const geolocation = hotels[0].geolocation;
      setDefaultCenter([geolocation.latitude, geolocation.longitude]);
    }
    const coords = hotels.map((hotel) => hotel.geolocation);
    setMapCoords(coords);
  }, [hotels]);

  return (
    <div className={styles.root}>
      <div className={styles.viewSwitch}>
        <Radio.Group
          defaultValue='list'
          buttonStyle='solid'
          className={styles.radio}
          onChange={onViewChange}
        >
          <Radio.Button value='list' onClick={() => toggleDrawer(true)}>
            <i className='fa fa-bars' aria-hidden='true'></i>&nbsp; Filters
          </Radio.Button>
          <Radio.Button value='map'>
            <i className='fa fa-map-marker' aria-hidden='true'></i>&nbsp; View
            Map
          </Radio.Button>
        </Radio.Group>
      </div>
      <div className={styles.container}>
        {view === 'list' ? (
          <ResultsList filteredHotels={hotels} currency={currency} />
        ) : (
          <GoogleMap height={600} center={defaultCenter} coords={mapCoords} />
        )}
      </div>
    </div>
  );
};

export default Results;
