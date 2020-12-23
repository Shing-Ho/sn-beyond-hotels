import React from 'react';
import { Row, Col } from 'antd';

import Card from 'components/Card/Card';
import Button from 'components/Button/Button';
import { ReactComponent as SimpleNight } from 'icons/simplenightWight.svg';
import { ReactComponent as Restaurant } from 'icons/restaurantWhite.svg';
import styles from './FlightSearchBottom.module.scss';

export default function FlightSearchBottom({ currency }) {
  const cards = [
    {
      icon: Restaurant,
      img:
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
      rate: 4,
      title: 'Taix Restaurant',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec orci enim, luctus vel nisl Bibendum.',
      price: 19.99,
    },
    {
      icon: Restaurant,
      img:
        'https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
      rate: 4,
      title: 'Awesome Club',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec orci enim, luctus vel nisl Bibendum.',
      price: 39.99,
    },
    {
      icon: Restaurant,
      img:
        'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80',
      rate: 4,
      title: 'Bay View',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec orci enim, luctus vel nisl Bibendum.',
      price: 39.99,
    },
  ];
  return (
    <div className={styles.root}>
      <div className={styles.topRow}>
        <div className={styles.leftRow}>
          <div className={styles.leftIcon}>
            <SimpleNight />
          </div>
          <span className={styles.leftText}>Others You May Like</span>
        </div>
        <Button>View More</Button>
      </div>
      <Row gutter={24}>
        {cards.map((c) => (
          <Col md={8} xs={24}>
            <Card
              Icon={c.icon}
              img={c.img}
              rate={c.rate}
              title={c.title}
              description={c.description}
              price={`${currency?.symbol} ${c.price}`}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}
