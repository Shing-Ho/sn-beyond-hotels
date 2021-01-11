import React from 'react';
import cx from 'classnames';
import { useIntl } from 'react-intl';
import { Tabs, TabPane } from 'components/Tab/Tab';
import GoogleMap from 'components/GoogleMap/GoogleMap';
import FoodItem from '../FoodItem/FoodItem';
import styles from './FoodListSection.module.scss';
import CheckboxGroup from '../../../../components/CheckboxGroup/CheckboxGroup';
import Collapse from '../../../../components/Collapse/Collapse';

const location = {
  lat: 27.2046,
  lng: 77.4977,
};

const FoodListSection = ({ data, setData }) => {
  const intl = useIntl();

  return (
    <div className={cx(styles.root)}>
      <Tabs className={styles.tabPane} defaultActiveKey="1">
        <TabPane tab="Menus" key="1">
          <div className={styles.title}>Sides</div>
          {data.map((d) => (
            <FoodItem data={d} setData={setData} />
          ))}
          <Collapse
            header={intl.formatMessage({ id: 'burgers', defaultValue: 'Bergers' })}
            type="large"
            className={styles.select}
            activeKey={null}
          >
            <CheckboxGroup />
          </Collapse>
          <Collapse
            header={intl.formatMessage({ id: 'salads', defaultValue: 'Salads' })}
            type="large"
            className={styles.select}
            activeKey={null}
          >
            <CheckboxGroup />
          </Collapse>
          <Collapse
            header={intl.formatMessage({ id: 'specials', defaultValue: 'Specials' })}
            type="large"
            className={styles.select}
            activeKey={null}
          >
            <CheckboxGroup />
          </Collapse>
          <Collapse
            header={intl.formatMessage({ id: 'combos', defaultValue: 'Combos' })}
            type="large"
            className={styles.select}
            activeKey={null}
          >
            <CheckboxGroup />
          </Collapse>
        </TabPane>
        <TabPane tab="Details" key="2">
          <h1>This is Details tab</h1>
        </TabPane>
        <TabPane tab="Map" key="3">
          <div className={styles.googleMapContainer}>
            <GoogleMap className={styles.googleMap} center={location} coords={[location]} />
          </div>
        </TabPane>
        <TabPane tab="Reviews" key="4">
          <div>
            <h1>This is review tab</h1>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default FoodListSection;
