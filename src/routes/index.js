import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import DashboardPage from 'pages/Dashboard';
import HotelDetailPage from 'pages/DetailPage/HotelDetailPage';
import EventDetailPage from 'pages/DetailPage/EventDetailPage';
import ToursDetailPage from 'pages/DetailPage/ToursDetailPage';
import PaymentsPage from 'pages/PaymentsPage/PaymentsPage';
import ConfirmationPage from 'pages/ConfirmationPage/ConfirmationPage';
import SummaryPage from 'pages/SummaryPage/SummaryPage';
import GuestPage from 'pages/GuestPage/GuestPage';
import OrderLookup from 'pages/OrderLookup/OrderLookup';
import DiningDetailPage from 'pages/DetailPage/DiningDetailPage';

export const BASE_ROUTE = window.BASE_ROUTE || '';

export default function Routes() {
  return (
    <>
      <Switch>
        <Route path={`${BASE_ROUTE}/hotels/:id`} exact component={HotelDetailPage} />
        <Route path={`${BASE_ROUTE}/events/:id`} exact component={EventDetailPage} />
        <Route path={`${BASE_ROUTE}/tours/:id`} exact component={ToursDetailPage} />
        <Route path={`${BASE_ROUTE}/dining/:id`} exact component={DiningDetailPage} />
        <Route path={`${BASE_ROUTE}/payments`} exact component={PaymentsPage} />
        <Route path={`${BASE_ROUTE}/confirmation`} exact component={ConfirmationPage} />
        <Route path={`${BASE_ROUTE}/orderSummary`} exact component={SummaryPage} />
        <Route path={`${BASE_ROUTE}/guest`} exact component={GuestPage} />
        <Route path={`${BASE_ROUTE}/orderLookup`} exact component={OrderLookup} />
        <Route path={`${BASE_ROUTE}/search`} exact component={HotelDetailPage} />
        <Route path={`${BASE_ROUTE}/:type`} exact component={DashboardPage} />
        <Redirect exact from={`${BASE_ROUTE}`} to={`${BASE_ROUTE}/hotels`} />
      </Switch>
    </>
  );
}
