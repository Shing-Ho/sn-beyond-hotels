import React from 'react';
import { Row, Col, Button, Switch } from 'antd';
import cx from 'classnames';

import { ReactComponent as PhotoIcon } from 'icons/Icon_SupMan_Photos.svg';
import { ReactComponent as DragIcon } from 'icons/Icon_SupMan_Drag.svg';
import { ReactComponent as TrashIcon } from 'icons/trash.svg';
// import { ReactComponent as ArrowIcon } from 'icons/arrow-down-small.svg';
// import Input from 'components/Input/Input';
import styles from './ProductItem.module.scss';

export default function ProductItem({
  onboarding,
  mode = true,
  product,
  handleProduct,
  onRemove,
  onUpdateActive,
  drag,
}) {
  return (
    <div
      className={cx(styles.productItem, {
        [styles.onboarding]: onboarding,
      })}
    >
      <div className={styles.image}>
        {product && product.media && product.media[0] && (
          <img src={product.media.sort((a, b) => a.order - b.order)[0].url || null} alt="Product Item" />
        )}
        <div className={styles.icon}>
          <PhotoIcon width={24} onClick={() => handleProduct(product, true, 3)} />
        </div>
      </div>
      <div className={styles.content}>
        {mode ? (
          <div className={styles.initContent}>
            <h3 className={styles.title}>Add Products</h3>
            <p className={styles.description}>Add Products to your venue to show what you offer.</p>
            <Button className={styles.btn}>
              <i className="fa fa-plus" aria-hidden="true" /> Add Product
            </Button>
          </div>
        ) : (
          <div className={styles.editContent}>
            <div className={styles.form}>
              <Row>
                <Col className={styles.input}>
                  {/* <Input placeholder="Add Product Name..." maxLength={30} /> */}
                  <h3>{product.name}</h3>
                </Col>
              </Row>
              <Row>
                <Col span={12} className={styles.input}>
                  {/* <Input
                    type="number"
                    placeholder="Price"
                    prefix={<div className={styles.prefix}>$</div>}
                    suffix={<div className={styles.suffix}>USD</div>}
                  /> */}
                  <div className={styles.prefix}>$</div>
                  <div className={styles.price}>{product.price}</div>
                  {/* <div className={styles.suffix}>USD</div> */}
                </Col>
                <Col span={12} className={[styles.input, styles.user]}>
                  {/* <Input
                    type="number"
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
                  /> */}
                  <div className={styles.prefix}>
                    <i className="fa fa-user" />
                  </div>
                  <div className={styles.price}>{product.price}</div>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <div className={styles.input}>
                    <Switch checked={product.status} onChange={(status) => onUpdateActive(product, status)} />
                    <div className={styles.desc}>Active</div>
                  </div>
                </Col>
                <Col span={12} className={styles.actions}>
                  <TrashIcon width={14} height={24} onClick={() => onRemove(product.id)} />
                  <Button className={styles.btn} onClick={() => handleProduct(product, true)}>
                    Edit
                  </Button>
                </Col>
              </Row>
            </div>
            <div className={styles.controls} {...drag.dragHandleProps}>
              <DragIcon width={20} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
