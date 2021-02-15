import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import DashboardPage from 'pages/Dashboard';
import HotelDetailPage from 'pages/DetailPage/HotelDetailPage';
import EventDetailPage from 'pages/DetailPage/EventDetailPage';
import ToursDetailPage from 'pages/DetailPage/ToursDetailPage';
import CarHireDetailPage from 'pages/DetailPage/CarHireDetailPage';
import PaymentsPage from 'pages/PaymentsPage/PaymentsPage';
import ConfirmationPage from 'pages/ConfirmationPage/ConfirmationPage';
import SummaryPage from 'pages/SummaryPage/SummaryPage';
import GuestPage from 'pages/GuestPage/GuestPage';
import OrderLookup from 'pages/OrderLookup/OrderLookup';
import ReservationLookup from 'pages/ReservationLookup/ReservationLookup';
import DiningDetailPage from 'pages/DetailPage/DiningDetailPage';
import FoodDetailPage from 'pages/DetailPage/FoodDetailPage';
import GasDetailPage from 'pages/DetailPage/GasDetailPage';
import NightLifeDetailPage from 'pages/DetailPage/NightLifeDetailPage';
import ShoppingDetailPage from 'pages/DetailPage/ShoppingDetailPage';
import ShoppingProductPage from 'pages/DetailPage/ShoppingProductPage';
import QuoteViewPage from 'pages/DetailPage/QuoteViewPage';
import VenueEventsPage from 'pages/Venues/VenueEventsPage';
import VenueToursPage from 'pages/Venues/VenueToursPage';
import VenueNightlifesPage from 'pages/Venues/VenueNightlifesPage';
import VenueContainer from 'pages/Venues/VenueContainer';
import LoginPage from 'pages/LoginPage/LoginPage';
import UserListPage from 'pages/UserManagementPage/UserListPage';
import UserCreatePage from 'pages/UserManagementPage/UserCreate';
import ProtectedRoute from 'helpers/routes/ProtectedRoute';

export const BASE_ROUTE = window.BASE_ROUTE || '';

export default function Routes() {
  return (
    <>
      <Switch>
        {/* Authenticaton routes */}
        <Route path={`${BASE_ROUTE}/login`} exact component={LoginPage} />
        <ProtectedRoute path={`${BASE_ROUTE}/users`} exact component={UserListPage} />
        <ProtectedRoute path={`${BASE_ROUTE}/users/:id`} exact component={UserCreatePage} />
        {/* End of Authenticaton routes */}

        {/* Venue routes */}
        <Route path={`${BASE_ROUTE}/venues/event`} exact component={VenueEventsPage} />
        <Route path={`${BASE_ROUTE}/venues/tour`} exact component={VenueToursPage} />
        <ProtectedRoute path={`${BASE_ROUTE}/venues/night_life/:id`} exact component={VenueNightlifesPage} />
        <ProtectedRoute path={`${BASE_ROUTE}/venues/add`} exact component={VenueContainer} />
        <Redirect exact from={`${BASE_ROUTE}/venues`} to={`${BASE_ROUTE}/venues/add`} />
        {/* End of Vunue routes */}

        {/* Dashboard routes */}
        <Route path={`${BASE_ROUTE}/payments`} exact component={PaymentsPage} />
        <Route path={`${BASE_ROUTE}/confirmation`} exact component={ConfirmationPage} />
        <Route path={`${BASE_ROUTE}/orderSummary`} exact component={SummaryPage} />
        <Route path={`${BASE_ROUTE}/guest`} exact component={GuestPage} />
        <Route path={`${BASE_ROUTE}/orderLookup`} exact component={OrderLookup} />
        <Route path={`${BASE_ROUTE}/reservationLookup`} exact component={ReservationLookup} />
        <Route path={`${BASE_ROUTE}/search`} exact component={HotelDetailPage} />
        <Route path={`${BASE_ROUTE}/hotels/:id`} exact component={HotelDetailPage} />
        <Route path={`${BASE_ROUTE}/events/:id`} exact component={EventDetailPage} />
        <Route path={`${BASE_ROUTE}/foods/:id`} exact component={FoodDetailPage} />
        <Route path={`${BASE_ROUTE}/tours/:id`} exact component={ToursDetailPage} />
        <Route path={`${BASE_ROUTE}/transports/carhire/:id`} exact component={CarHireDetailPage} />
        <Route path={`${BASE_ROUTE}/transports/carhire/:id/viewquote`} exact component={QuoteViewPage} />
        <Route path={`${BASE_ROUTE}/dining/:id`} exact component={DiningDetailPage} />
        <Route path={`${BASE_ROUTE}/gas/:id`} exact component={GasDetailPage} />
        <Route path={`${BASE_ROUTE}/nightlife/:id`} exact component={NightLifeDetailPage} />
        <Route path={`${BASE_ROUTE}/shopping/store/:id`} exact component={ShoppingDetailPage} />
        <Route path={`${BASE_ROUTE}/shopping/product/:id`} exact component={ShoppingProductPage} />
        <Route path={`${BASE_ROUTE}/:type`} exact component={DashboardPage} />
        <Redirect exact from={`${BASE_ROUTE}`} to={`${BASE_ROUTE}/hotels`} />
        {/* End of Dashboard routes */}
      </Switch>
    </>
  );
}
