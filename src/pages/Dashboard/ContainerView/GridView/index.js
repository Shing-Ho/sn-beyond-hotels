import React from 'react';
import { Row, Col } from 'antd';
import { FormattedMessage } from 'react-intl';

import GridItem from './GridItem/GridItem';
import styles from './index.module.scss';
import Button from '../../../../components/Button/Button';
import Pagination from '../../../../components/Pagination/Pagination';

const GridView = ({ items = [], currency, total, onPageChange, onItemClick }) => {
  const onHandleClick = (id) => () => {
    onItemClick(id);
  };

  return (
    <div className={styles.gridContainer}>
      <Row gutter={24} className={styles.row}>
        {items.map((item) => (
          <Col lg={24} className={styles.column} onClick={onHandleClick(item.id)}>
            <GridItem currency={currency} data={item} />
          </Col>
        ))}
      </Row>
      <Row className={styles.buttonWrap}>
        <Button className={styles.btn}>
          <FormattedMessage id="showMore" defaultMessage="Show More" />
        </Button>
      </Row>
      <Row className={styles.pagination}>
        <Pagination
          total={total}
          showSizeChanger
          showQuickJumper
          onChange={onPageChange}
          onShowSizeChange={(current, size) => onPageChange(0, size)}
        />
      </Row>
    </div>
  );
};

export default GridView;
