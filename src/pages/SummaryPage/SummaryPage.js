import React from 'react';
import {Row, Col} from 'antd';
import { useSelector } from "react-redux";
import _ from 'lodash';

import Page from 'components/Page/Page';
import Button from 'components/Button/Button';
// import { getBookingPayload, getBookingHotelPayload, getPaymentPayload } from "../../store/booking/selectors";
import SummaryLeft from './components/SummaryLeft/SummaryLeft';
// import SummaryRight from './components/SummaryRight/SummaryRight';
import SummaryHeader from './components/SummaryHeader/SummaryHeader';
import SummaryBottom from './components/SummaryBottom/SummaryBottom';
import styles from './SummaryPage.module.scss';
import {getCancelLookupResponse} from 'store/hotel/selectors';

export default function SummaryPage() {
  const cancelLookupResponse = useSelector(getCancelLookupResponse);
  // const preSelectedRooms = useSelector(getBookingPayload);
  // const bookingHotelPayload = useSelector(getBookingHotelPayload);
  // const paymentPayload = useSelector(getPaymentPayload);
  
  // console.log(preSelectedRooms)
  // console.log(bookingHotelPayload)
  // console.log(paymentPayload)

  const getHeaderItems = () => {
    const list = [];
    // preSelectedRooms.hotel_id && list.push({label: 'ORDER NUMBER', value: _.get(bookingHotelPayload, 'reservation.locator.id', '')})
    // preSelectedRooms.room_rate && list.push({label: 'ITEMS', value: preSelectedRooms.room_rate.length})
    if (cancelLookupResponse.itinerary) {
      list.push({label: 'ORDER NUMBER', value: _.get(cancelLookupResponse, 'itinerary.confirmation')})
      list.push({label: 'ITEMS', value: 1})
      // cancelLookupResponse.room_rate && list.push({label: 'TOTAL', value: total.toFixed(2)})
      list.push({label: 'TOTAL', value: _.get(cancelLookupResponse, 'itinerary.price.amount')})
    }
    return list;
  }

  return (
    <Page>
      <SummaryHeader items={getHeaderItems()} />
      <div className={styles.content}>
        <Row gutter={24}>
          <Col span={24}>
            <SummaryLeft
              {...cancelLookupResponse}
              detail={cancelLookupResponse.itinerary}
              penalty={_.get(cancelLookupResponse, 'details.penalty_amount')}
            />
          </Col>
          {/* <Col span={8}>
            <SummaryRight detail={cancelLookupResponse} />
          </Col> */}
        </Row>
        <SummaryBottom />
      </div>
      <div className={styles.buttonsGroup}>
        <div className={styles.leftButton}>
          <Button size='large' invert >Continue Shopping</Button>
        </div>
        <Button size='large'>View All Orders</Button>
      </div>
    </Page>
  )
}