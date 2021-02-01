import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';
import cx from 'classnames';
import Page from 'components/Page/Page';
import Carousel from 'components/Carousel/Carousel';
import ShoppingProductListSection from './components/ShoppingProductListSection/ShoppingProductListSection';
import ShoppingProductBookingSection from './components/ShoppingProductBookingSection/ShoppingProductBookingSection';
import ShoppingProductDetailHeader from './components/ShoppingProductDetailHeader/ShoppingProductDetailHeader';
import ShoppingProductOtherSection from './components/ShoppingProductOtherSection/ShoppingProductOtherSection';
import { getSelectedProduct } from '../../store/shopping/selectors';
import styles from './ShoppingProductPage.module.scss';

const ShoppingProductPage = () => {
  const selectedProduct = useSelector(getSelectedProduct);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const images = [
    {
      url: selectedProduct.productImage,
      type: '',
      display_order: 0,
    },
    {
      url: selectedProduct.productImage,
      type: '',
      display_order: 1,
    },
    {
      url: selectedProduct.productImage,
      type: '',
      display_order: 2,
    },
  ];
  return (
    <Page>
      <div className={styles.carousel}>
        <Carousel image={images} />
      </div>
      <ShoppingProductDetailHeader details={{ name: selectedProduct.productName }} />
      <div className={styles.root}>
        <div className={styles.content}>
          <Row>
            <Col md={16} sm={24} flex={1}>
              <Row>
                <ShoppingProductListSection className={styles.left} />
              </Row>
            </Col>
            <Col md={8} sm={24} flex={1}>
              <div className={styles.detail}>
                <ShoppingProductBookingSection />
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <div className={cx(styles.root, styles.otherProducts)}>
        <div className={styles.content}>
          <ShoppingProductOtherSection className={styles.bottom} />
        </div>
      </div>
    </Page>
  );
};

export default ShoppingProductPage;
