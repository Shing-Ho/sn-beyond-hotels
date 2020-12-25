import React from 'react';
import { Row, Col } from 'antd';
import { useSelector } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';
import _ from 'lodash';

import Page from 'components/Page/Page';
import Button from 'components/Button/Button';
import { getCancelLookupResponse } from 'store/hotel/selectors';
import SummaryLeft from './components/SummaryLeft/SummaryLeft';
import SummaryHeader from './components/SummaryHeader/SummaryHeader';
import SummaryBottom from './components/SummaryBottom/SummaryBottom';
import styles from './SummaryPage.module.scss';

export default function SummaryPage() {
  const cancelLookupResponse = useSelector(getCancelLookupResponse);
  const intl = useIntl();

  const getHeaderItems = () => {
    const list = [];
    if (cancelLookupResponse.itinerary) {
      list.push({
        label: intl.formatMessage({ id: 'orderNumber', defaultValue: 'ORDER NUMBER' }),
        value: _.get(cancelLookupResponse, 'itinerary.confirmation'),
      });
      list.push({ label: intl.formatMessage({ id: 'items', defaultValue: 'ITEMS' }), value: 1 });
      list.push({
        label: intl.formatMessage({ id: 'total', defaultValue: 'TOTAL' }),
        value: _.get(cancelLookupResponse, 'itinerary.price.amount'),
      });
    }
    return list;
  };

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
