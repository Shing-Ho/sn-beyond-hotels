import React from 'react';
import { Row, Col } from 'antd';

import Page from 'components/Page/Page';
import Carousel from 'components/Carousel/Carousel';
import { ReactComponent as NightlifeWhiteIcon } from 'icons/dashboardIcons/NightlifeWhite.svg';
import NightLifeListSection from './components/NightLifeListSection/NightLifeListSection';
import NightLifeBookingSection from './components/NightLifeBookingSection/NightLifeBookingSection';
import DetailHeader from './components/DetailHeader/DetailHeader';
import OtherSection from './components/OtherSection/OtherSection';
import styles from './NightLifeDetailPage.module.scss';
import night1 from '../../images/night1.jpeg';
import night2 from '../../images/night2.jpeg';
import night3 from '../../images/night3.jpeg';
import night4 from '../../images/night4.jpeg';
import night5 from '../../images/night5.jpeg';

const getRandomImage = () => {
  const images = [night1, night2, night3, night4, night5];
  const number = Math.floor(Math.random() * Math.floor(4));
  return images[number];
};

const images = Array(3)
  .fill(0)
  .map((_, i) => ({
    url: getRandomImage(),
    type: '',
    display_order: i,
  }));

const NightLifeDetailPage = () => (
  <Page>
    <div className={styles.carousel}>
      <Carousel image={images} />
    </div>
    <div className={styles.root}>
      <div className={styles.content}>
        <Row justify="center">
          <Col md={16} sm={24} flex={1}>
            <Row>
              <DetailHeader
                className={styles.detailHeader}
                details={{ name: 'Encore Beach Club' }}
                icon={<NightlifeWhiteIcon width="26px" height="29px" />}
              />
            </Row>
            <Row>
              <NightLifeListSection className={styles.left} />
            </Row>
          </Col>
          <Col md={8} sm={24} flex={1}>
            <div className={styles.detail}>
              <NightLifeBookingSection />
            </div>
          </Col>
        </Row>
      </div>
      <OtherSection
        className={styles.bottom}
        type="NightLife"
        icon={<NightlifeWhiteIcon width="26px" height="29px" />}
      />
    </div>
  </Page>
);

export default NightLifeDetailPage;
