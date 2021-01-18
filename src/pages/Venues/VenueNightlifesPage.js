import React from 'react';
import VenuesPage from 'pages/SupplyManager/VenuesPage';
import { ReactComponent as NightlifeWhiteIcon } from 'icons/dashboardIcons/NightlifeWhite.svg';

export default function VenueNightlifesPage() {
  const handlePublish = () => {
    alert('on add product group');
  };

  const handleAddRule = () => {
    alert('on add rule');
  };

  const handleEditSafety = () => {
    alert('on edit safety');
  };

  const handleCopy = () => {
    alert('on copy');
  };

  const handleDelete = () => {
    alert('on delete');
  };

  const handleAddProductGroup = () => {
    alert('on add product group');
  };

  const handleAddDetails = () => {
    alert('on add details');
  };

  const handlePaymentProviderSelection = () => {
    alert('on payment provider selection');
  };

  const handleAddContact = () => {
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
    />
  );
}
