import React from 'react';
import { Row, Col } from 'antd';

import Page from 'components/Page/Page';
import { getRandomImageUrl } from 'helpers/utils';
import Carousel from 'components/Carousel/Carousel';
import { ReactComponent as NightlifeWhiteIcon } from 'icons/dashboardIcons/NightlifeWhite.svg';
import NightLifeListSection from './components/NightLifeListSection/NightLifeListSection';
import EventBookingSection from './components/EventBookingSection/EventBookingSection';
import DetailHeader from './components/DetailHeader/DetailHeader';
import OtherSection from './components/OtherSection/OtherSection';
import styles from './NightLifeDetailPage.module.scss';

const images = Array(7)
  .fill(0)
  .map((_, i) => ({
    url: getRandomImageUrl(),
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
              <EventBookingSection />
            </div>
          </Col>
        </Row>
      </div>
      <OtherSection className={styles.bottom} />
    </div>
  </Page>
);

export default NightLifeDetailPage;
