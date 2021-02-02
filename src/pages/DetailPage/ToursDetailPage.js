import React from 'react';
import { Row, Col } from 'antd';

import Page from 'components/Page/Page';
import Carousel from 'components/Carousel/Carousel';
import ToursListSection from './components/ToursListSection/ToursListSection';
import EventBookingSection from './components/EventBookingSection/EventBookingSection';
import DetailHeader from './components/DetailHeader/DetailHeader';
import OtherSection from './components/OtherSection/OtherSection';
import styles from './ToursDetailPage.module.scss';
import Tours1 from '../../images/tours1.jpeg';
import Tours2 from '../../images/tours2.jpeg';
import Tours3 from '../../images/tours3.jpeg';
import Tours4 from '../../images/tours4.jpeg';
import Tours5 from '../../images/tours5.jpeg';

const getRandomImage = () => {
  const images = [Tours1, Tours2, Tours3, Tours4, Tours5];
  const number = Math.floor(Math.random() * Math.floor(3));
  return images[number];
};

const images = Array(3)
  .fill(0)
  .map((_, i) => ({
    url: getRandomImage(),
    type: '',
    display_order: i,
  }));

const ToursDetailPage = () => (
  <Page>
    <div className={styles.carousel}>
      <Carousel image={images} />
      <DetailHeader className={styles.detailHeader} details={{ name: 'ATV Riding Tours' }} />
    </div>
    <div className={styles.root}>
      <div className={styles.content}>
        <Row justify="center">
          <Col md={16} sm={24} flex={1}>
            <Row>
              <DetailHeader className={styles.detailHeader} details={{ name: 'ATV Riding Tours' }} />
            </Row>
            <Row>
              <ToursListSection className={styles.left} />
            </Row>
          </Col>
          <Col md={8} sm={24} flex={1}>
            <div className={styles.detail}>
              <EventBookingSection />
            </div>
          </Col>
        </Row>
      </div>
      <OtherSection className={styles.bottom} />
    </div>
  </Page>
);

export default ToursDetailPage;
