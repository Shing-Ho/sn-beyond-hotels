import React from 'react';
import { DatePicker, Input, Button } from 'antd';
import moment from 'moment';
import { get } from 'lodash';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import pin from 'icons/pin.png';
import { ReactComponent as AdultIcon } from 'icons/Adult.svg';
import { ReactComponent as ChildIcon } from 'icons/Child.svg';
import { ReactComponent as CalendarIcon } from 'icons/calendar.svg';
import { ReactComponent as MinusIcon } from 'icons/minus.svg';
import { ReactComponent as PlusIcon } from 'icons/plus.svg';
import { ReactComponent as BedIcon } from 'icons/bed.svg';
import NumberInput from '../NumberInput/NumberInput';
import { Currencies } from '../../helpers/constants';
import Select from '../Select/Select';
import Complete from '../AutoComlete/AutoComplete';

import styles from './TopFilters.module.scss';
import './editPanel.scss';

const currencyOptions = Object.keys(Currencies).map((value) => ({
  title: `${value} (${Currencies[value].symbol})`,
  value,
}));

const EditPanelBody = ({
  currency,
  onCurrencyChange,
  clearData,
  onSelect,
  onChange,
  onDateChange,
  data,
  onSubmit,
  displayCount,
}) => {
  const disableStartDate = (current) =>
    (current && current < moment().subtract(1, 'days')) || current > moment().add(18, 'months');

  const disableEndDate = (current) =>
    (current && current < moment(data.start_date)) || current > moment().add(18, 'months');
  return (
    <div className="editPanel">
      <div className={classNames('itemWrapper', 'autoCompleteWrapper')}>
        <Complete value={data.location} onSelect={onSelect} clearData={clearData} />
        <img src={pin} alt="" className={styles.img} />
      </div>
      <div className={classNames('itemWrapper', 'date-picker')}>
        <div className="dateWrapper">
          <DatePicker
            onChange={(e) => onDateChange('start_date')(e)}
            defaultValue={moment(data.start_date)}
            value={moment(data.start_date)}
            suffixIcon={<CalendarIcon className="calendarIcon" />}
            disabledDate={disableStartDate}
            format="MMM DD, YYYY"
          />
        </div>
        <div className="minus" />
        <div className="dateWrapper">
          <DatePicker
            onChange={(e) => onDateChange('end_date')(e)}
            defaultValue={moment(data.end_date)}
            value={moment(data.end_date)}
            suffixIcon={<CalendarIcon className="calendarIcon" />}
            disabledDate={disableEndDate}
            format="MMM DD, YYYY"
          />
        </div>
      </div>
      {displayCount && (
        <div className="countContainer">
          <div className={classNames('itemWrapper', 'countWrapper')}>
            <div className="icon">
              <AdultIcon width="25" />
              <span className="text">
                <FormattedMessage id="adults" defaultMessage="Adults" />
              </span>
            </div>
            <div className="countInputWrapper">
              <Input className="countInput" value={data.occupancy.adults} />
              <NumberInput className="customNumberInput" name="adults" onChange={onChange} value={2} />
              <div className="iconsWrapper">
                <PlusIcon onClick={() => onChange('adults')(data.occupancy.adults + 1)} />
                <MinusIcon onClick={() => onChange('adults')(data.occupancy.adults - 1)} />
              </div>
            </div>
          </div>
          <div className={classNames('itemWrapper', 'countWrapper')}>
            <div className="icon">
              <ChildIcon width="25" />
              <span className="text">
                <FormattedMessage id="children" defaultMessage="Children" />
              </span>
            </div>
            <div className="countInputWrapper">
              <Input className="countInput" value={data.occupancy.children} />
              <NumberInput className="customNumberInput" name="children" value={0} onChange={onChange} />
              <div className="iconsWrapper">
                <PlusIcon onClick={() => onChange('children')(data.occupancy.children + 1)} />
                <MinusIcon onClick={() => onChange('children')(data.occupancy.children - 1)} />
              </div>
            </div>
          </div>
          <div className={classNames('itemWrapper', 'countWrapper')}>
            <div className="icon">
              <BedIcon width="25" />
              <span className="text">Rooms</span>
            </div>
            <div className="countInputWrapper">
              <Input className="countInput" value={data.nights} />
              <NumberInput className="customNumberInput" name="nights" value={1} onChange={onChange} />
              <div className="iconsWrapper">
                <PlusIcon onClick={() => onChange('nights')(data.nights + 1)} />
                <MinusIcon onClick={() => onChange('nights')(data.nights - 1)} />
              </div>
            </div>
          </div>
          <div className={classNames('itemWrapper', 'currency')}>
            <Select options={currencyOptions} value={get(currency, 'value')} onChange={onCurrencyChange} />
          </div>
        </div>
      )}
      <div className="footer-wrapper">
        <EditPanelFooter onSubmit={onSubmit} />
      </div>
    </div>
  );
};

const EditPanelFooter = ({ onSubmit }) => (
  <div className={classNames('itemWrapper', 'footer')}>
    <div className="cancel">
      <Button>
        <FormattedMessage id="cancel" defaultMessage="Cancel" />
      </Button>
    </div>
    <div className="search">
      <Button onClick={onSubmit}>
        <FormattedMessage id="search" defaultMessage="Search" />
      </Button>
    </div>
    {/* <div className="closeIcon"> */}
    {/*  <CloseIcon onClick={() => toggleEdit(false)} /> */}
    {/* </div> */}
  </div>
);

const EditPanel = ({ ...props }) => (
  <>
    <div className="editPanelWrapper">
      <EditPanelBody {...props} />
    </div>
  </>
);

export default EditPanel;
