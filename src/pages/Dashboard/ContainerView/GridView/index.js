import React from "react";
import {Row, Col} from 'antd';
import Item from './Item/index';

const GridView = ({ items= [] }) => {
  return(
    <Row gutter={24}>
      { items.map(item => ( <Col lg={8}><Item item={item}/></Col>) ) }
    </Row>
  )
};

export default GridView;
