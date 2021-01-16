import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';
import Page from 'components/Page/Page';
import Carousel from 'components/Carousel/Carousel';
import ShoppingListSection from './components/ShoppingListSection/ShoppingListSection';
import ShoppingBookingSection from './components/ShoppingBookingSection/ShoppingBookingSection';
import ShoppingDetailHeader from './components/ShoppingDetailHeader/ShoppingDetailHeader';
import ShoppingOtherSection from './components/ShoppingOtherSection/ShoppingOtherSection';
import styles from './ShoppingDetailPage.module.scss';
import { getSelectedStore } from '../../store/shopping/selectors';

const ShoppingDetailPage = () => {
  const selectedStore = useSelector(getSelectedStore);
  console.log(selectedStore);
  const images = [
    {
      url: selectedStore.image,
      type: '',
      display_order: 0,
    },
    {
      url: selectedStore.image,
      type: '',
      display_order: 1,
    },
    {
      url: selectedStore.image,
      type: '',
      display_order: 2,
    },
  ];
  return (
    <Page>
      <div className={styles.carousel}>
        <Carousel image={images} />
        <ShoppingDetailHeader className={styles.detailHeader} details={{ name: selectedStore.title }} />
      </div>
      <div className={styles.root}>
        <div className={styles.content}>
          <Row justify="center">
            <Col md={16} sm={24} flex={1}>
              <Row>
                <ShoppingDetailHeader className={styles.detailHeader} details={{ name: selectedStore.title }} />
              </Row>
              <Row>
                <ShoppingListSection className={styles.left} />
              </Row>
            </Col>
            <Col md={8} sm={24} flex={1}>
              <div className={styles.detail}>
                <ShoppingBookingSection />
              </div>
            </Col>
          </Row>
        </div>
        <ShoppingOtherSection className={styles.bottom} />
      </div>
    </Page>
  );
};

export default ShoppingDetailPage;
