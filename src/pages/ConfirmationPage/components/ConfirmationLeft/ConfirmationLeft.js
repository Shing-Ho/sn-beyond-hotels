/* eslint-disable react/no-array-index-key */
import React from 'react';

import FormWithHeader from 'components/FormWithHeader/FormWithHeader';
import ConfirmationDetailForm from '../ConfirmationDetailForm/ConfirmationDetailForm';
import styles from './ConfirmationLeft.module.scss';

export default function ConfirmationLeft({ selectedHotel, hotelDetail, bookingHotelPayload, currency }) {
  return (
    <div>
      <div className={styles.hotelDetail}>{selectedHotel?.hotel_details?.name || ''}</div>
      <div className={styles.hotelDetail}>{selectedHotel?.hotel_details?.address?.address1 || ''}</div>
      <div className={styles.hotelDetail}>
        {`${selectedHotel?.hotel_details?.address?.city || ''} ${
          selectedHotel?.hotel_details?.address?.province || ''
        }${selectedHotel?.hotel_details?.address?.country || ''}`}
      </div>
      <div className={styles.lastHotelDetail}>{selectedHotel?.hotel_details?.address?.postal_code || ''}</div>
      <FormWithHeader
        left="Booked Itineary"
        right={`${hotelDetail.length} Item${hotelDetail.length > 1 ? 's' : ''} Booked`}
      >
        {hotelDetail.map((each, index) => (
          <ConfirmationDetailForm
            key={index}
            startDate={bookingHotelPayload.reservation.checkin}
            endDate={bookingHotelPayload.reservation.checkout}
            currency={currency}
            {...each}
            booking_id={bookingHotelPayload.booking_id}
            index={index}
          />
        ))}
      </FormWithHeader>
      {/* <FormWithHeader left="Needs Vendor Confirmation" right={`${vendor.length} Item${vendor.length > 1 ? 's' : ''} Pending`}>
        {
          vendor.map((each, index) => (
            <ConfirmationDetailForm {...each} index={index} />
          ))
        }
        <div className={styles.infoContainer}>
          <InfoIcon />
          <span>Then Vendor(s) will provide confirmation shortly. you will not be charged until a confirmation is received.</span>
        </div>
      </FormWithHeader> */}
    </div>
  );
}
