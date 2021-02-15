import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import history from 'store/history';
import Page from 'components/Page/Page';
import venueActions from 'store/venue/actions';
import { getLoading } from 'store/venue/selectors';

import VenueAddForm from './components/VenueAddForm/VenueAddForm';

export default function VenueContainer(props) {
  const { location = {} } = props;
  const dispatch = useDispatch();
  const loading = useSelector(getLoading);

  const closeVenueModal = () => {
    history.push('hotels');
  };

  const createVenue = (payload) => {
    dispatch(venueActions.createVenue(payload));
  };

  return (
    <Page param={location}>
      <div>
        <VenueAddForm {...{ closeVenueModal, createVenue, loading }} />
      </div>
    </Page>
  );
}
