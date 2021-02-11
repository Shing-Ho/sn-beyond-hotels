import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import history from 'store/history';
import venueActions from 'store/venue/actions';
import { getVenue, getLoading } from 'store/venue/selectors';

import { ReactComponent as NightlifeWhiteIcon } from 'icons/dashboardIcons/NightlifeWhite.svg';
import VenuesPage from './VenuesPage';

export default function VenueNightlifesPage({ match: { params } }) {
  const dispatch = useDispatch();
  const venue = useSelector(getVenue);
  const loading = useSelector(getLoading);

  useEffect(() => {
    if (params.id) {
      dispatch(venueActions.getVenue(params.id));
      dispatch(venueActions.getVenueProductGroups(params.id));
    } else {
      history.push(`${window.BASE_ROUTE || ''}/venues`);
    }
  }, []);

  const handlePublish = () => {
    // eslint-disable-next-line
    alert('on add product group');
  };

  const handleAddRule = () => {
    // eslint-disable-next-line
    alert('on add rule');
  };

  const handleEditSafety = () => {
    // eslint-disable-next-line
    alert('on edit safety');
  };

  const handleCopy = () => {
    // eslint-disable-next-line
    alert('on copy');
  };

  const handleDelete = () => {
    // eslint-disable-next-line
    alert('on delete');
  };

  const handleAddProductGroup = () => {
    // eslint-disable-next-line
    alert('on add product group');
  };

  const handleAddDetails = () => {
    // eslint-disable-next-line
    alert('on add details');
  };

  const handlePaymentProviderSelection = () => {
    // eslint-disable-next-line
    alert('on payment provider selection');
  };

  const handleAddContact = () => {
    // eslint-disable-next-line
    alert('on add contact');
  };

  // TODO: pass product add step components in array
  return (
    <VenuesPage
      mainIcon={<NightlifeWhiteIcon />}
      onPublish={handlePublish}
      onAddRule={handleAddRule}
      onEditSafety={handleEditSafety}
      onCopy={handleCopy}
      onDelete={handleDelete}
      onAddProductGroup={handleAddProductGroup}
      onAddDetails={handleAddDetails}
      onPaymentProviderSelection={handlePaymentProviderSelection}
      onAddContact={handleAddContact}
      venue={venue}
      loading={loading}
    />
  );
}
