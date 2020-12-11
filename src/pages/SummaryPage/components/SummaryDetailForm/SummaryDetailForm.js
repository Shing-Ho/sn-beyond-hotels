import React, {useEffect, useState} from 'react';
import moment from 'moment';
import cx from 'classnames'
import {Modal} from 'antd';
import { useSelector, useDispatch } from "react-redux";


import SummaryFormHeader from '../SummaryFormHeader/SummaryFormHeader';
import styles from './SummaryDetailForm.module.scss';
import Collapse from 'components/Collapse/Collapse';
import Button from 'components/Button/Button';
import { ReactComponent as CalendarIcon } from 'icons/calendar.svg';
import { ReactComponent as BedIcon } from 'icons/bed3.svg';
import { ReactComponent as PinIcon } from 'icons/pin.svg';
import { ReactComponent as PlusIcon } from 'icons/plusBlue.svg';
import hotelActions from 'store/hotel/actions';
import { getCancelOrderResponse } from 'store/hotel/selectors';

export default function SummaryDetailForm(props) {
  const {address, name, confirmation, price, index, startDate, endDate, penalty, booking_id, last_name} = props;
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch();
  const cancelOrderResponse = useSelector(getCancelOrderResponse);

  const formatDate = (timestamp) => {
    return moment(new Date(timestamp)).format('DD/MM/YYYY')
  }

  // const getAdditional = () => {
  //   const list = [];
  //   list.push({title: 'Base rate', price: total_base_rate.amount})
  //   list.push({title: 'Tax rate', price: total_tax_rate.amount})
  //   list.push({title: 'Total', price: total.amount})
  //   return list;
  // }

  const getAddress = () => {
    if(!address) {
      return '';
    }
    const {address1, city, postal_code, province, country} = address;
    return address1 + ' ' + city + ' ' + province + ' ' + postal_code + ' ' + country
  }

  useEffect(() => {
    if(cancelOrderResponse.cancelled) {
      Modal.success({
        title: 'Alert',
        content: `Order successfully cancelled.`,
      });
      dispatch(hotelActions.clearState())
      window.location.href = 'www.simplenight.com';
    }
  }, [dispatch, cancelOrderResponse])

  const onCancel = () => {
    setVisible(true)
  }

  const handleOk = () => {
    dispatch(hotelActions.cancelOrder({booking_id: booking_id, last_name: last_name}));
    setVisible(false)
  }

  const handleCancel = () => {
    setVisible(false)
  }
  return (
    <div className={cx({[styles.collapseContainer]: index !== 0})}>
      <Collapse invert header={(
        <SummaryFormHeader icon={(<BedIcon width={15} height={15}/>)} title={name} price={price?.amount || 0} penalty={penalty} />
      )}>
        <div className={styles.collapseMain}>
          <div className={styles.confirmationRow}>
            <div className={styles.confirmation}>
              Confirmation #: {confirmation}
            </div>
            <Button onClick={onCancel}>Cancel</Button>
          </div>
          <div className={styles.dateRow}>
            <div>
              <PinIcon width={15} height={15} />
              <span className={styles.dateText}>{getAddress()}</span>
            </div>
          </div>
          <div className={styles.dateRow}>
            <div>
              <CalendarIcon width={15} height={15} />
              <span className={styles.dateText}>{formatDate(startDate) + ' Check-In'}</span>
            </div>
            <div className={styles.endDate}>
              <CalendarIcon width={15} height={15} />
              <span className={styles.dateText}>{formatDate(endDate) + ' Check-Out'}</span>
            </div>
          </div>
          <div className={styles.otherRow}>
            <div className={styles.leftRow}>
              <PlusIcon width={15} height={15} />
              <div className={styles.label}>{'Price'}</div>
            </div>
            <div className={styles.rightText}>
              ${price?.amount || 0}
            </div>
          </div>
          {/* {
            getAdditional().map(item => {
              const {title, price} = item;
              return (
                <div className={styles.otherRow}>
                  <div className={styles.leftRow}>
                    <PlusIcon width={15} height={15} />
                    <div className={styles.label}>{title}</div>
                  </div>
                  <div className={styles.rightText}>
                    ${price}
                  </div>
                </div>
              )
            })
          } */}
        </div>
      </Collapse>
      <Modal
        title={
          <div className={styles.modalHeader}>Cancel This Item?</div>
        }
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button size="large" halfWidth invert onClick={handleCancel}>
            No
          </Button>,
          <Button size="large" halfWidth onClick={handleOk}>
            Yes
          </Button>,
        ]}
      >
        <p className={styles.modalBoldText}>Are you sure want to cancel your reservation for this item?</p>
        <p className={styles.modalText}>{'You will be refunded $' + ((price?.amount || 0) - penalty) + ' for this canceled item.'}</p>
      </Modal>
    </div>
  )
}