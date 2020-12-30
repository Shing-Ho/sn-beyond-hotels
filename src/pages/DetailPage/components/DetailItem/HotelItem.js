import React from 'react';
import cx from 'classnames';
import { get } from 'lodash';
import { ReactComponent as InfoIcon } from 'icons/info.svg';
import { FormattedMessage } from 'react-intl';
import { Button, Popover, Tooltip } from 'antd';
import Divider from 'components/Divider/Divider';
import { commaFormat } from 'helpers/utils';
import currency from '../../../../helpers/currency';
import styles from './DetailItem.module.scss';

const PopOverContent = (data) => (
  <div>
    <p>
      <FormattedMessage
        id="detailPage.info.rate"
        defaultMessage={`Rate: ${commaFormat(data.total_base_rate.amount)}`}
        values={{ rate: commaFormat(data.total_base_rate.amount) }}
      />
    </p>
    <p>
      <FormattedMessage
        id="detailPage.info.taxes"
        defaultMessage={`Taxes: ${commaFormat(data.total_tax_rate.amount)}`}
        values={{ taxes: commaFormat(data.total_tax_rate.amount) }}
      />
    </p>
    <p>
      <FormattedMessage
        id="detailPage.info.total"
        defaultMessage={`Total: ${commaFormat(data.total.amount)}`}
        values={{ total: commaFormat(data.total.amount) }}
      />
    </p>
  </div>
);

const HotelItem = (props) => {
  const { data, nights, selected, onSelect } = props;
  const totalCost = data.total && data.total.amount > 0 ? commaFormat(Number(data.total.amount).toFixed(2)) : 0;
  const nightCost = data.avg_nightly_rate ? commaFormat(Number(data.avg_nightly_rate.amount).toFixed(2)) : 0;
  const currencySymbol = currency[data?.avg_nightly_rate?.currency || 'USD']?.symbol;
  return (
    <div
      className={cx(styles.root, {
        [styles.active]: selected,
      })}
    >
      <div className={styles.detail}>
        <div className={styles.header}>
          <span className={styles.name}>{data.name}</span>
          <span className={styles.main}>
            {currencySymbol}
            {commaFormat(Number(nightCost.replace(',', '') * 1).toFixed(2))}
          </span>
        </div>
        <div className={styles.price}>
          <div className={styles.night}>
            {currencySymbol}
            {totalCost}
            <span>
              {nights > 1 ? (
                <FormattedMessage id="detailItem.costs" defaultMessage={`for ${nights} Nights`} values={{ nights }} />
              ) : (
                <FormattedMessage id="detailItem.cost" defaultMessage={`for ${nights} Night`} values={{ nights }} />
              )}
            </span>
          </div>
        </div>
        <div className={styles.flexWrapper}>
          <div className={styles.learnMore}>
            <Popover content={PopOverContent(data)} placement="bottom">
              <InfoIcon />
            </Popover>
            <FormattedMessage id="priceBreakDown" defaultMessage="Price Breakdown" />
          </div>
          {get(data, 'cancellation_policy.summary') && (
            <div className={styles.cancellation}>
              <Tooltip
                color="white"
                placement="top"
                title={
                  <div className={styles.cnlTooltip}>
                    <span>Cancellation Deadline</span>: {get(data, 'cancellation_policy.cancellation_deadline')}
                    <br />
                    <span>Policy</span>: {get(data, 'cancellation_policy.unstructured_policy')}
                  </div>
                }
              >
                <span className={styles.cnlText}>{get(data, 'cancellation_policy.summary').replace('_', ' ')}</span>
              </Tooltip>
            </div>
          )}
        </div>
        <Divider />
        <div className={styles.category} />

        <div className={styles.bottom}>
          <div className={styles.roomCount} onClick={onSelect}>
            <Button type="primary">
              <FormattedMessage id="select" defaultMessage="Select" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelItem;
