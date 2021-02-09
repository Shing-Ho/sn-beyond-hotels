function formatItem(item, index) {
  const result = {
    index,
    id: item.TripCode,
    uaDestinationId: item.UADestinationID,
    rate: item.AdultPrice,
    duration: item.Duration,
    type: 'tours',
    name: item.TripName,
    description: item.BriefIntro,
    image: item.Photo,
    url: item.TripUrl,
    childRate: item.ChildPrice,
    style: item.TripStyle,
    destination: item.DestinationName,
  };
  return result;
}

export const getLoading = (state) => state.adventure.loading;
export const getTrips = (state) => state.adventure.trips;
export const getTripInfo = (state) => state.adventure.tripInfo;
export const getTripAvailabilities = (state) => state.adventure.tripAvailabilities;
export const getCountries = (state) => state.adventure.countries;
export const getStandardCountries = (state) => state.adventure.standardCountries;
export const getDestinations = (state) => state.adventure.destinations;
export const getBookInfo = (state) => state.adventure.bookInfo;
export const getFormattedTrips = (state) => getTrips(state).map(formatItem);
