import React from "react";
import {Row, Col} from 'antd';
import {FormattedMessage} from "react-intl";

import Item from './Item/index';
import styles from './index.module.scss';
import Button from "../../../../components/Button/Button";
import Pagination from "../../../../components/Pagination/Pagination";

const GridView = ({ items= [], onPageChange }) => {
  return(
    <div className={styles.gridContainer}>
      <Row gutter={24} className={styles.row}>
        { items.map(item => ( <Col lg={8} className={styles.column}><Item item={item}/></Col>) ) }
      </Row>
      <Row className={styles.buttonWrap}>
        <Button className={styles.btn}>
          <FormattedMessage id="showMore" defaultMessage="Show More" />
        </Button>
      </Row>
      <Row className={styles.pagination}>
        <Pagination
          total={items.length}
          showSizeChanger
          showQuickJumper
          onChange={onPageChange}
          onShowSizeChange={(current, size) => onPageChange(0, size)}
        />
      </Row>
    </div>
  )
};

export default GridView;
