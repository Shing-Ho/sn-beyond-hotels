import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { push } from 'connected-react-router';
import { useParams } from 'react-router-dom';
import { useIntl } from 'react-intl';

import Page from 'components/Page/Page';
import FlightSearchPage from 'pages/FlightSearchPage/FlightSearchPage';
import TopFilters from 'components/TopFilters/TopFilters';
import TabSelect from 'components/TabSelect/TabSelect';
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
import { ReactComponent as FlightsTransparent } from '../../icons/dashboardIcons/Flights.svg';
import { ReactComponent as FlightsOutline } from '../../icons/dashboardIcons/FlightsOutline.svg';
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
    name: 'showAll',
    value: 'all',
    icon: <ShowAllFillGray />,
    selectedIcon: <ShowAllWhite />,
  },
  {
    id: 2,
    name: 'hotels',
    value: 'hotels',
    icon: <BedFillGray />,
    selectedIcon: <BedTransparent />,
  },
  {
    id: 3,
    name: 'flights',
    value: 'flights',
    icon: <FlightsOutline />,
    selectedIcon: <FlightsTransparent />,
  },
  {
    id: 4,
    name: 'transportation',
    value: 'transports',
    icon: <TransportationOutline />,
    selectedIcon: <TransportationTransparent />,
  },
  {
    id: 5,
    name: 'gasAndCharging',
    value: 'gas',
    icon: <Nightlife />,
    selectedIcon: <NightlifeWhite />,
  },
  {
    id: 6,
    name: 'toursAndActivities',
    value: 'tours',
    icon: <ToursActivities />,
    selectedIcon: <ToursActivitiesWhite />,
  },
  {
    id: 7,
    name: 'showsAndEvents',
    value: 'events',
    icon: <ShowsEvents />,
    selectedIcon: <ShowsEventsWhite />,
  },
  {
    id: 8,
    name: 'dining',
    value: 'dining',
    icon: <DiningSvg />,
    selectedIcon: <DiningWhiteSvg />,
  },
  {
    id: 9,
    name: 'nightLife',
    value: 'nightLife',
    icon: <Nightlife />,
    selectedIcon: <NightlifeWhite />,
  },
];

const gasSelectOptions = [
  {
    label: 'Show All',
    value: 'all',
  },
  {
    label: 'Gas Stations',
    value: 'gas',
  },
  {
    label: 'Charge Stations',
    value: 'charge',
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
  const [gasType, setGasType] = useState('all');
  const intl = useIntl();

  const handleSearchTypeChange = (type) => {
    dispatch(push(`/${type}`));
  };

  useEffect(() => {
    let filteredItems = initialData;
    if (searchType !== 'all') {
      filteredItems = initialData.filter((item) => {
        let valid = item.type === searchType;
        if (searchType === 'gas') {
          valid = valid && (gasType === 'all' || item.subType === gasType);
        }
        return valid;
      });
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

  let subHeader;
  if (searchType === 'gas') {
    subHeader = <TabSelect options={gasSelectOptions} onChange={setGasType} />;
  }

  return (
    <Page>
      <div className={styles.root}>
        <div className={styles.container}>
          <TopFilters filter={filter} setFilter={setFilter} initialState={initialState} displayCount />
          <DashboardFilter
            searchType={searchType}
            searchTypeData={searchTypeOptions}
            onItemClick={handleSearchTypeChange}
            intl={intl}
          />
          {searchType === 'hotels' && <HotelSearchPage noHeader noFooter />}
          {/* TODO: remove temporary page after we create whole pages */}
          {searchType !== 'hotels' && searchType !== 'flights' && (
            <ContainerView items={items} searchType={searchType} subHeader={subHeader} />
          )}
        </div>
        {searchType === 'flights' && <FlightSearchPage noHeader noFooter />}
      </div>
    </Page>
  );
};

export default DashboardPage;
