import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FormattedMessage } from 'react-intl';
import Pagination from "components/Pagination/Pagination";
import ResultItem from "components/ResultItem/ResultItem";

import hotelActions from "store/hotel/actions";
import {
  getTotalCount,
  getHotels,
  getvisibleHotels,
} from "store/hotel/selectors";

import styles from "./Results.module.scss";

const ResultsList = ({ filteredHotels, currency }) => {
  let hotels = useSelector(getHotels);
  let visibleHotels = useSelector(getvisibleHotels);
  const count = useSelector(getTotalCount);
  const dispatch = useDispatch();

  if (filteredHotels) {
    hotels = filteredHotels;
  }

  if (!hotels || !hotels.length === 0) return null;

  const onPageChange = (page, pageSize) => {
    dispatch(hotelActions.onPageChange(page, pageSize));
  };

  return (
    <>
      <div className={styles.items}>
        {!!visibleHotels.length ? (
          visibleHotels.map((hotel) => (
            <ResultItem hotel={hotel} currency={currency} key={hotel.hotel_id} />
          ))
        ) : (
          <div className={styles.noRecordsFound}>
            <FormattedMessage id="noResultsFound" defaultMessage="No Results Found" />
          </div>
        )}
      </div>
      {!!visibleHotels.length && count > 0 && (
        <div className={styles.pagination}>
          <Pagination
            total={count}
            showSizeChanger
            showQuickJumper
            onChange={onPageChange}
            onShowSizeChange={(current, size) => onPageChange(0, size)}
          />
        </div>
      )}
    </>
  );
};

export default ResultsList;
