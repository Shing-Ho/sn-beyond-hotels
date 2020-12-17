import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Page from 'components/Page/Page';
import TopFilters from 'components/TopFilters/TopFilters';
import TransportFilters from './components/Filters/TransportFilters';
import { getCurrency } from 'store/core/selectors';
import ListTileItem from 'components/ListTileItem/ListTileItem';
import ListItem from 'components/ListItem/ListItem';
import Pagination from 'components/Pagination/Pagination';
import GoogleMap from 'components/GoogleMap/GoogleMap';
import { getRandomImageUrl } from 'helpers/utils';
import styles from './TransportSearchPage.module.scss';

const initialData = Array(30)
  .fill(0)
  .map((_, id) => ({
    id,
    rate: (Math.random() * 2000).toFixed(2),
    image: getRandomImageUrl(),
    icon: <i className='fa fa-car' />,
    name: 'Mid-Size SUV',
    rating: Math.round(Math.random() * 5),
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquam facilisis pharetra. Fusce eu lorem vel mi cursus efficitur. Vivamus sodales tempus venenatis. ',
  }));

const TransportSearchPage = () => {
  const currency = useSelector(getCurrency);
  const [viewMode, setViewMode] = useState('tile');
  const [transports, setTransports] = useState([]);

  useEffect(() => {
    handlePageChange(1, 10);
  }, []);

  const handlePageChange = (page, size) => {
    setTransports(initialData.slice((page - 1) * size, page * size));
  };

  const handleTabChange = () => {

  };

  return (
    <Page>
      <div className={styles.root}>
        <div className={styles.container}>
          <TopFilters currency={currency} />
          <TransportFilters onTabChange={handleTabChange} onViewModeChange={setViewMode} />
          <div className={styles.main}>
            {viewMode === 'tile' &&
              transports.map((data, i) => (
                <ListTileItem
                  className={styles.tileItem}
                  data={data}
                  key={`transport_${i}`}
                  currency={currency}
                />
              ))}
            {viewMode === 'list' &&
              transports.map((data, i) => (
                <ListItem
                  className={styles.listItem}
                  data={data}
                  key={`transport_${i}`}
                  currency={currency}
                />
              ))}
            {viewMode === 'map' && (
              <GoogleMap
                height={600}
                center={[24.2028, 10.4418]}
                coords={[]}
              />
            )}
            {viewMode !== 'map' && (
              <div className={styles.pagination}>
                <Pagination
                  total={initialData.length}
                  showSizeChanger
                  showQuickJumper
                  onChange={handlePageChange}
                  onShowSizeChange={(current, size) => handlePageChange(0, size)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </Page>
  );
};

export default TransportSearchPage;
