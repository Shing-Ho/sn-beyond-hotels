import React, { useState, useEffect } from 'react';
import moment from 'moment';
import _ from 'lodash';
import { Menu } from 'antd';
import { push } from 'connected-react-router';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import TopFilters from '../../components/TopFilters/TopFilters';
import Page from '../../components/Page/Page';
import DashboardFilter from './DashboardFilter';
import SearchAndView from './SearchAndView';
import ContainerView from './ContainerView';
import HotelSearchPage from '../SearchPage/HotelSearchPage';
import TransportSearchPage from '../SearchPage/TransportSearchPage';
import { getRandomImageUrl } from '../../helpers/utils';
import { getCurrency } from '../../store/core/selectors';
import styles from '../SearchPage/HotelSearchPage.module.scss';

import { ReactComponent as BedFillGray } from '../../icons/dashboardIcons/BedFillGray.svg';
import { ReactComponent as BedTransparent } from '../../icons/dashboardIcons/BedTransparent.svg';
import { ReactComponent as ShowAllFillGray } from '../../icons/dashboardIcons/ShowAllFillGray.svg';
import { ReactComponent as ShowAllWhite } from '../../icons/dashboardIcons/ShowAllWhite.svg';
import { ReactComponent as TransportationOutline } from '../../icons/dashboardIcons/TransportationOutline.svg';
import { ReactComponent as TransportationTransparent } from '../../icons/dashboardIcons/TransportationTransparent.svg';
import { ReactComponent as ToursActivities } from '../../icons/dashboardIcons/ToursActivities.svg';
import { ReactComponent as ToursActivitiesWhite } from '../../icons/dashboardIcons/ToursActivitiesWhite.svg';
import { ReactComponent as ShowsEvents } from '../../icons/dashboardIcons/ShowsEvents.svg';
import { ReactComponent as ShowsEventsWhite } from '../../icons/dashboardIcons/ShowsEventsWhite.svg';
import { ReactComponent as DiningSvg } from '../../icons/dashboardIcons/Dining.svg';
import { ReactComponent as DiningWhiteSvg } from '../../icons/dashboardIcons/DiningWhite.svg';
import { ReactComponent as Nightlife } from '../../icons/dashboardIcons/Nightlife.svg';
import { ReactComponent as NightlifeWhite } from '../../icons/dashboardIcons/NightlifeWhite.svg';
import { ReactComponent as BedIcon } from '../../icons/bed3.svg';

const menu = (click) => <Menu onClick={click}>{/* Add menu item for filter here */}</Menu>;

const sortMenu = (click) => (
  <Menu onClick={click}>
    <Menu.Item key="asc">Ascending</Menu.Item>
    <Menu.Item key="desc">Descending</Menu.Item>
  </Menu>
);

const initialFilterData = {
  location: {
    location_id: '5128581',
    location_name: 'New York City',
    iso_country_code: 'USA',
  },
  start_date: moment().add(1, 'day').format('YYYY-MM-DD'),
  end_date: moment().add(2, 'day').format('YYYY-MM-DD'),
};

const initialData = Array(30)
  .fill(0)
  .map((v, id) => ({
    id,
    rate: (Math.random() * 2000).toFixed(2),
    image: getRandomImageUrl(),
    icon: <BedIcon />,
    name: `Mid-Size SUV - ${id}`,
    rating: Math.round(Math.random() * 5),
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquam facilisis pharetra. Fusce eu lorem vel mi cursus efficitur. Vivamus sodales tempus venenatis. ',
  }));

const searchTypeData = [
  {
    id: 1,
    name: 'Show All',
    value: 'all',
    icon: <ShowAllFillGray />,
    selectedIcon: <ShowAllWhite />,
  },
  {
    id: 2,
    name: 'Hotels',
    value: 'hotels',
    icon: <BedFillGray />,
    selectedIcon: <BedTransparent />,
  },
  {
    id: 3,
    name: 'Transportation',
    value: 'transport',
    icon: <TransportationOutline />,
    selectedIcon: <TransportationTransparent />,
  },
  {
    id: 4,
    name: 'Tours & Activities',
    value: 'tours',
    icon: <ToursActivities />,
    selectedIcon: <ToursActivitiesWhite />,
  },
  {
    id: 5,
    name: 'Shows & Events',
    value: 'events',
    icon: <ShowsEvents />,
    selectedIcon: <ShowsEventsWhite />,
  },
  {
    id: 6,
    name: 'Dining',
    value: 'dining',
    icon: <DiningSvg />,
    selectedIcon: <DiningWhiteSvg />,
  },
  {
    id: 7,
    name: 'NightLife',
    value: 'nightLife',
    icon: <Nightlife />,
    selectedIcon: <NightlifeWhite />,
  },
];

const initialState = {
  location: {
    location_id: '5128581',
    location_name: 'New York City',
    iso_country_code: 'USA',
  },
  start_date: moment().add(1, 'day').format('YYYY-MM-DD'),
  end_date: moment().add(2, 'day').format('YYYY-MM-DD'),
  occupancy: {
    adults: 2,
    children: 0,
  },
  nights: 1,
  language: 'en',
  currency: 'USD',
};

const DashboardPage = () => {
  const currency = useSelector(getCurrency);
  const [filter, setFilter] = useState(initialFilterData);
  const [search, setSearch] = useState([]);
  const [filterBy, setFilterBy] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [itemView, setItemView] = useState('grid');
  const [items, setItems] = useState(initialData);
  const [pagination, setPagination] = useState({ page: 1, size: 10 });
  const params = useParams();
  const searchType = params.type;

  const dispatch = useDispatch();

  const handlePageChange = (page, size) => {
    setPagination({ page, size });
  };

  useEffect(() => {
    setPagination({ page: 1, size: 10 });
  }, []);

  useEffect(() => {
    const { page, size } = pagination;
    let data = initialData;
    if (search.length) {
      data = data.filter((item) => search.every((v) => item.name.toLowerCase().includes(v.toLowerCase())));
    }

    setItems(data.slice((page - 1) * size, page * size));
  }, [search, pagination]);

  useEffect(() => {}, [filterBy]);

  useEffect(() => {
    setItems(_.orderBy(items, 'name', sortBy));
  }, [sortBy]);

  const handleFilterBy = (e) => {
    setFilterBy(e.key);
  };

  const handleSortBy = (e) => {
    setSortBy(e.key);
  };

  const onItemClick = (id) => {
    dispatch(push(`/events/${id}`));
  };

  const handleSearchTypeChange = (type) => {
    dispatch(push(`/${type}`));
  };

  return (
    <Page>
      <div className={styles.root}>
        <div className={styles.container}>
          <TopFilters filter={filter} setFilter={setFilter} initialState={initialState} displayCount />
          <DashboardFilter
            searchType={searchType}
            searchTypeData={searchTypeData}
            onItemClick={handleSearchTypeChange}
          />
          {searchType !== 'hotels' && (
            <SearchAndView
              search={search}
              filterBy={filterBy}
              sortby={sortBy}
              itemView={itemView}
              setSearch={setSearch}
              filterMenu={menu(handleFilterBy)}
              sortMenu={sortMenu(handleSortBy)}
              setItemView={setItemView}
            />
          )}
          {searchType === 'hotels' && <HotelSearchPage noHeader noFooter display={searchType !== 'hotels'} />}
          {searchType === 'transport' && <TransportSearchPage noHeader noFooter viewMode={itemView} />}
          {!['hotels', 'transport'].includes(searchType) && (
            <ContainerView
              filterBy={filterBy}
              itemView={itemView}
              search={search}
              searchType={searchType}
              filter={filter}
              items={items}
              total={initialData.length}
              currency={currency}
              onPageChange={handlePageChange}
              onItemClick={onItemClick}
            />
          )}
        </div>
      </div>
    </Page>
  );
};

export default DashboardPage;
