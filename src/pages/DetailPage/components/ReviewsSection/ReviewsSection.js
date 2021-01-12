import React from 'react';
import { Chart } from 'react-charts';

import Button from 'components/Button/Button';
import { ReactComponent as HeartFillIcon } from 'icons/heart_fill.svg';
import ReviewItem from '../ReviewItem/ReviewItem';
import styles from './ReviewsSection.module.scss';

export default function ReviewsSection() {
  const series = React.useMemo(
    () => ({
      type: 'bar',
    }),
    [],
  );

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'ordinal', position: 'bottom' },
      { position: 'left', type: 'linear', stacked: false, show: true, tickPadding: 20 },
    ],
    [],
  );

  const data = [
    {
      data: [{ primary: '', radius: undefined, secondary: 10 }],
    },
    {
      data: [{ primary: '', radius: undefined, secondary: 20 }],
    },
    {
      data: [{ primary: '', radius: undefined, secondary: 30 }],
    },
    {
      data: [{ primary: '', radius: undefined, secondary: 50 }],
    },
    {
      data: [{ primary: '', radius: undefined, secondary: 40 }],
    },
    {
      data: [{ primary: '', radius: undefined, secondary: 50 }],
    },
    {
      data: [{ primary: '', radius: undefined, secondary: 40 }],
    },
    {
      data: [{ primary: '', radius: undefined, secondary: 30 }],
    },
    {
      data: [{ primary: '', radius: undefined, secondary: 40 }],
    },
    {
      data: [{ primary: '', radius: undefined, secondary: 50 }],
    },
  ];

  // Based off my chart bars
  const getSeriesStyle = React.useCallback(() => ({ fill: '#6684c1' }), []);

  return (
    <div className={styles.main}>
      <div className={styles.topDiv}>
        <div className={styles.rowBetween}>
          <div className={styles.row}>
            <HeartFillIcon width={30} height={30} />
            <span className={styles.numberText}>8/10</span>
            <span className={styles.avgRating}>Average Rating</span>
          </div>
          <Button>Add Review</Button>
        </div>
        <div className={styles.chartDiv}>
          <Chart data={data} series={series} axes={axes} getSeriesStyle={getSeriesStyle} />
        </div>
      </div>
      <div className={styles.bottomDiv}>
        <div className={styles.rowBetween}>
          <div className={styles.customerReview}>Customer Reviews</div>
        </div>
        {Array(10)
          .fill(0)
          .map((_, index) => (
            <ReviewItem score={index} />
          ))}
        <div className={styles.buttonDiv}>
          <Button>Show More</Button>
        </div>
      </div>
    </div>
  );
}
