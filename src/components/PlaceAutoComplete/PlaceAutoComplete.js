import React, { useState } from 'react';
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';
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
            .then((results) => {
              setStreet(address);
              const addressObject = results[0].address_components;
              onLocationChange(addressObject);
            })
            // eslint-disable-next-line no-console
            .catch((error) => console.log(error));
        }}
        searchOption
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className={styles.autoCompleteContainer}>
            <input
              {...getInputProps({
                placeholder: 'Search Location ...',
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
