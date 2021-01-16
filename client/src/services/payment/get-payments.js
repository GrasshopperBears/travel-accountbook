import apiRequest from '../api-request';

const getPayments = async (page) => {
  const { data } = await apiRequest.get(`/payment/${page}`);
  return data;
};

export default getPayments;
