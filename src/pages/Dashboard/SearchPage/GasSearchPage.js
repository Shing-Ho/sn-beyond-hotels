/* eslint-disable react/no-array-index-key */
import React from 'react';
import { getRandomImageUrl } from 'helpers/utils';
import ContainerView from '../ContainerView';
import styles from './GasSearchPage.module.scss';

const initialData = Array(30)
  .fill(0)
  .map((_, id) => ({
    id,
    rate: (Math.random() * 2000).toFixed(2),
    image: getRandomImageUrl(),
    icon: <i className="fa fa-bolt" />,
    name: 'Shell Gas Station 4216',
    rating: Math.round(Math.random() * 5),
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquam facilisis pharetra. Fusce eu lorem vel mi cursus efficitur. Vivamus sodales tempus venenatis. ',
  }));

const TransportSearchPage = ({ searchType }) => (
  <div className={styles.root}>
    <div className={styles.filter}>Gas Filter</div>
    <ContainerView items={initialData} searchType={searchType} />
  </div>
);

export default TransportSearchPage;
