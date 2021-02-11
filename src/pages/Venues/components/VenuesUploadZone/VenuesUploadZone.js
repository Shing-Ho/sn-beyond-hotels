import React from 'react';
import { Button } from 'antd';
import cx from 'classnames';

// import { getRandomImageUrl } from 'helpers/utils';
import Carousel from 'components/Carousel/Carousel';

import mentorImg from 'images/Icon_SupMan_Onboard_Arrow_Small.png';
import { ReactComponent as PhotoIcon } from 'icons/Icon_SupMan_Photos.svg';
import styles from './VenuesUploadZone.module.scss';

// const images = Array(7)
//   .fill(0)
//   .map((_, i) => ({
//     url: getRandomImageUrl(),
//     type: '',
//     display_order: i,
//   }));

export default function VenuesUploadZone({ images, onboarding, handleUploadMedia }) {
  return (
    <div className={styles.carousel}>
      <Carousel image={images} />
      <div
        className={cx(styles.uploadZone, {
          [styles.onboarding]: onboarding,
        })}
      >
        <div className={styles.container}>
          <h3>Add Photos and Video</h3>
          <p>Add photos and videos to showcase your venue and products.</p>
          <Button className={styles.uploadBtn} onClick={() => handleUploadMedia(true)} icon={<PhotoIcon />}>
            Add Yours Here
          </Button>
          <div className={styles.mentoring}>
            <img src={mentorImg} alt="Arrow for mentoring" />
            <p>Add photos and videos to showcase your venue to customers</p>
          </div>
          <div className={styles.sample}>Sample images. Add your own!</div>
        </div>
      </div>
    </div>
  );
}
