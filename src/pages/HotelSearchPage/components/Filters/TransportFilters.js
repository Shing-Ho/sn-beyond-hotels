import React, { useState } from 'react';
import { Row, Col, Radio } from 'antd';
import cx from 'classnames';
import FormItem from 'components/FormItem/FormItem';
import Select from 'components/Select/Select';
import styles from './TransportFilters.module.scss';

const tabOptions = [
  {
    label: 'Show All',
    icon: <i className="fa fa-clone" />,
    value: 'ALL',
  },
  {
    label: 'Rental Car',
    icon: <i className="fa fa-car" />,
    value: 'RENTAL_CAR',
  },
  {
    label: 'Rail',
    icon: <i className="fa fa-subway" />,
    value: 'RAIL',
  },
  {
    label: 'Ride Share',
    icon: <i className="fa fa-random" />,
    value: 'RIDE_SHARE',
  },
  {
    label: 'Car Hire',
    icon: <i className="fa fa-taxi" />,
    value: 'CAR_HIRE',
  },
  {
    label: 'Transfers',
    icon: <i className="fa fa-fighter-jet" />,
    value: 'TRANSFERS',
  },
  {
    label: 'Metro',
    icon: <i className="fa fa-subway" />,
    value: 'METRO',
  },
  {
    label: 'Bus',
    icon: <i className="fa fa-bus" />,
    value: 'BUS',
  },
  {
    label: 'Scooter',
    icon: <i className="fa fa-motorcycle" />,
    value: 'SCOOTER',
  },
  {
    label: 'Bike',
    icon: <i className="fa fa-bicycle" />,
    value: 'BIKE',
  },
  {
    label: 'Boat',
    icon: <i className="fa fa-ship" />,
    value: 'BOAT',
  },
];

const searchOptions = [
  {
    title: 'Tag',
    value: 'tag',
  },
  {
    title: 'LongTag',
    value: 'longtag',
  },
];

const TransportFilters = ({ onViewModeChange, onTabChange }) => {
  const [search, setSearch] = useState([]);
  const [tab, setTab] = useState('ALL');

  const handleChange = (field) => (data) => {
    switch (field) {
      case 'search':
        setSearch(data);
        break;

      case 'mode':
        onViewModeChange(data.target.value);
        break;

      case 'tab':
        setTab(data);
        onTabChange();
        break;

      default:
    }
  };

  return (
    <div className={styles.root}>
      <Row gutter={60}>
        <Col md={12} sm={24} xs={24}>
          <FormItem className={styles.search}>
            <Select
              placeholder="Search..."
              value={search}
              options={searchOptions}
              mode="tags"
              defaultValue={search}
              suffix={<span className="fa fa-search" />}
              onChange={handleChange('search')}
            />
          </FormItem>
        </Col>
        <Col md={12} sm={24} xs={24}>
          <Row justify="space-between" gutter={20}>
            <Col md={8} sm={8} xs={8}>
              <Select className={styles.select} options={[]} placeholder="Filter..." />
            </Col>
            <Col md={8} sm={8} xs={8}>
              <Select className={styles.select} options={[]} placeholder="Sort..." />
            </Col>
            <Col className={styles.radioWrapper} md={8} sm={8} xs={8}>
              <Radio.Group
                defaultValue="tile"
                buttonStyle="solid"
                className={styles.radio}
                onChange={handleChange('mode')}
              >
                <Radio.Button value="tile">
                  <i className="fa fa-th" aria-hidden="true" />
                </Radio.Button>
                <Radio.Button value="list">
                  <i className="fa fa-bars" aria-hidden="true" />
                </Radio.Button>
                <Radio.Button value="map">
                  <i className="fa fa-map-marker" aria-hidden="true" />
                </Radio.Button>
              </Radio.Group>
            </Col>
          </Row>
        </Col>
      </Row>
      <div className={styles.tabWrapper}>
        {tabOptions.map((option) => (
          <div
            className={cx(styles.tab, {
              [styles.active]: tab === option.value,
            })}
            onClick={() => handleChange('tab')(option.value)}
          >
            <span className={styles.label}>{option.label}</span>
            <span className={styles.icon}>{option.icon}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransportFilters;
