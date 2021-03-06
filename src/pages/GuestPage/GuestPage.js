import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Form } from 'antd';
import { FormattedMessage } from 'react-intl';
import history from 'store/history';
import Page from 'components/Page/Page';
import bookingActions from 'store/booking/actions';
import Button from 'components/Button/Button';
import Drawer from 'components/Drawer/Drawer';
import {
  getGuestContactInformation,
  getSelectedHotel,
  getSelectedRoomItems,
  getTotalBookingAmount,
} from 'store/booking/selectors';
import { getCurrency } from 'store/core/selectors';
import { Currencies } from 'helpers/constants';
import GuestHeader from './components/GuestHeader/GuestHeader';
import AdditionalForm from './components/AdditionalForm/AdditionalForm';
import PrimaryContactFormContainer from './components/PrimaryContactFormContainer/PrimaryContactFormContainer';
import ItineraryDetail from '../PaymentsPage/components/ItineraryDetail/ItineraryDetail';
import styles from './GuestPage.module.scss';

export default function GuestPage() {
  const formKey = 'guestInformation';
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const selectedHotel = useSelector(getSelectedHotel);
  const selectedRooms = useSelector(getSelectedRoomItems);
  const contactInfo = useSelector(getGuestContactInformation);
  const totalAmount = useSelector(getTotalBookingAmount);
  const currency = useSelector(getCurrency);
  const [primaryContact, setPrimaryContact] = useState({});
  // set primary checked to true as default
  const [items, setItems] = useState((selectedRooms || []).map((v) => ({ ...v, primary: true })));

  const currencySymbol = Currencies[items[0]?.avg_nightly_rate?.currency || 'USD']?.symbol;

  const changeItem = (cItem, index) => {
    const tItem = [...items];
    tItem[index - 1] = cItem;
    setItems(tItem);
  };

  const handleFormSubmit = async () => {
    try {
      await form.validateFields();
      const allConatct = { primaryContact, items };
      dispatch(bookingActions.setGuestContactInformation(allConatct));

      history.push('payments');
    } catch (error) {
      // console.log(error);
    }
  };

  const goBack = () => {
    history.push(`hotels/${selectedHotel.hotel_id}`);
  };

  return (
    <Page>
      <Form form={form} initialValues={contactInfo?.primaryContact || primaryContact} name={formKey} layout="vertical">
        <GuestHeader />
        <div className={styles.content}>
          <Row gutter={24}>
            <Col md={{ span: 16 }} xs={{ span: 24 }}>
              <PrimaryContactFormContainer
                primaryContact={contactInfo?.primaryContact || primaryContact}
                setPrimaryContact={setPrimaryContact}
              />
              {items.map((item, index) => (
                <div key={`additionalForm_${index + 1}`} className={styles.detail}>
                  <AdditionalForm
                    item={item}
                    index={index + 1}
                    changeItem={changeItem}
                    name={selectedHotel.hotel_details.name}
                  />
                </div>
              ))}
            </Col>
            <Col md={{ span: 8 }} xs={{ span: 0 }}>
              <ItineraryDetail items={selectedRooms} currency={currency} />
            </Col>
          </Row>
        </div>
        <div className={styles.bottom}>
          <div className={styles.wrapper}>
            <div className={styles.totalSection}>
              <span>
                {currencySymbol} {totalAmount.toFixed(2)}
              </span>
              <span>
                <FormattedMessage id="total" defaultMessage="Total" />
              </span>
            </div>
            <div className={styles.backCheckoutBtn}>
              <Button size="large" invert onClick={goBack}>
                <FormattedMessage id="back" defaultMessage="Back" />
              </Button>
              <Button size="large" onClick={handleFormSubmit}>
                <FormattedMessage id="checkOut" defaultMessage="Check Out" />
              </Button>
            </div>
          </div>
        </div>
        <Drawer
          header={
            <div className={styles.drawerHeader}>
              <div className={styles.drawalTotalSection}>
                <span>
                  {currencySymbol} {totalAmount.toFixed(2)}
                </span>
                <span>
                  <FormattedMessage id="total" defaultMessage="Total" />
                </span>
              </div>
              <span>
                <b>{items.length || 0}</b> <FormattedMessage id="items" defaultMessage="Items" />
              </span>
            </div>
          }
          footer={
            <div className={styles.drawerBottom}>
              <div className={styles.drawalTotalSection}>
                <span>{`${currencySymbol} ${totalAmount.toFixed(2)}`}</span>
                <span>
                  <FormattedMessage id="total" defaultMessage="Total" />
                </span>
              </div>
              <Button size="large" onClick={handleFormSubmit}>
                <FormattedMessage id="checkOut" defaultMessage="Check Out" />
              </Button>
            </div>
          }
        >
          <ItineraryDetail items={selectedRooms} currency={currency} />
        </Drawer>
      </Form>
    </Page>
  );
}
