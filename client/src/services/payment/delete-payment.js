import apiRequest from '../api-request';

const deletePayment = async (paymentId) => {
  const { data } = await apiRequest.delete(`/payment/${paymentId}`);
  return data;
};

export default deletePayment;
