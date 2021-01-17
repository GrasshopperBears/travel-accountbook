import apiRequest from '../api-request';

const getPayments = async (page, tripId) => {
  const { data } = await apiRequest.get(`/payment/${tripId}/${page}`);
  return data;
};

export default getPayments;
