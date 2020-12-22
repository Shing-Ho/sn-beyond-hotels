import React from 'react';
import { Row, Col } from 'antd';
import Page from 'components/Page/Page';
import Carousel from 'components/Carousel/Carousel';
import FoodListSection from './components/FoodListSection/FoodListSection';
import FoodBookingSection from './components/FoodBookingSection/FoodBookingSection';
import DetailHeader from './components/DetailHeader/DetailHeader';
import styles from './FoodDetailPage.module.scss';

const images = [
  {
    url: '//media.iceportal.com/34323/photos/60150742_XL.jpg',
    type: '',
    display_order: 0,
  },
  {
    url: '//media.iceportal.com/34323/photos/60150744_XL.jpg',
    type: '',
    display_order: 1,
  },
  {
    url: '//media.iceportal.com/34323/photos/60150756_XL.jpg',
    type: '',
    display_order: 2,
  },
  {
    url: '//media.iceportal.com/34323/photos/60150758_XL.jpg',
    type: '',
    display_order: 3,
  },
  {
    url: '//media.iceportal.com/34323/photos/60150750_XL.jpg',
    type: '',
    display_order: 4,
  },
  {
    url: '//media.iceportal.com/34323/photos/60150752_XL.jpg',
    type: '',
    display_order: 5,
  },
];

const FoodDetailPage = () => (
  <Page>
    <div className={styles.carousel}>
      <Carousel image={images} />
      <DetailHeader className={styles.detailHeader} details={{ name: "Bob's Burgers" }} isFoodDetail />
    </div>
    <div className={styles.root}>
      <div className={styles.content}>
        <Row justify="center">
          <Col md={16}>
            <Row>
              <DetailHeader className={styles.detailHeader} details={{ name: "Bob's Burgers" }} isFoodDetail />
            </Row>
            <Row>
              <FoodListSection className={styles.left} />
            </Row>
          </Col>
          <Col md={8}>
            <div className={styles.detail}>
              <FoodBookingSection />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  </Page>
);

export default FoodDetailPage;
