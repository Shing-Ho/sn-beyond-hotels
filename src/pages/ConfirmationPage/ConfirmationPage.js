import React from 'react';
import { Row, Col } from 'antd';
import { useSelector } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';
import _ from 'lodash';

import { getCurrency } from 'store/core/selectors';
import Page from 'components/Page/Page';
import Button from 'components/Button/Button';
import { getBookingPayload, getBookingHotelPayload, getPaymentPayload } from '../../store/booking/selectors';
import { getSelectedHotel } from '../../store/hotel/selectors';
import ConfirmationLeft from './components/ConfirmationLeft/ConfirmationLeft';
import ConfirmationRight from './components/ConfirmationRight/ConfirmationRight';
import ConfirmationHeader from './components/ConfirmationHeader/ConfirmationHeader';
import ConfirmationBottom from './components/ConfirmationBottom/ConfirmationBottom';
import styles from './ConfirmationPage.module.scss';

export default function ConfirmationPage() {
  const preSelectedRooms = useSelector(getBookingPayload);
  const bookingHotelPayload = useSelector(getBookingHotelPayload);
  const paymentPayload = useSelector(getPaymentPayload);
  const currency = useSelector(getCurrency);
  const selectedHotel = useSelector(getSelectedHotel);
  const intl = useIntl();

  const getHeaderItems = () => {
    const list = [];
    if (preSelectedRooms.hotel_id) {
      list.push({
        label: intl.formatMessage({ id: 'orderNumber', defaultValue: 'ORDER NUMBER' }),
        value: _.get(bookingHotelPayload, 'reservation.locator.id', ''),
      });
    }
    let total = 0;
    if (preSelectedRooms.room_rate)
      list.push({
        label: intl.formatMessage({ id: 'items', defaultValue: 'ITEMS' }),
        value: preSelectedRooms.room_rate.length,
      });
    preSelectedRooms.room_rate.forEach((each) => {
      total += parseFloat(_.get(each, 'roomDetails.total.amount', 0), 0);
    });
    if (preSelectedRooms.room_rate)
      list.push({ label: intl.formatMessage({ id: 'total', defaultValue: 'TOTAL' }), value: total.toFixed(2) });
    return list;
  };

  return (
    <Page>
      <ConfirmationHeader items={getHeaderItems()} currency={currency} />
      <div className={styles.content}>
        <Row gutter={24}>
          <Col span={16} xs={24}>
            <ConfirmationLeft
              selectedHotel={selectedHotel}
              hotelDetail={preSelectedRooms.room_rate}
              bookingHotelPayload={bookingHotelPayload}
              currency={currency}
            />
          </Col>
          <Col span={8} xs={24}>
            <ConfirmationRight
              paymentPayload={paymentPayload}
              bookingHotelPayload={bookingHotelPayload}
              currency={currency}
            />
          </Col>
        </Row>
        <ConfirmationBottom currency={currency} />
      </div>
      <div className={styles.buttonsGroup}>
        <div className={styles.leftButton}>
          <Button size="large" invert>
            <FormattedMessage id="confirmationPage.continueShopping" defaultMessage="Continue Shopping" />
          </Button>
        </div>
        <Button size="large">
          <FormattedMessage id="confirmationPage.viewAllOrders" defaultMessage="View All Orders" />
        </Button>
      </div>
    </Page>
  );
}
