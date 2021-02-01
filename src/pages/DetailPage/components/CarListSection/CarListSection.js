import React from 'react';
import cx from 'classnames';
import { useIntl } from 'react-intl';
import { Tabs, TabPane } from 'components/Tab/Tab';
import GoogleMap from 'components/GoogleMap/GoogleMap';
import styles from './CarListSection.module.scss';

export default function CarListSection(props) {
  const { className, car } = props;
  const location = {
    lat: car?.geolocation?.latitude,
    lng: car?.geolocation?.longitude,
  };

  const intl = useIntl();

  return (
    <div className={cx(styles.root, className)}>
      <Tabs className={styles.tabPane} defaultActiveKey="1">
        <TabPane tab={intl.formatMessage({ id: 'overview', defaultValue: 'Overview' })} key="1">
          <div>Overview</div>
        </TabPane>
        <TabPane tab={intl.formatMessage({ id: 'details', defaultValue: 'Details' })} key="2">
          <div className={styles.amenities}>
            <p className={styles.detailsTab}>{car?.description}</p>
          </div>
        </TabPane>
        <TabPane tab={intl.formatMessage({ id: 'map', defaultValue: 'Map' })} key="3">
          <div>
            <GoogleMap center={location} coords={[location]} />
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}
