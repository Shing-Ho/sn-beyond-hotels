import React from 'react';
import { Row, Col, Button } from 'antd';
import { FormattedMessage } from 'react-intl';
import cx from 'classnames';

import { ReactComponent as SupplyIcon } from 'icons/Icon_SupMan_SupplyManager.svg';
import styles from './VenuesHeader.module.scss';

export default function VenuesHeader({ venue, onActive }) {
  const handleActive = (status) => {
    if (venue) {
      onActive(status);
    }
  };

  return (
    <div className={styles.root}>
      <Row className={styles.container}>
        <Col md={24} lg={10}>
          <div className={styles.logo}>
            <div className={styles.icon}>
              <SupplyIcon />
            </div>
            <FormattedMessage id="supplyManager" defaultMessage="Supply Manager" />
          </div>
        </Col>
        <Col className={styles.item} md={24} lg={4}>
          <div className={styles.modes}>
            <Button
              className={cx(styles.btn, styles.btnInactive, {
                [styles.inActiveBtn]: !venue || !venue.status,
              })}
              onClick={() => handleActive(false)}
            >
              <i className="fa fa-eye-slash" /> <FormattedMessage id="inactive" defaultMessage="Inactive" />
            </Button>
            <Button
              className={cx([styles.btn, styles.btnActive], {
                [styles.activeBtn]: venue && venue.status,
              })}
              onClick={() => handleActive(true)}
            >
              <i className="fa fa-eye" /> <FormattedMessage id="active" defaultMessage="Active" />
            </Button>
          </div>
        </Col>
        <Col md={24} lg={10}>
          <div className={styles.actions}>
            <Button className={[styles.btn, styles.btnHover]}>Cancel</Button>
            <Button className={[styles.btn, styles.primary]} type="primary">
              Start Over
            </Button>
            <Button className={[styles.btn, styles.publish, styles.disabled]} type="primary" disabled>
              PUBLISH
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}
