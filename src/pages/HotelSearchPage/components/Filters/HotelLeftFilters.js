import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { Form, Input, InputNumber } from 'antd';
import { useIntl } from 'react-intl';

import FormItem from 'components/FormItem/FormItem';
import Rating from 'components/Rating/Rating';
import CheckboxGroup from 'components/CheckboxGroup/CheckboxGroup';
import Collapse from 'components/Collapse/Collapse';
import { getHotels, getFilters } from 'store/hotel/selectors';
import hotelActions from 'store/hotel/actions';
import popularBrandsJson from 'helpers/jsons/popular-brands.json';

import styles from './HotelLeftFilters.module.scss';

const popularBrandOptions = Object.keys(popularBrandsJson);

const HotelLeftFilters = ({ currency }) => {
  const [form] = Form.useForm();
  const intl = useIntl();
  const dispatch = useDispatch();

  const filters = useSelector(getFilters);
  const hotels = useSelector(getHotels);

  const [keyword, setKeyword] = useState('');
  const [popularBrands, setPopularBrands] = useState([]);
  const [amenities, setAmenities] = useState([]);

  const debouncedFunction = useRef(
    _.debounce((key) => {
      dispatch(hotelActions.onFilterChange({ keyword: key }));
    }, 500),
  );

  // get the amenities from the result data with reduce and memo to improve performance
  const allAmenitiesOption = useMemo(() => {
    // reduce to get all the amenities from the result array
    const amenitiesArr = hotels.reduce((arr, hotel) => [...arr, ...(hotel?.hotel_details?.amenities || [])], []);

    // get the uniq records and format them to display
    return _.uniq(amenitiesArr).map((hotel) => ({
      title: intl.formatMessage({ id: `searchPage.filters.amenity.${hotel.toLowerCase()}`, defaultValue: hotel }),
      value: hotel,
    }));
  }, [hotels, intl]);

  useEffect(() => debouncedFunction.current(keyword), [keyword]);

  useEffect(() => {
    const selectedAmenities = allAmenitiesOption.filter((op) => amenities.indexOf(op.title) >= 0).map((op) => op.value);
    dispatch(hotelActions.onFilterChange({ amenities: selectedAmenities, brands: popularBrands }));
  }, [dispatch, amenities, popularBrands]);

  const allPopularBrandOptions = useMemo(() => {
    const res = popularBrandOptions.filter((option) => {
      const chainCodeArr = popularBrandsJson[option].map((o) => o.chainCode);
      const chainNameArr = popularBrandsJson[option].map((o) => o.chainName);
      return hotels
        .map(
          (hotel) =>
            chainCodeArr.includes(hotel.hotel_details.chain_code) ||
            chainNameArr.includes(hotel.hotel_details.chain_name),
        )
        .some((v) => v);
    });
    return res.map((option) =>
      intl.formatMessage({
        id: `searchPage.filters.brand.${option.toLowerCase().replace(/\s/g, '_')}`,
        defaultValue: option,
      }),
    );
  }, [hotels, intl]);

  const onMinChange = (value) => {
    dispatch(hotelActions.onFilterChange({ minPrice: value }));
  };

  const onMaxChange = (value) => {
    dispatch(hotelActions.onFilterChange({ maxPrice: value }));
  };

  const onRateChange = (value) => {
    dispatch(hotelActions.onFilterChange({ starRating: value }));
  };

  return (
    <div className={styles.root}>
      <div className={styles.summary}>
        <div className={styles.header}>
          <h3 className={styles.header}>Filters</h3>
          <div className={styles.valueNumber}>
            <span>264</span>
            <h6>Rooms</h6>
          </div>
        </div>
      </div>
      <Form className={styles.summary} layout="vertical" form={form}>
        <FormItem label={intl.formatMessage({ id: 'keywordSearch', defaultValue: 'Hotel Name Search' })}>
          <Input
            placeholder="Downtown Marriott..."
            suffix={<span className="fa fa-search" />}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </FormItem>
        <FormItem
          className="item-content"
          label={intl.formatMessage({ id: 'priceRange', defaultValue: 'Price Range' })}
        >
          <InputNumber
            defaultValue={0}
            formatter={(value) => `${currency?.symbol} ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
            style={{ width: '44%' }}
            onChange={onMinChange}
          />
          <div className={styles.inputDivider}>
            <span />
          </div>
          <InputNumber
            defaultValue={1000}
            formatter={(value) => `${currency?.symbol} ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
            style={{ width: '44%' }}
            onChange={onMaxChange}
          />
        </FormItem>
        <FormItem label="Star Rating">
          <Rating
            scoreonly
            className={styles.starRating}
            score={filters.starRating || 0}
            size={36}
            onChange={onRateChange}
          />
        </FormItem>
        {/* <FormItem label={intl.formatMessage({ id: "userRating", defaultValue: "User Rating" })} >
					<Slider range defaultValue={[ 3, 5 ]} min={1} max={5} />
				</FormItem> */}
        <FormItem>
          <Collapse header={intl.formatMessage({ id: 'popularBrands', defaultValue: 'Popular Brands' })}>
            <CheckboxGroup options={allPopularBrandOptions} value={popularBrands} onChange={setPopularBrands} />
          </Collapse>
        </FormItem>
        <FormItem>
          <Collapse header={intl.formatMessage({ id: 'amenities', defaultValue: 'Amenities' })}>
            <CheckboxGroup
              options={allAmenitiesOption.map((opt) => opt.title)}
              value={amenities}
              onChange={setAmenities}
            />
          </Collapse>
        </FormItem>
      </Form>
    </div>
  );
};

export default HotelLeftFilters;
