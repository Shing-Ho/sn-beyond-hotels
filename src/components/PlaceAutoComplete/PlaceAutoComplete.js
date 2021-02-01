import React, { useState } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import pin from 'icons/pin.png';
import styles from './PlaceAutoComplete.module.scss';

const PlaceAutoComplete = ({ onLocationChange }) => {
  const [street, setStreet] = useState('');
  return (
    <div className={styles.addressContainer}>
      <PlacesAutocomplete
        value={street}
        onChange={(address) => {
          setStreet(address);
        }}
        onSelect={(address) => {
          geocodeByAddress(address)
            .then(async (results) => {
              const { long_name: postalCode = '' } =
                results[0].address_components.find((c) => c.types.includes('postal_code')) || {};
              const { long_name: streetNumber = '' } =
                results[0].address_components.find((c) => c.types.includes('street_number')) || {};
              const { long_name: route = '' } =
                results[0].address_components.find((c) => c.types.includes('route')) || {};
              const { long_name: cityName = '' } =
                results[0].address_components.find((c) => c.types.includes('"locality"')) || {};
              const { long_name: stateLongName = '' } =
                results[0].address_components.find((c) => c.types.includes('administrative_area_level_1')) || {};
              const { short_name: stateShortName = '' } =
                results[0].address_components.find((c) => c.types.includes('administrative_area_level_1')) || {};
              const { long_name: countryLongName = '' } =
                results[0].address_components.find((c) => c.types.includes('country')) || {};
              const { short_name: countryShortName = '' } =
                results[0].address_components.find((c) => c.types.includes('country')) || {};
              const latlng = await getLatLng(results[0]);
              const addressObject = {
                latitude: latlng.lat,
                longitude: latlng.lng,
                locationName: address.split(',')[0],
                addressLine: `${streetNumber} ${route}`,
                cityName,
                postalCode,
                stateProv: {
                  value: stateLongName,
                  StateCode: stateShortName,
                },
                countryName: {
                  value: countryLongName,
                  stateCode: countryShortName,
                },
              };
              setStreet(address);
              onLocationChange(addressObject);
            })
            // eslint-disable-next-line no-console
            .catch((error) => console.log(error));
        }}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className={styles.autoCompleteContainer}>
            <input
              {...getInputProps({
                placeholder: 'Search Location ...',
                className: 'search-input',
              })}
            />
            <div className={styles.dropdownContainer}>
              {loading && <div className={styles.suggestionItem}>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active ? styles.suggestionActive : styles.suggestionItem;
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                    })}
                    key={suggestion?.placeId}
                  >
                    <img src={pin} className={styles.pinImg} alt="" />
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
};

export default PlaceAutoComplete;
