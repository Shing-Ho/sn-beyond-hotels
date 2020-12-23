import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { Spin } from 'antd';
import { useIntl } from 'react-intl';
import moment from 'moment';
import queryString from 'query-string';

import Page from 'components/Page/Page';
import Carousel from 'components/Carousel/Carousel';
// import OtherSection from './components/OtherSection/OtherSection';
// import history from 'store/history';
import hotelActions from 'store/hotel/actions';
// import bookingActions from 'store/booking/actions';
import { getLoading } from 'store/hotel/selectors';
import DiningSection from './components/DiningSection/DiningSection';
// import BookingSection from './components/BookingSection/BookingSection';
import DiningListSection from './components/DiningListSection/DiningListSection';
import styles from './DiningDetailPage.module.scss';
import { getBookingPayload, getSelectedHotel } from '../../store/booking/selectors';

const DetailPage = () => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [, setRoomCounts] = useState({});
  // const [formData] = useState({});
  const hotel = useSelector(getSelectedHotel);
  const preSelectedRooms = useSelector(getBookingPayload);
  const loading = useSelector(getLoading);
  const dispatch = useDispatch();
  const params = useParams();
  const intl = useIntl();
  const urlParams = useLocation();

  useMemo(() => {
    if (!preSelectedRooms) {
      return;
    }

    const newData = [];
    const countObj = {};
    preSelectedRooms.room_rate.forEach((room) => {
      countObj[room.code] = room.room_count;
      newData.push(room.code);
    });
    setSelectedRooms(newData);
    setRoomCounts(countObj);
  }, [preSelectedRooms]);

  useEffect(() => {
    if (urlParams.search) {
      // console.log('params', urlParams, queryString.parse(urlParams.search));
      const urls = queryString.parse(urlParams.search);
      // console.log(urls);
      const payload = {
        hotel_id: urls.hotelID,
        start_date: moment().format('YYYY-MM-DD'),
        end_date: moment().add(1, 'day').format('YYYY-MM-DD'),
        occupancy: {
          adults: 2,
          children: 0,
        },
        language: 'en',
        currency: 'USD',
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
      dispatch(hotelActions.searchHotelById(params.id, payload));
      // dispatch(hotelActions.searchHotels(payload));
    } else {
      // dispatch(hotelActions.searchHotels());
      // dispatch(bookingActions.setBookingPayload(""));
    }
  }, [urlParams, dispatch]);

  useEffect(() => {
    if (!hotel) {
      const payload = {
        hotel_id: params.id,
        start_date: moment().format('YYYY-MM-DD'),
        end_date: moment().add(1, 'day').format('YYYY-MM-DD'),
        occupancy: {
          adults: 2,
          children: 0,
        },
        language: 'en',
        currency: 'USD',
      };
      dispatch(hotelActions.searchHotelById(params.id, payload));
    } else {
      const maps = {};
      hotel.room_types.forEach((type) => {
        const room = (preSelectedRooms ? preSelectedRooms.room_rate : []).find((r) => r.code === type.code);
        maps[type.code] = room ? room.room_count || 1 : 1;
      });
      setRoomCounts(maps);
    }
  }, [dispatch, hotel, params.id, preSelectedRooms, intl]);

  const startDate = moment(hotel?.start_date);
  const endDate = moment(hotel?.end_date);
  const nights = endDate.diff(startDate, 'days');

  const handleRoomItemClick = (code, isDeselect) => (e) => {
    e.stopPropagation();
    const newSelectedRooms = selectedRooms.filter((v) => code !== v);
    if (!isDeselect) {
      newSelectedRooms.push(code);
    }
    setSelectedRooms([code]);
  };

  // const selectedRoomObjs = useMemo(
  //   () =>
  //     selectedRooms.map((roomCode) => {
  //       const room = hotel.room_types.find((roomType) => roomType.code === roomCode);
  //       return {
  //         ...room,
  //         roomCount: roomCounts[roomCode],
  //       };
  //     }),
  //   [selectedRooms, hotel, roomCounts],
  // );

  // const handleBookClick = () => {
  //   const isFormValid = true;
  //   // TODO: discuss multi room booking
  //   const payload = {
  //     hotel_id: hotel.hotel_id,
  //     checkin: formData.checkin,
  //     checkout: formData.checkout,
  //     language: 'en_US',
  //     room_rate: selectedRooms.map((code) => ({
  //       code,
  //       roomDetails: hotel.room_types.find((r) => r.code === code),
  //       room_type_code: 'S44EJD',
  //       rate_plan_code: 'T23442A',
  //       maximum_allowable_occupancy: {
  //         adults: 2,
  //         children: 0,
  //       },
  //       total_price_at_booking: {
  //         currency: 'USD',
  //         amount: formData.totalCost,
  //       },
  //       cancellation_rules: [
  //         {
  //           summary: 'UNKNOWN_CANCELLATION_POLICY',
  //           cancellation_deadline: '2020-09-09T11:19:11.916Z',
  //           unstructed_policy: 'string',
  //         },
  //       ],
  //       unstructured_policies: ['string'],
  //       room_count: roomCounts[code],
  //     })),
  //   };

  // if (!payload.room_rate.room_count) {
  //   isFormValid = false;
  // }

  //   if (!isFormValid) {
  //     notification.open({
  //       key: 'bookingFormVerification',
  //       message: intl.formatMessage({ id: 'error' }),
  //       description: intl.formatMessage({ id: 'detailPage.notification.description' }),
  //     });
  //     return;
  //   }

  //   dispatch(bookingActions.setBookingPayload(payload));

  //   history.push(`${window.BASE_ROUTE || ''}/guest`);
  // };

  if (!hotel) {
    return (
      <div className={styles.loaderContainer}>
        <Spin size="large" />
      </div>
    );
  }
  return (
    <Page>
      {loading && (
        <div className={styles.loaderContainerAbsolute}>
          <Spin size="large" />
        </div>
      )}
      <>
        <Carousel image={hotel.hotel_details.photos} />
        <div className={styles.root}>
          <div className={styles.content}>
            <div className={styles.detail}>
              <DiningListSection
                className={styles.left}
                hotel={hotel}
                nights={nights}
                selectedRooms={selectedRooms}
                onRoomItemClick={handleRoomItemClick}
              />
              <DiningSection />
            </div>
          </div>
        </div>
      </>
    </Page>
  );
};

export default DetailPage;
