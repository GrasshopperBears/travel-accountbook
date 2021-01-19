import apiRequest from '../api-request';

const getCategoryPayment = async (tripId, categoryId) => {
  const { data } = await apiRequest.get(`/category-stat/${tripId}/${categoryId}`);
  return data;
};

export default getCategoryPayment;
