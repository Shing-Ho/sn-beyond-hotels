import React from 'react';
import { ReactComponent as EventsIcon } from 'icons/dashboardIcons/ShowsEventsWhite.svg';
import VenuesPage from './VenuesPage';

export default function VenueEventsPage({ location = {} }) {
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
      mainIcon={<EventsIcon />}
      onPublish={handlePublish}
      onAddRule={handleAddRule}
      onEditSafety={handleEditSafety}
      onCopy={handleCopy}
      onDelete={handleDelete}
      onAddProductGroup={handleAddProductGroup}
      onAddDetails={handleAddDetails}
      onPaymentProviderSelection={handlePaymentProviderSelection}
      onAddContact={handleAddContact}
      location={location}
    />
  );
}
