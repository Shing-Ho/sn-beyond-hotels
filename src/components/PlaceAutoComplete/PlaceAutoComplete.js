import React, { useState } from 'react';
import PlacesAutocomplete, { getLatLng, geocodeByAddress } from 'react-places-autocomplete';
import Script from 'react-load-script';
import { isEmpty } from 'lodash';
import pin from 'icons/pin.png';
import styles from './PlaceAutoComplete.module.scss';

const PlaceAutoComplete = ({ onLocationChange }) => {
  const [street, setStreet] = useState('');
  const apiKey = window.REACT_APP_GOOGLE_MAP_KEY;
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [, setScriptError] = useState(false);

  const handleScriptCreate = () => {
    setScriptLoaded(false);
  };
  const handleScriptError = () => {
    setScriptError(true);
  };
  const handleScriptLoad = () => {
    setScriptLoaded(true);
  };

  return (
    <div className={styles.addressContainer}>
      <Script
        url={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`}
        onCreate={handleScriptCreate}
        onError={handleScriptError}
        onLoad={handleScriptLoad}
      />
      {scriptLoaded && (
        <PlacesAutocomplete
          value={street}
          onChange={(address) => {
            setStreet(address);
          }}
          onSelect={(address) => {
            if (address) {
              geocodeByAddress(address)
                .then(async (results) => {
                  const { long_name: postalCode = '' } =
                    results[0].address_components.find((c) => c.types.includes('postal_code')) || {};
                  const { long_name: streetNumber = '' } =
                    results[0].address_components.find((c) => c.types.includes('street_number')) || {};
                  const { long_name: route = '' } =
                    results[0].address_components.find((c) => c.types.includes('route')) || {};
                  const { long_name: cityName = '' } =
                    results[0].address_components.find((c) => c.types.includes('locality')) || {};
                  const { long_name: stateLongName = '' } =
                    results[0].address_components.find((c) => c.types.includes('administrative_area_level_1')) || {};
                  const { short_name: stateShortName = '' } =
                    results[0].address_components.find((c) => c.types.includes('administrative_area_level_1')) || {};
                  const { long_name: countryLongName = '' } =
                    results[0].address_components.find((c) => c.types.includes('country')) || {};
                  const { short_name: countryShortName = '' } =
                    results[0].address_components.find((c) => c.types.includes('country')) || {};
                  const latlng = await getLatLng(results[0]);
                  const airport = !isEmpty(results[0].address_components.find((c) => c.types.includes('airport')));
                  let airportCode;
                  const locationName = address.split(',')[0];
                  if (airport) {
                    const startIndex = locationName.indexOf('(');
                    const endIndex = locationName.indexOf(')');
                    airportCode = locationName.slice(startIndex + 1, endIndex);
                  }
                  const trainStation = !isEmpty(
                    results[0].address_components.find((c) => c.types.includes('train_station')),
                  );
                  const addressObject = {
                    latitude: latlng.lat,
                    longitude: latlng.lng,
                    locationName,
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
                    airport,
                    airportCode,
                    trainStation,
                  };
                  setStreet(address);
                  onLocationChange(addressObject);
                })
                // eslint-disable-next-line no-console
                .catch((error) => console.log(error));
            }
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
      )}
    </div>
  );
};

export default PlaceAutoComplete;
