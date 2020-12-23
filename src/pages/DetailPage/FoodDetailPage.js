import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import Page from 'components/Page/Page';
import Carousel from 'components/Carousel/Carousel';
import FoodListSection from './components/FoodListSection/FoodListSection';
import FoodBookingSection from './components/FoodBookingSection/FoodBookingSection';
import DetailHeader from './components/DetailHeader/DetailHeader';
import styles from './FoodDetailPage.module.scss';
import { getRandomImageUrl } from '../../helpers/utils';

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

const dataArr = [
  {
    id: 1,
    src: getRandomImageUrl(),
    title: 'Sliders',
    price: '8.50',
    items: 2,
  },
  {
    id: 2,
    src: getRandomImageUrl(),
    title: 'Small Salad',
    price: '8.50',
    items: 2,
  },
  {
    id: 3,
    src: getRandomImageUrl(),
    title: 'Big Burger Combo',
    price: '8.50',
    items: 0,
  },
  {
    id: 4,
    src: getRandomImageUrl(),
    title: 'Cheese Pizza',
    price: '8.50',
    items: 1,
  },
];

const FoodDetailPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(dataArr);
  }, []);

  const setFoodData = (obj) => {
    const index = data.findIndex((d) => d.id === obj.id);
    if (index !== -1) {
      setData([...data.slice(0, index), { ...obj }, ...data.slice(index + 1)]);
    }
  };

  return (
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
                <FoodListSection className={styles.left} data={data} setData={setFoodData} />
              </Row>
            </Col>
            <Col md={8}>
              <div className={styles.detail}>
                <FoodBookingSection data={data} setData={setFoodData} />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Page>
  );
};

export default FoodDetailPage;
