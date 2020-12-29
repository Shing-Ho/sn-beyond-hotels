import React from 'react';
// import cx from 'classnames';
// import { get } from 'lodash';
import { ReactComponent as InfoIcon } from 'icons/info.svg';
import { FormattedMessage } from 'react-intl';
import { Popover } from 'antd';
// import Divider from 'components/Divider/Divider';
// import { commaFormat } from 'helpers/utils';
import CustomCollapse from 'components/Collapse/Collapse';
import NumberInput from 'components/NumberInput/NumberInput';
import styles from './DiningDetailItem.module.scss';

const PopOverContent = () => (
  <div>
    <p>
      <FormattedMessage id="detailPage.info.rate" values={{ rate: 10 }} />
    </p>
    <p>
      <FormattedMessage id="detailPage.info.taxes" values={{ taxes: 5 }} />
    </p>
    <p>
      <FormattedMessage id="detailPage.info.total" values={{ total: 15 }} />
    </p>
  </div>
);

const DiningDetailItem = ({ data, currency }) => (
  <CustomCollapse header={data.name} type="large">
    <div className={styles.root}>
      {data.details.map((eachItem) => (
        <div key={eachItem.name} className={styles.item}>
          <img src={eachItem.img_url} alt={eachItem.name} />
          <div className={styles.details}>
            <div className={styles.title}>{eachItem.name}</div>
            <div className={styles.price}>{currency?.symbol + eachItem.price}</div>
            <div className={styles.bottom}>
              <div className={styles.learnMore}>
                <Popover content={PopOverContent(data)}>
                  <InfoIcon />
                </Popover>
                <FormattedMessage id="learnMore" />
              </div>
              <div className={styles.items}>
                <div className={styles.itemsText}>ITEMS</div>
                <NumberInput />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </CustomCollapse>
);

export default DiningDetailItem;
