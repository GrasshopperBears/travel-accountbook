import apiRequest from '../api-request';

const modifyPayment = async (modifiedId, modifiedValues) => {
  const { data } = await apiRequest.patch(`/payment/${modifiedId}`, modifiedValues);
  return data;
};

export default modifyPayment;
