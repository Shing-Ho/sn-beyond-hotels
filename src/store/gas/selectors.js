function formatItem(item, index) {
  const result = {
    index,
    id: item.ID,
    uuid: item.UUID,
    rate: item.UsageCost,
    type: 'gas',
    name: item?.AddressInfo?.Title,
    description: item.GeneralComments,
    images: [],
  };
  if (item.UserComments && item.UserComments.length) {
    const ratingItem = item.UserComments.find((n) => n.Rating !== null);
    result.rating = ratingItem?.Rating;
  }
  if (item.MediaItems && item.MediaItems.length) {
    result.images = item.MediaItems.map((v, i) => ({
      url: v.ItemURL,
      type: '',
      display_order: i,
    }));
    result.image = result.images[0]?.url;
  }
  if (item.AddressInfo) {
    result.address = {
      address1: item.AddressInfo.AddressLine1,
      city: item.AddressInfo.Town,
      province: item.AddressInfo.StateOrProvince,
      postal_code: item.AddressInfo.Postcode,
      country: item.AddressInfo.Country?.Title,
    };
  }
  return result;
}

export const getLoading = (state) => state.gas.loading;
export const getGasStations = (state) => state.gas.gasStations;
export const getFormattedGasStations = (state) => getGasStations(state).map(formatItem);
export const getFormattedGasStation = (id) => (state) => {
  const station = getGasStations(state).find((v) => v.ID === Number(id));
  return station ? formatItem(station) : {};
};
