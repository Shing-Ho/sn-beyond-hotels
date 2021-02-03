import React from 'react';
import { Row, Col } from 'antd';
import Page from 'components/Page/Page';
import Carousel from 'components/Carousel/Carousel';
import cover1 from 'images/coverEvent1.jpeg';
import cover2 from 'images/coverEvent2.jpeg';
import cover3 from 'images/coverEvent3.jpeg';
import cover4 from 'images/coverEvent4.jpeg';
import EventsListSection from './components/EventsListSection/EventsListSection';
import EventBookingSection from './components/EventBookingSection/EventBookingSection';
import DetailHeader from './components/DetailHeader/DetailHeader';
import styles from './EventsDetailPage.module.scss';

const getRandomImage = () => {
  const images = [cover1, cover2, cover3, cover4];
  const number = Math.floor(Math.random() * Math.floor(4));
  return images[number];
};

const images = Array(4)
  .fill(0)
  .map((_, i) => ({
    url: getRandomImage(),
    type: '',
    display_order: i,
  }));

const EventsDetailPage = () => (
  <Page>
    <div className={styles.carousel}>
      <Carousel image={images} />
      <DetailHeader className={styles.detailHeader} details={{ name: 'ATV Riding Tours' }} isRating />
    </div>
    <div className={styles.root}>
      <div className={styles.content}>
        <Row justify="center">
          <Col md={16}>
            <Row>
              <DetailHeader className={styles.detailHeader} details={{ name: 'Hamilton - The Musical' }} isRating />
            </Row>
            <Row>
              <EventsListSection className={styles.left} />
            </Row>
          </Col>
          <Col md={8}>
            <div className={styles.detail}>
              <EventBookingSection />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  </Page>
);

export default EventsDetailPage;
