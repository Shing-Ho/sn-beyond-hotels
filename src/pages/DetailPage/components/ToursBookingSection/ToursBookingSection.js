import React, { useState } from 'react';
import { Button, Input, Select } from 'antd';
import cx from 'classnames';
import { FormattedMessage } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import DatePicker from 'components/DatePicker/DatePicker';
import Divider from 'components/Divider/Divider';
import Complete from 'components/AutoComlete/AutoComplete';
import { ReactComponent as CloseIcon } from 'icons/close-fill.svg';
import { getStandardCountries, getBookingError } from 'store/adventure/selectors';
import adventureActions from 'store/adventure/actions';
import styles from './ToursBookingSection.module.scss';

const { Option } = Select;

export default function ToursBookingSection({ className, tourInfo }) {
  const standardCountries = useSelector(getStandardCountries);
  const errorMessage = useSelector(getBookingError);
  const salutations = ['Mr.', 'Mrs.', 'Ms.'];
  const [formValues, setFormValues] = useState({});
  const dispatch = useDispatch();

  const onBookNowClick = () => {
    const params = {
      ...formValues,
      trip_code: tourInfo?.TripCode,
    };
    if (!params.dep_id) {
      params.dep_id = tourInfo?.Departure?.Id;
    }
    dispatch(adventureActions.bookTrip(params));
  };
  const onLocationSelect = (e) => {
    setFormValues({
      ...formValues,
      hotel_location: `${e.location_name},${e.iso_country_code}`,
    });
  };
  const onDateChange = (date, field) => {
    setFormValues({
      ...formValues,
      [field]: date,
    });
  };
  const onFieldChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };
  const onSelectChange = (field, value) => {
    setFormValues({
      ...formValues,
      [field]: value,
    });
  };
  const clearData = () => {};
  const getTotalPrice = () => {
    if (!tourInfo?.AdultPrice || !tourInfo?.ChildPrice || formValues.num_adult < 1) {
      return 0;
    }
    let price = tourInfo?.AdultPrice * formValues.num_adult;
    if (formValues.num_child > 0) {
      price += tourInfo?.ChildPrice * formValues.num_child;
    }
    return price;
  };

  return (
    <div className={cx(styles.root, className)}>
      <div className={styles.bookContent}>
        <div className="w-100">
          <DatePicker
            className="w-100"
            placeholder="Departure date"
            format="DD/MM/YYYY"
            onChange={(_, date) => onDateChange(date, 'dep_date')}
          />
          {tourInfo?.Departure?.length && (
            <Select className="w-100" placeholder="Select a departure" onChange={(e) => onSelectChange('dep_id', e)}>
              {tourInfo?.Departure.map((d) => (
                <Option key={d.Id} value={d.Id}>
                  {d.DepMin} - {d.EndMin !== '-1' ? d.EndMin : ''}
                </Option>
              ))}
            </Select>
          )}
          <Input
            className="w-100"
            placeholder="Number of adult"
            type="number"
            name="num_adult"
            onChange={onFieldChange}
          />
          <Input
            className="w-100"
            placeholder="Number of child"
            type="number"
            name="num_child"
            onChange={onFieldChange}
          />
          <Input
            className="w-100"
            placeholder="Promo code (optional)"
            type="text"
            name="promo_code"
            onChange={onFieldChange}
          />
          <Input
            className="w-100"
            placeholder="Gift certificate code (optional)"
            type="text"
            name="gift_cert"
            onChange={onFieldChange}
          />
          <Complete
            className="w-100"
            value={formValues.hotel_location}
            placeholder="Hotel location (optional)"
            onSelect={onLocationSelect}
            clearData={clearData}
          />
          <Input
            className="w-100"
            placeholder="Speical request (optional)"
            type="text"
            name="request"
            onChange={onFieldChange}
          />
        </div>
        <Divider margin={20} />
        <div className="w-100">
          <h3>Traveler Info</h3>
          <Select className="w-100" placeholder="Select a salutation" onChange={(e) => onSelectChange('salutation', e)}>
            {salutations.map((s) => (
              <Option key={s}>{s}</Option>
            ))}
          </Select>
          <Input className="w-100" name="first_name" placeholder="First name" type="text" onChange={onFieldChange} />
          <Input className="w-100" name="last_name" placeholder="Last name" type="text" onChange={onFieldChange} />
          <DatePicker
            className="w-100"
            placeholder="Date of birthday (optional)"
            format="DD/MM/YYYY"
            onChange={(_, date) => onDateChange(date, 'dob')}
          />
          <Select
            className="w-100"
            placeholder="Select your country"
            onChange={(e) => onSelectChange('standard_country_id', e)}
          >
            {standardCountries.map((s) => (
              <Option key={s.Name} value={s.Id}>
                {s.Name}
              </Option>
            ))}
          </Select>
          <Input className="w-100" name="phone" placeholder="Phone" type="tel" onChange={onFieldChange} />
          <Input className="w-100" name="mobile" placeholder="Mobile (optional)" type="tel" onChange={onFieldChange} />
          <Input className="w-100" name="email" placeholder="Email" type="email" onChange={onFieldChange} />
          <Input
            className="w-100"
            name="password"
            placeholder="Password (optional)"
            type="password"
            onChange={onFieldChange}
          />
        </div>
        <Divider margin={20} />
        <div className="w-100">
          <h3>Other traveler Info (optional)</h3>
          <Select
            className="w-100"
            placeholder="Select a salutation"
            onChange={(e) => onSelectChange('other_salutation', e)}
          >
            {salutations.map((s) => (
              <Option key={s}>{s}</Option>
            ))}
          </Select>
          <Input
            className="w-100"
            name="other_first_name"
            placeholder="First name"
            type="text"
            onChange={onFieldChange}
          />
          <Input
            className="w-100"
            name="other_last_name"
            placeholder="Last name"
            type="text"
            onChange={onFieldChange}
          />
          <DatePicker
            className="w-100"
            placeholder="Date of birthday (optional)"
            format="DD/MM/YYYY"
            onChange={(_, date) => onDateChange(date, 'other_dob')}
          />
          <Select className="w-100" placeholder="Select a type" onChange={(e) => onSelectChange('is_adult', e)}>
            <Option value="1">Adult</Option>
            <Option value="0">Child</Option>
          </Select>
        </div>
        <div className={styles.yourOrder}>
          <span>
            <FormattedMessage id="yourOrder" defaultMessage="Your Order" />
          </span>
          {formValues.num_adult > 0 && tourInfo?.AdultPrice && (
            <div>
              <FormattedMessage id="adult_price" defaultMessage="Adult" />
              <span>
                {formValues.num_adult * tourInfo?.AdultPrice}
                <CloseIcon />
              </span>
            </div>
          )}
          {formValues.num_child > 0 && tourInfo?.ChildPrice && (
            <div>
              <FormattedMessage id="child_price" defaultMessage="Child" />
              <span>
                {formValues.num_child * tourInfo?.ChildPrice}
                <CloseIcon />
              </span>
            </div>
          )}
        </div>
        <div className={styles.total}>
          <span>
            <FormattedMessage id="total" defaultMessage="Total" />
          </span>
          <span className={styles.totalCost}>$ {getTotalPrice()}</span>
        </div>
      </div>
      {errorMessage && <p className={styles.errorText}>{errorMessage}</p>}
      <Button className={styles.bookNow} onClick={onBookNowClick}>
        <FormattedMessage id="orderNow" defaultMessage="Order Now" />
      </Button>
    </div>
  );
}
