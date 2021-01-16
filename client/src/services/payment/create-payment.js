import apiRequest from '../api-request';

const createPayment = async (info) => {
  const { data } = await apiRequest.post(`/payment`, info);
  return data;
};

export default createPayment;
