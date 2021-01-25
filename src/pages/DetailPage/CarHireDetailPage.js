import React from 'react';

import Page from 'components/Page/Page';
import Carousel from 'components/Carousel/Carousel';
import { ReactComponent as TranHire } from 'icons/transports/Icon_Tran_Hire.svg';
import QuoteSection from './components/QuoteSection/QuoteSection';
import CarListSection from './components/CarListSection/CarListSection';
import styles from './CarHireDetailPage.module.scss';

const DetailPage = () => {
  const tempCarData = {
    id: 1,
    rate: (Math.random() * 2000).toFixed(2),
    icon: <TranHire />,
    image: 'https://cdn.zeplin.io/5f0cc065251be480ada0fb9a/assets/2f83353b-2624-4e33-8840-9fa262d41f0d.svg',
    photos: [
      { url: 'https://cdn.zeplin.io/5f0cc065251be480ada0fb9a/assets/2f83353b-2624-4e33-8840-9fa262d41f0d.svg' },
      { url: 'https://cdn.zeplin.io/5f0cc065251be480ada0fb9a/assets/16e308d3-0f15-4d0a-8e16-0d2be8f77a25.svg' },
      { url: 'https://cdn.zeplin.io/5f0cc065251be480ada0fb9a/assets/08cca3aa-2980-4159-a5aa-6aafa47faef8.svg' },
    ],
    name: '',
    rating: Math.round(Math.random() * 5),
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquam facilisis pharetra. Fusce eu lorem vel mi cursus efficitur. Vivamus sodales tempus venenatis.',
    geolocation: {
      latitude: 40.73161,
      longitude: -73.989283,
    },
  };
  return (
    <Page>
      <>
        <div className={styles.carousel}>
          <Carousel image={tempCarData?.photos || []} />
        </div>
        <div className={styles.root}>
          <div className={styles.content}>
            <div className={styles.detail}>
              <CarListSection className={styles.left} car={tempCarData} />
              <QuoteSection className={styles.right} />
            </div>
          </div>
        </div>
      </>
    </Page>
  );
};

export default DetailPage;
