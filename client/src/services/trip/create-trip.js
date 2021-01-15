import apiRequest from '../api-request';

const createTrip = async (title, locationName) => {
  const body = { title, locationName };
  const { data } = await apiRequest.post(`/trip`, body);
  return data;
};

export default createTrip;
