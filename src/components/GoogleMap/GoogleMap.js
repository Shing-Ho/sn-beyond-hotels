import React from 'react';
import GoogleMapReact from 'google-map-react';
import cx from 'classnames';
import styles from './GoogleMap.module.scss';

const MarkerComponent = () => (
  <div className={styles.marker}>
    <i className="fa fa-map-marker" aria-hidden="true" />
  </div>
);

const GoogleMap = (props) => {
  const { center, coords, className, height } = props;
  return (
    <div className={cx(styles.mapContainer, className)} style={{ height }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: window.REACT_APP_GOOGLE_MAP_KEY }}
        defaultCenter={center}
        defaultZoom={12}
      >
        {coords.map((coord) => (
          <MarkerComponent lat={coord.latitude} lng={coord.longitude} key={`${coord.latitude}${coord.longitude}`} />
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default GoogleMap;
