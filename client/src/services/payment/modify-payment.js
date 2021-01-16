import apiRequest from '../api-request';

const modifyPayment = async (paymentId, info) => {
  const { data } = await apiRequest.patch(`/payment/${paymentId}`, info);
  return data;
};

export default modifyPayment;
