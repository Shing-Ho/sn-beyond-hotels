import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'antd';

import RightIconInput from 'components/RightIconInput/RightIconInput';
import careyActions from 'store/carey/actions';
import { getError } from 'store/carey/selectors';
import headerImg from 'images/withBlue.png';
import { ReactComponent as SearchIcon } from 'icons/search.svg';

import styles from './ReservationLookupHeader.module.scss';

export default function ReservationLookupHeader() {
  const [reservationNum, setReservationNum] = useState('');
  const [errorShow, setErrorShow] = useState('');
  const dispatch = useDispatch();
  const error = useSelector(getError);

  useEffect(() => {
    if (error) {
      setErrorShow('The order number or last name could not be located. Please try again.');
      dispatch(careyActions.clearState());
    }
  }, [error, reservationNum, dispatch]);

  const onSearch = () => {
    const payload = {
      Version: '1.0',
      SequenceNmbr: '200007',
      POS: {
        Source: {
          RequestorID: {
            ID: 'testarranger@testnone.com',
            MessagePassword: 'carey123',
            Type: 'TA',
          },
          BookingChannel: {
            Type: 'TA',
            CompanyName: {
              Code: '',
              CodeContext: '52969',
              CompanyShortName: 'PM744',
              _value_1: 'CSI - SimpleNight',
            },
          },
        },
      },
      Reservation: {
        CancelType: 'Cancel',
        UniqueID: {
          ID: reservationNum,
          Type: 'cancel',
        },
      },
    };
    dispatch(careyActions.cancelReservation(payload));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <img alt="withBlue" src={headerImg} className={styles.img} />
        <div className={styles.orderTextRow}>
          <div className={styles.searchIconWrapper}>
            <SearchIcon className={styles.searchIcon} />
          </div>
          <div className={styles.orderText}>Reservation Cancellation Lookup</div>
        </div>
        <div className={styles.orderInput}>
          <RightIconInput
            name="Enter your Reservation Number..."
            value={reservationNum}
            onChange={setReservationNum}
            rightComponent={<div className={styles.orderRightText}>#</div>}
          />
        </div>
        {errorShow ? <div className={styles.errorText}>{errorShow}</div> : null}
        <Button onClick={onSearch} className={styles.orderSearchButton}>
          <div className={styles.searchIconWrapper}>
            <SearchIcon className={styles.orderSearchIcon} />
          </div>
          <span className={styles.orderSearchText}>Search</span>
        </Button>
      </div>
    </div>
  );
}
