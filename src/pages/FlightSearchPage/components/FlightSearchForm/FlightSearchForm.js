import React, { useState, useRef } from 'react';
import moment from 'moment';
import cx from 'classnames';
import { isEmpty } from 'lodash';
import { Row, Col, Button, DatePicker, Select } from 'antd';

import NumberInput from 'components/NumberInput/NumberInput';
import { Checkbox } from 'components/CheckboxGroup/CheckboxGroup';
import Complete from 'components/AutoComlete/AutoComplete';

import headerImg from 'images/withBlue.png';
import { ReactComponent as SearchIcon } from 'icons/search.svg';
import { ReactComponent as CalendarIcon } from 'icons/calendar.svg';
import { ReactComponent as PinIcon } from 'icons/pin.svg';
import { ReactComponent as MinusIcon } from 'icons/minusBlue.svg';
import { ReactComponent as PlusIcon } from 'icons/plusBlue.svg';
import { ReactComponent as FlightIcon } from 'icons/tofromflight.svg';

import styles from './FlightSearchForm.module.scss';

const FlightSearchForm = () => {
  const [departureDate, setDepartureDate] = useState(moment().format('MM-DD-YYYY'));
  const [returnDate, setReturnDate] = useState(moment().format('MM-DD-YYYY'));
  const [searchType, setSearchType] = useState('roundtrip');
  const [cabinClass, setCabinClass] = useState('');
  const [travelerCount, setTravelerCount] = useState(1);
  const [nonStopFlight, setNonStopFlight] = useState(false);
  const [origin, setOrigin] = useState({});
  const [destination, setDestination] = useState({});
  const originCache = useRef({});
  const destinationCache = useRef({});

  const cabinClassOptions = [
    {
      value: 'noPref',
      title: 'No Preference',
    },
    {
      value: 'economy',
      title: 'Economy/Coach',
    },
    {
      value: 'premiumEconomy',
      title: 'Premium Economy',
    },
    {
      value: 'business',
      title: 'Business',
    },
    {
      value: 'first',
      title: 'First',
    },
  ];

  const handleTravelerCountChange = () => (value) => {
    setTravelerCount(value);
  };

  const clearOriginData = () => {
    if (origin?.location_id) {
      originCache.current = origin || {};
    }
    setOrigin({});
  };
  const clearDestinationData = () => {
    if (destination?.location_id) {
      destinationCache.current = destination || {};
    }
    setDestination({});
  };

  const validateForm = () => {
    if (isEmpty(origin) || isEmpty(destination) || departureDate === '' || returnDate === '' || travelerCount <= 0)
      return false;
    return true;
  };

  const postSearch = () => {
    const validate = validateForm();
    if (validate) {
      const refId = 10045;
      const roundTripPost = `https://secure.rezserver.com/flights/results/depart/?rs_chk_in=${departureDate}&rs_chk_out=${departureDate}&rs_adults=${travelerCount}&rs_children=0&refid=${refId}&air_search_type=${searchType}&cabin_class=`;
      const oneWayPost = `https://secure.rezserver.com/flights/results/depart/?rs_chk_in1=${departureDate}&rs_chk_out1=${departureDate}&rs_adults=${travelerCount}&rs_children=0&refid=${refId}&air_search_type=${searchType}&cabin_class=`;
      if (searchType === 'roundtrip') {
        window.open(roundTripPost);
      } else {
        window.open(oneWayPost);
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.imgWrapper}>
          <div className={styles.imgOverlay}>
            <img alt="withBlue" src={headerImg} className={styles.img} />
          </div>
        </div>
        <div className={styles.content}>
          <Row gutter={100}>
            <Col md={24} xs={24}>
              <div className={styles.searchHeader}>
                <div className={styles.searchWrapper}>
                  <div className={styles.searchIconWrapper}>
                    <SearchIcon className={styles.searchIcon} />
                  </div>
                  <div className={styles.searchWrapperText}>Where would you like to go?</div>
                </div>
                <div className={styles.switchType}>
                  <Button.Group>
                    <Button
                      className={searchType === 'roundtrip' ? styles.roundSelectedBtn : styles.roundBtn}
                      onClick={() => setSearchType('roundtrip')}
                    >
                      Round Trip
                    </Button>
                    <Button
                      className={searchType === 'oneway' ? styles.roundSelectedBtn : styles.roundBtn}
                      onClick={() => setSearchType('oneway')}
                    >
                      One-Way
                    </Button>
                  </Button.Group>
                </div>
              </div>
            </Col>
          </Row>
          <Row className={styles.searchRow}>
            <Col flex="1" className={styles.searchCol}>
              <div className={styles.searchForm}>
                <div className={styles.searchText}>From</div>
                <div className={styles.autoCompleteWrapper}>
                  <Complete
                    value={origin}
                    onSelect={(place) => setOrigin(place)}
                    clearData={clearOriginData}
                    placeholder="Search or enter location..."
                  />
                  <PinIcon className={styles.pinIcon} width={24} height={24} />
                </div>
                <div className={styles.datePickerWrapper}>
                  <DatePicker
                    onChange={(value) => setDepartureDate(moment(value).format('MM-DD-YYYY'))}
                    defaultValue={moment()}
                    value={moment(departureDate)}
                    format="MM-DD-YYYY"
                    suffixIcon={<CalendarIcon className="calendarIcon" width={20} height={20} />}
                    className={styles.datePicker}
                  />
                </div>
              </div>
            </Col>
            <Col flex="100px" className={styles.searchColHide}>
              <div className={styles.plane}>
                <FlightIcon width={100} height={142} />
              </div>
            </Col>
            <Col flex="1" className={styles.searchCol}>
              <div className={styles.searchForm}>
                <div className={styles.searchText}>To</div>
                <div className={styles.autoCompleteWrapper}>
                  <Complete
                    value={destination}
                    onSelect={(place) => setDestination(place)}
                    clearData={clearDestinationData}
                    placeholder="Search or enter location..."
                  />
                  <PinIcon className={styles.pinIcon} width={24} height={24} />
                </div>
                <div className={styles.datePickerWrapper}>
                  <DatePicker
                    onChange={(value) => setReturnDate(moment(value).format('MM-DD-YYYY'))}
                    defaultValue={moment()}
                    value={moment(returnDate)}
                    format="MM-DD-YYYY"
                    suffixIcon={<CalendarIcon className="calendarIcon" width={20} height={20} />}
                    className={styles.datePicker}
                  />
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <div className={styles.divider} />
          </Row>
          <Row className={cx(styles.searchRow, styles.searchFilter)}>
            <Col flex="1" className={styles.searchCol}>
              <Row>
                <Col md={24} xs={24}>
                  <div className={styles.searchForm}>
                    <div className={styles.searchTextWrapper}>
                      <div className={styles.searchText}>Preferred Cabin Class</div>
                      <div className={styles.searchOptionalText}>Optional</div>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={24} xs={24}>
                  <div className={styles.searchSelectWrapper}>
                    <Select
                      placeholder="Select..."
                      value={cabinClass}
                      onChange={(value) => setCabinClass(value)}
                      className={styles.searchSelect}
                    >
                      {cabinClassOptions.map((option) => (
                        <Select.Option key={option.value} value={option.value}>
                          {option.title}
                        </Select.Option>
                      ))}
                    </Select>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col flex="100px" className={styles.searchColHide} />
            <Col flex="1">
              <Row>
                <Col md={12} xs={24}>
                  <Row>
                    <Col md={24} xs={24}>
                      <div className={styles.searchText}>Travelers</div>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={24} xs={24}>
                      <div className={styles.searchComp}>
                        <NumberInput
                          className={styles.travelers}
                          defaultValue={1}
                          value={1}
                          name="travelerCount"
                          onChange={handleTravelerCountChange}
                          leftComponent={
                            <div>
                              <MinusIcon width={46} height={46} />
                            </div>
                          }
                          rightComponent={
                            <div className={styles.plusIcon}>
                              <PlusIcon width={26} height={21} />
                            </div>
                          }
                        />
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col md={12} xs={24}>
                  <Row>
                    <div className={styles.searchText}>Non-Stop Flight</div>
                  </Row>
                  <Row>
                    <div className={styles.searchComp}>
                      <Checkbox
                        invert
                        size="large"
                        checked={nonStopFlight}
                        onChange={(e) => {
                          e.preventDefault();
                          setNonStopFlight(!nonStopFlight);
                        }}
                      >
                        <span className={styles.checkLabel}>Preferred</span>
                      </Checkbox>
                    </div>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row justify="center">
            <Col md={24} xs={24} justify="center" className={styles.buttonGroup}>
              <Button className={styles.searchBtn} onClick={() => postSearch()}>
                <SearchIcon width={24} height={24} />
                <span className={styles.searchBtnText}>Search Flights</span>
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default FlightSearchForm;
