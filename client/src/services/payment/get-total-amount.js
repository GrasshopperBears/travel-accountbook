import apiRequest from '../api-request';

const getTotalAmount = async () => {
  const { data } = await apiRequest.get(`/payment/total`);
  return data;
};

export default getTotalAmount;
