import React from 'react';
import { Button } from 'antd';

import { getRandomImageUrl } from 'helpers/utils';
import Carousel from 'components/Carousel/Carousel';
import { ReactComponent as PhotoIcon } from 'icons/Icon_SupMan_Photos.svg';
import styles from './VenuesUploadZone.module.scss';

const images = Array(7)
  .fill(0)
  .map((_, i) => ({
    url: getRandomImageUrl(),
    type: '',
    display_order: i,
  }));

export default function VenuesUploadZone() {
  return (
    <div className={styles.carousel}>
      <Carousel image={images} />
      <div className={styles.uploadZone}>
        <h3>Add Photos and Video</h3>
        <p>Add photos and videos to showcase your venue and products.</p>
        <Button className={styles.uploadBtn} icon={<PhotoIcon />}>
          Add Yours Here
        </Button>
      </div>
    </div>
  );
}
