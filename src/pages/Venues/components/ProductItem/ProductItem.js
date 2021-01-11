import React, { useState } from 'react';
import { Row, Col, Button, Switch } from 'antd';
import cx from 'classnames';

import { ReactComponent as PhotoIcon } from 'icons/Icon_SupMan_Photos.svg';
import { ReactComponent as DragIcon } from 'icons/Icon_SupMan_Drag.svg';
import { ReactComponent as TrashIcon } from 'icons/trash.svg';
import { ReactComponent as ArrowIcon } from 'icons/arrow-down-small.svg';
import Input from 'components/Input/Input';
import styles from './ProductItem.module.scss';

export default function ProductItem({ onboarding }) {
  const [mode, setMode] = useState(true);
  return (
    <div
      className={cx(styles.productItem, {
        [styles.onboarding]: onboarding,
      })}
    >
      <div className={styles.image}>
        {/* <img src={} alt="Product Item" /> */}
        <div className={styles.icon}>
          <PhotoIcon width={24} />
        </div>
      </div>
      <div className={styles.content}>
        {mode ? (
          <div className={styles.initContent}>
            <h3 className={styles.title}>Add Products</h3>
            <p className={styles.description}>Add Products to your venue to show what you offer.</p>
            <Button className={styles.btn} onClick={() => setMode(false)}>
              <i className="fa fa-plus" aria-hidden="true" /> Add Product
            </Button>
          </div>
        ) : (
          <div className={styles.editContent}>
            <div className={styles.form}>
              <Row>
                <Col className={styles.input}>
                  <Input placeholder="Add Product Name..." maxLength={30} />
                </Col>
              </Row>
              <Row>
                <Col span={12} className={styles.input}>
                  <Input
                    placeholder="Price"
                    prefix={<div className={styles.prefix}>$</div>}
                    suffix={<div className={styles.suffix}>USD</div>}
                  />
                </Col>
                <Col span={12} className={[styles.input, styles.user]}>
                  <Input
                    propsValue="10"
                    prefix={
                      <div className={styles.prefix}>
                        <i className="fa fa-user" />
                      </div>
                    }
                    suffix={
                      <div className={styles.arrow}>
                        <ArrowIcon width={14} />
                      </div>
                    }
                  />
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Switch defaultChecked />
                </Col>
                <Col span={12} className={styles.actions}>
                  <TrashIcon width={14} height={24} />
                  <Button className={styles.btn}>Edit</Button>
                </Col>
              </Row>
            </div>
            <div className={styles.controls}>
              <DragIcon width={20} onClick={() => setMode(true)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
