import apiRequest from '../api-request';

const deleteTrip = async (tripId) => {
  const { data } = await apiRequest.delete(`/trip/${tripId}`);
  return data;
};

export default deleteTrip;
