import apiRequest from '../api-request';

const getMapPayments = async (tripId, count) => {
  const { data } = await apiRequest.get(`/map/${tripId}?count=${count}`);
  return data;
};

export default getMapPayments;
