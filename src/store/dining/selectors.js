function formatItem(item, index) {
  const result = {
    index,
    id: item.dining_id,
    rating: item.rating,
    type: 'dining',
    name: item.name,
    image: item.image,
  };
  if (item.images && item.images.length) {
    result.images = item.images;
    [result.image] = result.images;
  }
  if (item.location) {
    result.address = {
      address1: item.location.address,
    };
    result.geolocation = item.location;
  }
  return result;
}

export const getLoading = (state) => state.dining.loading;
export const getDinings = (state) => state.dining.dinings;
export const getFormattedDinings = (state) => getDinings(state).map(formatItem);
export const getFormattedDining = (id) => (state) => {
  const station = getDinings(state).find((v) => v.dining_id === Number(id));
  return station ? formatItem(station) : {};
};
