import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { Spin, Drawer } from "antd";
import moment from "moment";
import Page from "components/Page/Page";
import TopFilters from "components/TopFilters/TopFilters";
import HotelLeftFilters from "./components/Filters/HotelLeftFilters";
import Results from "./components/Results/Results";
import hotelActions from "store/hotel/actions";
import {
  getLoading,
  getFetchingRecords,
  getError,
} from "store/hotel/selectors";
import { getCurrency } from "store/core/selectors";
import bookingActions from "store/booking/actions";
import styles from "./HotelSearchPage.module.scss";

const initialState = {
  location: {
    location_id: "5128581",
    location_name: "New York City",
    iso_country_code: "USA",
  },
  start_date: moment().add(1, "day").format("YYYY-MM-DD"),
  end_date: moment().add(2, "day").format("YYYY-MM-DD"),
  occupancy: {
    adults: 2,
    children: 0,
  },
  nights: 1,
  language: "en",
  currency: "USD",
};

const HotelSearchPage = ({ noHeader, noFooter, display }) => {
  const dispatch = useDispatch();
  const loading = useSelector(getLoading);
  const fetchingRecords = useSelector(getFetchingRecords);
  const currency = useSelector(getCurrency);
  const error = useSelector(getError);
  const params = useLocation();
  const [showDrawer, toggleDrawer] = useState(false);

  useEffect(() => {
    if (params.search) {
      const urls = queryString.parse(params.search);
      const payload = {
        location_id: "5128581",
        start_date: moment().add(1, "day").format("YYYY-MM-DD"),
        end_date: moment().add(2, "day").format("YYYY-MM-DD"),
        occupancy: {
          adults: 2,
          children: 0,
        },
        language: "en",
      };
      if (urls.hotelID) {
        payload.hotel_id = urls.hotelID;
      }
      if (urls.date1 && urls.date2) {
        payload.start_date = urls.date1;
        payload.end_date = urls.date2;
      }
      if (urls.adults) {
        payload.occupancy.adults = urls.adults;
      }
      if (urls.children) {
        payload.occupancy.children = urls.child;
      }
      if (urls.rooms) {
        payload.occupancy.num_rooms = urls.rooms;
      }
      if (urls.currency) {
        payload.currency = urls.currency;
      }
      dispatch(hotelActions.searchHotels(payload));
    } else {
      dispatch(hotelActions.searchHotels());
      dispatch(bookingActions.setBookingPayload(""));
    }
  }, [params, dispatch]);

  // useEffect(() => {
  //   console.log('error', error)
  //   if(error && error.status_code) {
  //     alert(error.detail)
  //   }
  // }, [error])

  return (
    <Page noHeader noFooter >
      <div className={styles.root}>
        <div className={styles.container}>
          {
            display &&
            <TopFilters currency={currency} initialState={initialState}/>
          }
          <div className={styles.main}>
            <Drawer
              className="left-filter-drawer"
              visible={showDrawer}
              placement="bottom"
              closable
              onClose={() => toggleDrawer(false)}
              height="90%"
              width="100%"
            >
              <HotelLeftFilters currency={currency} />
            </Drawer>
            <div className={styles.leftFilter}>
              <HotelLeftFilters currency={currency} />
            </div>
            {loading || fetchingRecords ? (
              <div className={styles.loaderContainer}>
                <Spin size="large" />
              </div>
            ) : (
              <Results toggleDrawer={toggleDrawer} currency={currency} />
            )}
          </div>
        </div>
      </div>
    </Page>
  );
};

export default HotelSearchPage;
