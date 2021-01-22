import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { ReactComponent as GasStation } from 'icons/dashboardIcons/GasStation.svg';
import { ReactComponent as GasStationWhite } from 'icons/dashboardIcons/GasStationWhite.svg';
import { ReactComponent as ToursActivities } from 'icons/dashboardIcons/ToursActivities.svg';
import { ReactComponent as ToursActivitiesWhite } from 'icons/dashboardIcons/ToursActivitiesWhite.svg';
import { ReactComponent as ShowsEvents } from 'icons/dashboardIcons/ShowsEvents.svg';
import { ReactComponent as ShowsEventsWhite } from 'icons/dashboardIcons/ShowsEventsWhite.svg';
import { ReactComponent as DiningSvg } from 'icons/dashboardIcons/Dining.svg';
import { ReactComponent as DiningWhiteSvg } from 'icons/dashboardIcons/DiningWhite.svg';
import { ReactComponent as Nightlife } from 'icons/dashboardIcons/Nightlife.svg';
import { ReactComponent as NightlifeWhite } from 'icons/dashboardIcons/NightlifeWhite.svg';
import { ReactComponent as FlightsTransparent } from 'icons/dashboardIcons/Flights.svg';
import { ReactComponent as FlightsOutline } from 'icons/dashboardIcons/FlightsOutline.svg';
import { ReactComponent as Shopping } from 'icons/dashboardIcons/Icon_Category_Shopping.svg';
import { ReactComponent as ShoppingWhite } from 'icons/dashboardIcons/Icon_Category_Shopping_White.svg';
import { ReactComponent as TranBike } from 'icons/transports/Icon_Tran_Bike.svg';
import { ReactComponent as TranBoat } from 'icons/transports/Icon_Tran_Boat.svg';
import { ReactComponent as TranBus } from 'icons/transports/Icon_Tran_Bus.svg';
import { ReactComponent as TranHire } from 'icons/transports/Icon_Tran_Hire.svg';
import { ReactComponent as TranMetro } from 'icons/transports/Icon_Tran_Metro.svg';
import { ReactComponent as TranRail } from 'icons/transports/Icon_Tran_Rail.svg';
import { ReactComponent as TranRental } from 'icons/transports/Icon_Tran_Rental.svg';
import { ReactComponent as TranRideShare } from 'icons/transports/Icon_Tran_RideShare.svg';
import { ReactComponent as TranScooter } from 'icons/transports/Icon_Tran_Scooter.svg';
import { ReactComponent as TranTransfer } from 'icons/transports/Icon_Tran_Transfer.svg';
import { ReactComponent as FuelCombo } from 'icons/fuel-combo.svg';
import { ReactComponent as ChargePlug } from 'icons/charge-plug.svg';
import { ReactComponent as FuleValve } from 'icons/fuel-valve.svg';
import gasActions from 'store/gas/actions';
import { getFormattedGasStations } from 'store/gas/selectors';
import DashboardFilter from './DashboardFilter';
import ContainerView from './ContainerView';
import HotelSearchPage from './SearchPage/HotelSearchPage';
import ShoppingSearchPage from './SearchPage/ShoppingSearchPage';

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
    icon: <GasStation />,
    selectedIcon: <GasStationWhite />,
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
    value: 'nightlife',
    icon: <Nightlife />,
    selectedIcon: <NightlifeWhite />,
  },
  {
    id: 10,
    name: 'shopping',
    value: 'shopping',
    icon: <Shopping />,
    selectedIcon: <ShoppingWhite />,
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

const transportSelectOptions = [
  {
    label: 'Show All',
    value: 'all',
    icon: <ShowAllFillGray />,
    selectedIcon: <ShowAllWhite />,
  },
  {
    label: 'Rental Car',
    value: 'rental',
    icon: <TranRental />,
  },
  {
    label: 'RAIL',
    value: 'rail',
    icon: <TranRail />,
  },
  {
    label: 'Ride Share',
    value: 'rideshare',
    icon: <TranRideShare />,
  },
  {
    label: 'Car Hire',
    value: 'hire',
    icon: <TranHire />,
  },
  {
    label: 'Transfers',
    value: 'transfers',
    icon: <TranTransfer />,
  },
  {
    label: 'Metro',
    value: 'metro',
    icon: <TranMetro />,
  },
  {
    label: 'Bus',
    value: 'bus',
    icon: <TranBus />,
  },
  {
    label: 'Scooter',
    value: 'scooter',
    icon: <TranScooter />,
  },
  {
    label: 'Bike',
    value: 'bike',
    icon: <TranBike />,
  },
  {
    label: 'Boat',
    value: 'boat',
    icon: <TranBoat />,
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
    type: searchTypeOptions[Math.ceil(Math.random() * 8)].value,
    name: `Fake Item ${id}`,
    rating: Math.round(Math.random() * 5),
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquam facilisis pharetra. Fusce eu lorem vel mi cursus efficitur. Vivamus sodales tempus venenatis. ',
  }));

const DashboardPage = ({ location = {} }) => {
  const [filter, setFilter] = useState(initialFilterData);
  const params = useParams();
  const dispatch = useDispatch();
  const searchType = params.type;
  const gasStations = useSelector(getFormattedGasStations);
  const [items, setItems] = useState([]);
  const [, setGasType] = useState('all');
  const [, setTransportType] = useState('all');
  const intl = useIntl();

  const handleSearchTypeChange = (type) => {
    dispatch(push(`/${type}`));
  };

  useEffect(() => {
    let filteredItems = [];

    switch (searchType) {
      case 'all':
        filteredItems = initialData;
        break;
      case 'gas':
        filteredItems = gasStations.map((item) => ({
          subIcons: [<FuelCombo />, <ChargePlug />, <FuleValve />].slice(
            Math.ceil(Math.random() * 2),
            Math.round(Math.random() * 3),
          ),
          ...item,
        }));
        break;
      default:
        filteredItems = initialData.filter((item) => item.type === searchType);
        break;
    }

    setItems(
      filteredItems.map((item) => ({
        icon: searchTypeOptions.find((option) => option.value === item.type).selectedIcon,
        ...item,
      })),
    );
  }, [gasStations, searchType]);

  useEffect(() => {
    switch (searchType) {
      case 'gas':
        dispatch(gasActions.getGasStations());
        break;
      default:
        break;
    }
  }, [searchType]);

  let subHeader;
  if (searchType === 'gas') {
    subHeader = <TabSelect uppercase options={gasSelectOptions} onChange={setGasType} />;
  } else if (searchType === 'transports') {
    subHeader = (
      <TabSelect uppercase stretch thin custom options={transportSelectOptions} onChange={setTransportType} />
    );
  }

  return (
    <Page param={location}>
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
          {searchType !== 'hotels' && searchType !== 'flights' && searchType !== 'shopping' && (
            <ContainerView items={items} searchType={searchType} subHeader={subHeader} />
          )}
        </div>
        {searchType === 'flights' && <FlightSearchPage noHeader noFooter />}
        {searchType === 'shopping' && <ShoppingSearchPage noHeader noFooter />}
      </div>
    </Page>
  );
};

export default DashboardPage;
