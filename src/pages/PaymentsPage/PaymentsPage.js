import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';
import { Row, Col } from 'antd';
import Page from 'components/Page/Page';
import history from 'store/history';
import coreActions from 'store/core/actions';
import { Checkbox } from 'components/CheckboxGroup/CheckboxGroup';
import Button from 'components/Button/Button';
import { getSelectedRoomItems } from 'store/booking/selectors';
import { getCurrency } from 'store/core/selectors';
import ItineraryDetail from './components/ItineraryDetail/ItineraryDetail';
import PaymentsForm from './components/PaymentsForm/PaymentsForm';
import PaymentsHeader from './components/PaymentsHeader/PaymentsHeader';
import styles from './PaymentsPage.module.scss';

export default function PaymentsPage() {
  const [tosAgreed, setTosAgreed] = useState(false);
  const dispatch = useDispatch();
  const selectedRooms = useSelector(getSelectedRoomItems);
  const currency = useSelector(getCurrency);
  const intl = useIntl();

  const toggleTosAgreed = () => setTosAgreed(!tosAgreed);

  const handleFormSubmit = (formKey) => () => {
    dispatch(coreActions.setFormSubmit(formKey));
  };

  const goBack = () => {
    history.push('guest');
  };

  return (
    <Page>
      <div className={styles.content}>
        <PaymentsHeader />
        <Row gutter={{ xs: 0, md: 40 }} className={styles.detail}>
          <Col md={16} xs={24} className={styles.left}>
            <PaymentsForm
              title={intl.formatMessage({
                id: 'paymentsPage.PrimaryPaymentMethod',
                defaultValue: 'Primary Payment Method',
              })}
              formKey="primary"
            />
          </Col>
          <Col className={styles.right} md={8} xs={24}>
            <ItineraryDetail showDiscount currency={currency} items={selectedRooms} width="375px" />
          </Col>
        </Row>
      </div>
      <div className={styles.bottom}>
        <div className={styles.wrapper}>
          <Checkbox invert value={tosAgreed} onChange={toggleTosAgreed}>
            <FormattedMessage
              id="paymentsPage.TermsAndPrivacyMessage"
              defaultMessage="I understand that some items might not be available any longer, that I will be refunded and notified right after check out, and have reviewed the Terms of Use and Privacy Policy."
            />
          </Checkbox>
          <div>
            <Button size="large" invert onClick={goBack}>
              <FormattedMessage id="back" defaultMessage="Back" />
            </Button>
            <Button size="large" onClick={handleFormSubmit('primary')}>
              <FormattedMessage id="checkOut" defaultMessage="Check Out" />
            </Button>
          </div>
        </div>
      </div>
    </Page>
  );
}
