import apiRequest from '../api-request';

const modifyTrip = async (tripId, title, locationName) => {
  const body = { title, locationName };
  const { data } = await apiRequest.patch(`/trip/${tripId}`, body);
  return data;
};

export default modifyTrip;
