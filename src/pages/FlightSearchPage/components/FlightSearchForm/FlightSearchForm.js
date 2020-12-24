import React, { useState } from 'react';
import { Row, Col, Button, DatePicker, Select } from 'antd';
import cx from 'classnames';

import RightIconInput from 'components/RightIconInput/RightIconInput';
import NumberInput from 'components/NumberInput/NumberInput';
import { Checkbox } from 'components/CheckboxGroup/CheckboxGroup';

import headerImg from 'images/withBlue.png';
import { ReactComponent as SearchIcon } from 'icons/search.svg';
import { ReactComponent as CalendarIcon } from 'icons/calendar.svg';
import { ReactComponent as PinIcon } from 'icons/pin.svg';
import { ReactComponent as MinusIcon } from 'icons/minusBlue.svg';
import { ReactComponent as PlusIcon } from 'icons/plusBlue.svg';
import styles from './FlightSearchForm.module.scss';

const FlightSearchForm = () => {
  const [searchFrom, setSearchFrom] = useState('');
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
                    <Button className={styles.roundBtn}>Round Trip</Button>
                    <Button className={styles.roundBtn}>One-Way</Button>
                  </Button.Group>
                </div>
              </div>
            </Col>
          </Row>
          <Row className={styles.searchRow}>
            <Col flex="1" className={styles.searchCol}>
              <div className={styles.searchForm}>
                <div className={styles.searchText}>From</div>
                <div className={styles.searchInput}>
                  <RightIconInput
                    name="Search or enter location..."
                    value={searchFrom}
                    onChange={setSearchFrom}
                    rightComponent={
                      <div className={styles.rightIconWrapper}>
                        <PinIcon className={styles.pinIcon} width={24} height={24} />
                      </div>
                    }
                  />
                </div>
                <div className={styles.datePickerWrapper}>
                  <DatePicker
                    //   onChange={(e) => onDateChange('start_date')(e)}
                    //   defaultValue={moment(data.start_date)}
                    //   value={moment(data.start_date)}
                    format="MM-DD-YYYY"
                    suffixIcon={<CalendarIcon className="calendarIcon" width={20} height={20} />}
                    className={styles.datePicker}
                  />
                </div>
              </div>
            </Col>
            <Col flex="100px" className={styles.searchColHide} />
            <Col flex="1" className={styles.searchCol}>
              <div className={styles.searchForm}>
                <div className={styles.searchText}>To</div>
                <div className={styles.searchInput}>
                  <RightIconInput
                    name="Search or enter location..."
                    value={searchFrom}
                    onChange={setSearchFrom}
                    rightComponent={
                      <div className={styles.rightIconWrapper}>
                        <PinIcon className={styles.pinIcon} />
                      </div>
                    }
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
                      // value={search}
                      // options={searchOptions}
                      // mode="tags"
                      // defaultValue={search}
                      // onChange={handleChange('search')}
                      className={styles.searchSelect}
                    />
                  </div>
                </Col>
              </Row>
            </Col>
            <Col flex="100px" className={styles.searchColHide} />
            <Col flex="1">
              <Row>
                <Col md={12} xs={12}>
                  <Row>
                    <div className={styles.searchText}>Travelers</div>
                  </Row>
                  <Row>
                    <div className={styles.searchComp}>
                      {/* <NumberInput className={styles.travelers} name="travelers" onChange={onChange} defaultValue={2} /> */}
                      <NumberInput
                        className={styles.travelers}
                        name="travelers"
                        defaultValue={1}
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
                  </Row>
                </Col>
                <Col md={12} xs={12}>
                  <Row>
                    <div className={styles.searchText}>Non-Stop Flight</div>
                  </Row>
                  <Row>
                    <div className={styles.searchComp}>
                      {/* <Checkbox invert value={tosAgreed} onChange={toggleTosAgreed}> */}
                      <Checkbox invert size="large">
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
              <a href="null">
                <Button className={styles.searchBtn}>
                  <SearchIcon width={24} height={24} />
                  <span className={styles.searchBtnText}>Search Flights</span>
                </Button>
              </a>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default FlightSearchForm;
