import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { push } from 'connected-react-router';
import { useParams } from 'react-router-dom';

import TopFilters from 'components/TopFilters/TopFilters';
import Page from 'components/Page/Page';
import { getRandomImageUrl } from 'helpers/utils';
import { ReactComponent as BedFillGray } from 'icons/dashboardIcons/BedFillGray.svg';
import { ReactComponent as BedTransparent } from 'icons/dashboardIcons/BedTransparent.svg';
import { ReactComponent as ShowAllFillGray } from 'icons/dashboardIcons/ShowAllFillGray.svg';
import { ReactComponent as ShowAllWhite } from 'icons/dashboardIcons/ShowAllWhite.svg';
import { ReactComponent as TransportationOutline } from 'icons/dashboardIcons/TransportationOutline.svg';
import { ReactComponent as TransportationTransparent } from 'icons/dashboardIcons/TransportationTransparent.svg';
import { ReactComponent as ToursActivities } from 'icons/dashboardIcons/ToursActivities.svg';
import { ReactComponent as ToursActivitiesWhite } from 'icons/dashboardIcons/ToursActivitiesWhite.svg';
import { ReactComponent as ShowsEvents } from 'icons/dashboardIcons/ShowsEvents.svg';
import { ReactComponent as ShowsEventsWhite } from 'icons/dashboardIcons/ShowsEventsWhite.svg';
import { ReactComponent as DiningSvg } from 'icons/dashboardIcons/Dining.svg';
import { ReactComponent as DiningWhiteSvg } from 'icons/dashboardIcons/DiningWhite.svg';
import { ReactComponent as Nightlife } from 'icons/dashboardIcons/Nightlife.svg';
import { ReactComponent as NightlifeWhite } from 'icons/dashboardIcons/NightlifeWhite.svg';
import DashboardFilter from './DashboardFilter';
import ContainerView from './ContainerView';
import HotelSearchPage from './SearchPage/HotelSearchPage';
import styles from './index.module.scss';

const initialFilterData = {
  location: {
    location_id: '5128581',
    location_name: 'New York City',
    iso_country_code: 'USA',
  },
  start_date: moment().add(1, 'day').format('YYYY-MM-DD'),
  end_date: moment().add(2, 'day').format('YYYY-MM-DD'),
};

const searchTypeOptions = [
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
    name: 'Gas & Charging',
    value: 'gas',
    icon: <Nightlife />,
    selectedIcon: <NightlifeWhite />,
  },
  {
    id: 5,
    name: 'Tours & Activities',
    value: 'tours',
    icon: <ToursActivities />,
    selectedIcon: <ToursActivitiesWhite />,
  },
  {
    id: 6,
    name: 'Shows & Events',
    value: 'events',
    icon: <ShowsEvents />,
    selectedIcon: <ShowsEventsWhite />,
  },
  {
    id: 7,
    name: 'Dining',
    value: 'dining',
    icon: <DiningSvg />,
    selectedIcon: <DiningWhiteSvg />,
  },
  {
    id: 8,
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

const initialData = Array(30)
  .fill(0)
  .map((_, id) => ({
    id,
    rate: (Math.random() * 2000).toFixed(2),
    image: getRandomImageUrl(),
    type: searchTypeOptions[Math.ceil(Math.random() * 7)].value,
    name: `Fake Item ${id}`,
    rating: Math.round(Math.random() * 5),
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquam facilisis pharetra. Fusce eu lorem vel mi cursus efficitur. Vivamus sodales tempus venenatis. ',
  }));

const DashboardPage = () => {
  const [filter, setFilter] = useState(initialFilterData);
  const params = useParams();
  const dispatch = useDispatch();
  const searchType = params.type;
  const [items, setItems] = useState([]);

  const handleSearchTypeChange = (type) => {
    dispatch(push(`/${type}`));
  };

  useEffect(() => {
    let filteredItems = initialData;
    if (searchType !== 'all') {
      filteredItems = initialData.filter((item) => item.type === searchType);
    }

    setItems(
      filteredItems.map((item) => {
        const searchTypeInfo = searchTypeOptions.find((option) => option.value === item.type);
        let subIcons = [];

        if (searchType === 'gas') {
          subIcons = [
            <Nightlife />,
            <DiningSvg />,
            <TransportationOutline />,
            <ShowsEvents />,
            <ToursActivities />,
          ].slice(Math.ceil(Math.random() * 2), Math.round(Math.random() * 5));
        }
        return { icon: searchTypeInfo.selectedIcon, subIcons, ...item };
      }),
    );
  }, [searchType]);

  return (
    <Page>
      <div className={styles.root}>
        <div className={styles.container}>
          <TopFilters filter={filter} setFilter={setFilter} initialState={initialState} displayCount />
          <DashboardFilter
            searchType={searchType}
            searchTypeData={searchTypeOptions}
            onItemClick={handleSearchTypeChange}
          />
          {searchType === 'hotels' && <HotelSearchPage noHeader noFooter />}
          {/* TODO: remove temporary page after we create whole pages */}
          {searchType !== 'hotels' && <ContainerView items={items} searchType={searchType} />}
        </div>
      </div>
    </Page>
  );
};

export default DashboardPage;
