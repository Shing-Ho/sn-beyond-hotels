import React, { useEffect } from 'react';
import { Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Page from 'components/Page/Page';
import Carousel from 'components/Carousel/Carousel';
import { getFormattedGasStation } from 'store/gas/selectors';
import gasActions from 'store/gas/actions';
import GasListSection from './components/GasListSection/GasListSection';
import GasBookingSection from './components/GasBookingSection/GasBookingSection';
import DetailHeader from './components/DetailHeader/DetailHeader';
import styles from './GasDetailPage.module.scss';
import OtherSection from './components/OtherSection/OtherSection';

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

const GasDetailPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const data = useSelector(getFormattedGasStation(params.id));

  useEffect(() => {
    dispatch(gasActions.getGasStations());
  }, []);

  return (
    <Page>
      <div className={styles.carousel}>
        <Carousel image={data.images || images} />
        <DetailHeader className={styles.detailHeader} details={data} isRating />
      </div>
      <div className={styles.root}>
        <div className={styles.content}>
          <Row justify="center">
            <Col md={16}>
              <Row>
                <DetailHeader className={styles.detailHeader} details={data} isRating />
              </Row>
              <Row>
                <GasListSection className={styles.left} />
              </Row>
            </Col>
            <Col md={8}>
              <div className={styles.detail}>
                <GasBookingSection />
              </div>
            </Col>
          </Row>
        </div>
        <OtherSection className={styles.bottom} />
      </div>
    </Page>
  );
};

export default GasDetailPage;
