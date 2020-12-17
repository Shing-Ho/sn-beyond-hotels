import React, { useState, useEffect } from 'react';
import moment from 'moment';
import _ from 'lodash';
import { Menu } from 'antd';

import styles from '../SearchPage/SearchPage.module.scss';
import TopFilters from '../../components/TopFilters/TopFilters';
import Page from '../../components/Page/Page';
import DashboardFilter from './DashboardFilter';
import SearchAndView from './SearchAndView';
import ContainerView from './ContainerView';
import SearchPage from '../SearchPage/SearchPage';

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

const HotelsData = [
  {
    id: 1,
    name: 'Taix Restaurent',
    start: 3,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec orci enim, luctus vel nisl Bibendum.',
    from: '19.99',
  },
  {
    id: 2,
    name: 'Masa of Echo Park',
    start: 5,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec orci enim, luctus vel nisl Bibendum.',
    from: '25',
  },
  {
    id: 3,
    name: 'Thrill FAll Bungee',
    start: 2,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec orci enim, luctus vel nisl Bibendum.',
    from: '15.25',
  },
  {
    id: 4,
    name: 'Cats Musical',
    start: 5,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec orci enim, luctus vel nisl Bibendum.',
    from: '25',
  },
  {
    id: 5,
    name: 'ALTA NightClub',
    start: 4,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec orci enim, luctus vel nisl Bibendum.',
    from: '30',
  },
  {
    id: 6,
    name: 'Tesla car rental',
    start: 5,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec orci enim, luctus vel nisl Bibendum.',
    from: '40',
  },
  {
    id: 7,
    name: 'Taix Restaurent',
    start: 3,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec orci enim, luctus vel nisl Bibendum.',
    from: '19.99',
  },
  {
    id: 8,
    name: 'Masa of Echo Park',
    start: 5,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec orci enim, luctus vel nisl Bibendum.',
    from: '25',
  },
  {
    id: 9,
    name: 'Thrill FAll Bungee',
    start: 2,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec orci enim, luctus vel nisl Bibendum.',
    from: '15.25',
  },
  {
    id: 10,
    name: 'Cats Musical',
    start: 5,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec orci enim, luctus vel nisl Bibendum.',
    from: '25',
  },
  {
    id: 11,
    name: 'ALTA NightClub',
    start: 4,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec orci enim, luctus vel nisl Bibendum.',
    from: '30',
  },
  {
    id: 12,
    name: 'Tesla car rental',
    start: 5,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec orci enim, luctus vel nisl Bibendum.',
    from: '40',
  },
];

const searchTypeData = [
  {
    id: 1,
    name: 'Show All',
    value: 'show-all',
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
    value: 'transportation',
    icon: <TransportationOutline />,
    selectedIcon: <TransportationTransparent />,
  },
  {
    id: 4,
    name: 'Tours & Activities',
    value: 'tours-activities',
    icon: <ToursActivities />,
    selectedIcon: <ToursActivitiesWhite />,
  },
  {
    id: 5,
    name: 'Shows & Events',
    value: 'shows-events',
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
  const [filter, setFilter] = useState(initialFilterData);
  const [searchType, setSearchType] = useState('show-all');
  const [searchText, setSearchText] = useState('');
  const [filterBy, setFilterBy] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [itemView, setItemView] = useState('grid');
  const [items, setItems] = useState(HotelsData);

  const dispatch = useDispatch();

  useEffect(() => {}, [searchType]);

  useEffect(() => {
    setItems(HotelsData.filter((item) => item.name.toLowerCase().includes(searchText)));
  }, [searchText]);

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

  const onHotelItemClick = (id) => {
    dispatch(push(`/events/${id}`));
  };

  return (
    <Page>
      <div className={styles.root}>
        <div className={styles.container}>
          <TopFilters filter={filter} setFilter={setFilter} initialState={initialState} displayCount />
          <DashboardFilter searchType={searchType} setSearchType={setSearchType} searchTypeData={searchTypeData} />
          <SearchAndView
            searchText={searchText}
            filterBy={filterBy}
            sortby={sortBy}
            itemView={itemView}
            setSearchText={setSearchText}
            filterMenu={menu(handleFilterBy)}
            sortMenu={sortMenu(handleSortBy)}
            setItemView={setItemView}
          />
          {searchType === 'hotels' ? (
            <SearchPage noHeader noFooter display={!searchType === 'hotels'} />
          ) : (
            <ContainerView
              filterBy={filterBy}
              itemView={itemView}
              searchText={searchText}
              searchType={searchType}
              filter={filter}
              items={items}
              onPageChange={() => {}}
              onHotelItemClick={onHotelItemClick}
            />
          )}
        </div>
      </div>
    </Page>
  );
};

export default DashboardPage;
