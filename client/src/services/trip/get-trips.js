import apiRequest from '../api-request';

const getTrips = async () => {
  const { data } = await apiRequest.get(`/trip`);
  return data;
};

export default getTrips;
